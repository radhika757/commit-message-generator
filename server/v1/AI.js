const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCommitMessage({
  commitType,
  scope = "",
  ticketNumber = "",
}) {
  let prompt;
  let baseCommitMessage = `${commitType}${scope ? `(${scope})` : ""}`;

  if (ticketNumber) {
    baseCommitMessage = `${ticketNumber}: ${baseCommitMessage}`;
  }

  // Generate commit message using AI
  if (scope) {
    prompt = `Generate a commit message for ${baseCommitMessage}. The scope is ${scope}. 
    Give the response in this format- git commit -m "generated commit from you". 
    Generate commit around the scope. Keep the commits either simple, witty, sarcastic or precise.
    `;
  } else {
     prompt = `Generate a commit message for the following: ${baseCommitMessage}. 
    Give the response in this format- git commit -m "generated commit from you". 
    Even if the context might be less like just one word for example feature, 
    randomly generate a commit related to that word`;
  }

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function regenerateCommitMessage({
  commitType,
  scope = "",
  ticketNumber = "",
}) {
  // Generate 3 new suggestions based on type or description.
  const prompt = `Generate 3 different commit messages based on this: "${commitType}".
  Keep every commit in the form of git commit -m "generated commit". 
  Even if the context might be less like just one word for example feature, 
  randomly generate a commit related to that word. Let the commits be funny or witty or precise but should be some what related to programming.
  Keep it one liner max two.`;

  const promptResult = await model.generateContent(prompt);
  const result = promptResult.response.text();

  return result;
}

module.exports = {
  generateCommitMessage,
  regenerateCommitMessage,
};
