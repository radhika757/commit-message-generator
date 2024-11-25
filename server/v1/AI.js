const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCommitMessage({
  commitType,
  scope = "",
  ticketNumber = "",
}) {
  console.log(commitType, scope, ticketNumber);

  let baseCommitMessage = `${commitType}${scope ? `(${scope})` : ""}`;

  if (ticketNumber) {
    baseCommitMessage = `${ticketNumber}: ${baseCommitMessage}`;
  }

  // Generate commit message using AI
  const prompt = `Generate a commit message for the following: ${baseCommitMessage}. 
  Give the response in this format- git commit -m "generated commit from you". 
  Even if the context might be less like just one word for example feature, 
  randomly generate a commit related to that word, here for features`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return result.response.text();
}

async function regenerateCommitMessage(originalCommitMessage) {
  // Generate 3 new suggestions based on the original commit message
  const prompt = `Regenerate 3 commit messages based on this: "${originalCommitMessage}"`;
  const result = await model.generateText({ prompt });

  // Extract 3 options
  const suggestions = result.text.split("\n").slice(0, 3);
  return suggestions;
}

async function handleCommitGeneration({ commitType, scope, ticketNumber }) {
  const generatedCommit = await generateCommitMessage({
    commitType,
    scope,
    ticketNumber,
  });
  console.log("Generated Commit Message:", generatedCommit);

  // Return AI-generated commit message
  return generatedCommit;
}

module.exports = {
  generateCommitMessage,
  regenerateCommitMessage,
  handleCommitGeneration,
};
