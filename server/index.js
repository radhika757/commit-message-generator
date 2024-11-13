const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(
    cors({
        origin: process.env.ORIGIN
    })
);

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on ${process.env.PORT}`);
});

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1.55,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const parts = [
      {text: "input: generate a commit for fixing a functionality bug"},
      {text: "output: git commit -m \"Fix: Resolved issue with [functionality description]\""},
      {text: "input: generate a commit for the login feature"},
      {text: "output: git commit -m \"feat: Implement user login functionality\""},
      {text: "input: generate a commit for refactoring code"},
      {text: "output: git commit -m \"Refactor: Improved readability and performance of the function\""},
      {text: "input: generate a commit for refactoring code for adding a new model"},
      {text: "output: git commit -m \"Refactor: Added new `[Model Name]` model and updated related components\""},
      {text: "input: generate a commit for fixing or adding a CSS style"},
      {text: "output: git commit -m \"Fix: Corrected CSS issue with [Element Name]\""},
      {text: "input: generate a commit for button functionality"},
      {text: "output: git commit -m \"feat: Add a click event handler for [ButtonName] functionality\""},
      {text: "input: generate a commit for fixing button functionality"},
      {text: "output: git commit -m \"Fix: [ButtonName] button not responding on click\""},
      {text: "input: generate a commit for a chore"},
      {text: "output: git commit -m \"Chore: Improved code formatting and style\""},
      {text: "input: generate a commit for documentation"},
      {text: "output: git commit -m \"Add code comments to explain complex logic in [module/file]\""},
      {text: "input: re-generate response for generating a commit for a chore"},
      {text: "output: git commit -m \"Clean up codebase by removing unused files and imports\""},
      {text: "input: Generate a witty random commit"},
      {text: "output: git commit -m \"Fixing bugs... or just hiding them better\""},
      {text: "input: Generate a witty random commit"},
      {text: "output: git commit -m \"Made the code less terrible\""},
      {text: "input: Generate a witty random commit"},
      {text: "output: git commit -m \"Refactored the mess I created yesterday\""},
      {text: "input: Generate a witty random commit"},
      {text: "output: git commit -m \"Making things work, somehow\""},
      {text: "input: Generate a witty random commit"},
      {text: "output: git commit -m \"Removed unnecessary 'console.log' – you’re welcome\""},
      {text: "input: Generate a random commit for fixing a bug"},
      {text: "output: git commit -m \"Fixed a bug that only happened on Fridays\""},
      {text: "input: Generate a random commit for fixing a bug"},
      {text: "output: git commit -m \"Fixed an issue caused by my previous fix\""},
      {text: "input: Generate a random commit for a feature"},
      {text: "output: git commit -m \"Behold! A shiny new feature appears!\""},
      {text: "input: Generate a random commit for a feature"},
      {text: "output: git commit -m \"Turned dreams into code,feature now live\""},
      {text: "input: Generate a random commit for a feature"},
      {text: "output: git commit -m \"New feature: powered by coffee and code\""},
      {text: "input: Generate a random commit for a feature"},
      {text: "output: git commit -m \"Feature drop! Just don’t ask how it works\""},
      {text: "input: generate a commit for documentation and add ticket number EXT-5678 in the beginning"},
      {text: "output: git commit -m \"EXT-5678: Update README with detailed setup instructions\""},
      {text: "input: generate a commit for the login feature and add ticket number INT-2021 in the beginning"},
      {text: "output: git commit -m \"INT-2021: Implement basic login functionality\""},
      {text: "input: generate a commit for refactoring code for the menu and add ticket number GOD-1213 in the beginning"},
      {text: "output: git commit -m \"GOD-1213: Refactor menu component for better readability and performance\""},
      {text: "input: Regenerate response for generate a commit for refactoring code for the menu and add ticket number GOD-1213 in the beginning"},
      {text: "output: git commit -m \"GOD-1213: Refactor mobile menu implementation for smoother experience\""},
      {text: "input: Generate a commit for refactoring code for adding a new user and add a ticket number HEX-45671"},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    console.log(result.response.text());
  }
  
  run();