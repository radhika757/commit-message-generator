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
  const [scope, setScope] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeKey, setActiveKey] = useState("1");

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleGenerateCommit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generate-commit",
        {
          userInput: selectedType,
          scope: scope,
          ticketNo: ticketNo,
        }
      );
      setGeneratedMessage(response.data.commitMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRengenrateCommit = async () => {
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
        key: (index + 1).toString(),
        label: `Option ${index + 1}`,
        children: item,
      }));

      setTabs(items); // Update tabs state with the formatted items
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleCopy = () => {
    if (!generatedMessage && !tabs) {
      console.warn("No message to copy.");
    }
    const activeTab = tabs.find((tab) => tab.key === activeKey);

    if (generatedMessage) {
      navigator.clipboard
        .writeText(generatedMessage)
        .then(() => {
          console.log("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }

    if (tabs) {
      if (activeTab) {
        navigator.clipboard
          .writeText(String(activeTab.children))
          .then(() => {
            console.log("Copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      }
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
        <Input
          placeholder="Scope (Optional)"
          value={scope}
          name="scope"
          onChange={(e) => setScope(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Input
          placeholder="Ticket Number (Optional)"
          value={ticketNo}
          name="ticketNum"
          onChange={(e) => setTicketNo(e.target.value)}
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

        {tabs.length !== 0 ? (
          <>
            <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
            <Button
              className="regenarate-copy-button"
              type="primary"
              onClick={handleCopy}
              style={{ marginTop: "10px", height: "44px" }}
            >
              <Copy />
            </Button>
          </>
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
