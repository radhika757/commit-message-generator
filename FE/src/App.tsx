import React, { useState } from "react";
import "./App.css";

import { Button, Form, Input, Select, Tabs, Typography } from "antd";
import { Option } from "antd/es/mentions";
import { Copy, RefreshCw } from "lucide-react";
import axios from "axios";

const { Title, Text } = Typography;

type TabItem = {
  key: string;
  label: string;
  children: React.ReactNode;
};

function App() {
  const [selectedType, setSelectedType] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [regenerateMessage, setRegenrateMessage] = useState(false);
  const [tabs, setTabs] = useState<TabItem[]>([]);

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleGenerateCommit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generate-commit",
        {
          userInput: selectedType,
        }
      );
      setGeneratedMessage(response.data.commitMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRengenrateCommit = async () => {
    setRegenrateMessage(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-variations",
        { userInput: selectedType }
      );

      const variationsArray = response.data.variations.split("\n");

      // Map the selected variations into the required TabsProps["items"] format
      const items = [
        variationsArray[1],
        variationsArray[3],
        variationsArray[5],
      ].map((item, index) => ({
        key: (index + 1).toString(), // Generate keys as "1", "2", "3"
        label: `Option ${index + 1}`, // Dynamic labels: "Option 1", "Option 2", ...
        children: item, // Content of the tab
      }));

      setTabs(items); // Update tabs state with the formatted items
    } catch (error) {
      console.log(error);
      setRegenrateMessage(false);
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleCopy = () => {
    if (generatedMessage) {
      navigator.clipboard
        .writeText(generatedMessage)
        .then(() => {
          console.log("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      console.warn("No message to copy.");
    }
  };

  return (
    <div className="container">
      <div className="headers">
        <Title level={2} className="title">
          Commit Message Generator
        </Title>
        <Text className="subtitle" style={{ marginTop: 0, display: "block" }}>
          Create consistent and informative commit messages
        </Text>
      </div>

      <Form.Item>
        <Select
          placeholder="Select commit type"
          onChange={handleTypeSelect}
          style={{ width: 400 }}
        >
          <Option value="Feature">Feature</Option>
          <Option value="Fix">Fix</Option>
          <Option value="Documentation">Documentation</Option>
          <Option value="Style">Style</Option>
          <Option value="Refactor">Refactor</Option>
          <Option value="Test">Test</Option>
          <Option value="Chore">Chore</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Input placeholder="Scope (Optional)" value="" name="scope" />
      </Form.Item>

      <Form.Item>
        <Input
          placeholder="Ticket Number (Optional)"
          value=""
          name="ticketNum"
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="text"
          name="generatedMessage"
          placeholder="My auto generated commit"
          className="generated-commit-box"
          value={generatedMessage ? generatedMessage : ""}
          disabled={!generatedMessage}
        />

        <Button
          className="copy-button"
          onClick={() => {
            handleCopy();
          }}
          disabled={!generatedMessage}
        >
          <Copy />
        </Button>

        {regenerateMessage ? (
          <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
        ) : (
          <></>
        )}
      </Form.Item>

      <div className="buttons">
        <Button
          className="generate-button"
          onClick={() => handleGenerateCommit()}
          disabled={!selectedType}
        >
          Generate Commit
        </Button>
        <Button
          className="variations-button"
          disabled={!selectedType}
          onClick={() => handleRengenrateCommit()}
        >
          <RefreshCw />
          Generate Variations
        </Button>
      </div>
    </div>
  );
}

export default App;
