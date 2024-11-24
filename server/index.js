const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

const { generateCommitMessage, regenerateCommitMessage, handleCommitGeneration } = require('./v1/AI');

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

app.post("/generate-commit", async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  try {
    const commitMessage = await generateCommitMessage(userInput);
    console.log(commitMessage);

    return res.status(200).json({ commitMessage });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while generating the commit message" });
  }
});
