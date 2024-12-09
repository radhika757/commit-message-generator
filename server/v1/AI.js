const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCommitMessage({
  commitType,
  scope = "",
  ticketNumber = "",
}) {
  let prompt;
  let baseCommitMessage = `${commitType}${scope ? ` ${scope}` : ""}`;

  if (ticketNumber) {
    baseCommitMessage = `${ticketNumber}: ${baseCommitMessage}`;
  }

  // Generate commit message using AI
  if (scope) {
    prompt = `Generate a commit message for ${baseCommitMessage}. The scope is ${scope}. 
    Give the response in this format- git commit -m "generated commit from you". 
    No semi-colons after 
    If there is a ticketNumber, Add the ticketNumber in front of message.
    Generate commit around the scope. Keep the commits either simple, witty, sarcastic or precise.
    `;
  } else {
     prompt = `Generate a commit message for the following: ${baseCommitMessage}. 
    Give the response in this format- git commit -m "generated commit from you". 
     If there is a ticketNumber, Add the ticketNumber in front of message.
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
  let prompt;
  let baseCommitMessage = `${commitType}${scope ? ` ${scope}` : ""}`;

  if (ticketNumber) {
    baseCommitMessage = `${ticketNumber}: ${baseCommitMessage}`;
  }

  if (scope) {
    prompt = `Generate 3 different commit messages based on this: ${baseCommitMessage}. T
    he scope is ${scope}. 
    Give the response in this format- git commit -m "generated commit from you". 
    No semi-colons after.
    If there is a ticketNumber, Add the ticketNumber in front of message.
    Generate commit around the scope. Keep the commits either simple, witty, sarcastic or precise 
    but should be some what related to programming.
    `;
  } else {
     prompt = `Generate a commit message for the following: ${baseCommitMessage}. 
    Give the response in this format- git commit -m "generated commit from you". 
     If there is a ticketNumber, Add the ticketNumber in front of message.
    Even if the context might be less like just one word for example feature, 
    randomly generate a commit related to that word. 
    Keep the commits either simple, witty, sarcastic or precise 
    but should be some what related to programming.
    `;
  }

  const promptResult = await model.generateContent(prompt);
  const result = promptResult.response.text();

  return result;
}

module.exports = {
  generateCommitMessage,
  regenerateCommitMessage,
};
