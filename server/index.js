const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path');

const {
  generateCommitMessage,
  regenerateCommitMessage,
} = require("./v1/AI");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.static(path.join(__dirname, '../FE/dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FE/dist/assets/main.B9yAk8IO.js'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send('Backend is running. Use the correct API endpoints.');
});

app.post("/generate-commit", async (req, res) => {
  const { userInput,scope,ticketNo } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "User Input is required" });
  }

  try {
    const commitMessage = await generateCommitMessage({
      commitType: userInput,
      scope: scope || "",
      ticketNumber: ticketNo || "",
    });

    res.json({ commitMessage });
  } catch (error) {
    res.status(500).json({ error: "Error generating commit message" });
  }
});

app.post("/generate-variations", async (req, res) => {
  const { userInput,scope,ticketNo  } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "User Input is required." });
  }

  try {
    const variations = await regenerateCommitMessage({
      commitType: userInput,
      scope: scope || "",
      ticketNumber: ticketNo || "",
    });
    
    res.status(200).json({ variations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error generating commit message" });
  }
});
