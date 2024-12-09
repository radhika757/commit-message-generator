import React, { useEffect, useState } from "react";
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
  const activeKey = "1";
  const [selectedType, setSelectedType] = useState("");
  const [scope, setScope] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [copied, setCopied] = useState({
    commit: false,
    variations: false
  });
  const [loading, setLoading] = useState({
    commit: false,
    variations: false
  });

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleGenerateCommit = async () => {
    setLoading({
      commit: true,
      variations: false
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/generate-commit`,
        {
          userInput: selectedType,
          scope: scope,
          ticketNo: ticketNo,
        }
      );
      setGeneratedMessage(response.data.commitMessage);
      setLoading({
        commit: false,
        variations: false
      })
    } catch (err) {
      console.log(err);
      setLoading({
        commit: false,
        variations: false
      })
    }
  };

  const handleRengenrateCommit = async () => {
    setLoading({
      commit: false,
      variations: true
    })
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/generate-variations`,
        {
          userInput: selectedType,
          scope: scope,
          ticketNo: ticketNo,
        }
      );

      const variationsArray = response.data.variations
        .split("\n\n")
        .filter(Boolean);

      // Map the selected variations into the required TabsProps["items"] format
      const items = [
        variationsArray[0],
        variationsArray[1],
        variationsArray[2],
      ].map((item, index) => ({
        key: (index + 1).toString(),
        label: `Option ${index + 1}`,
        children: item,
      }));

      setTabs(items);
      setLoading({
        commit: false,
        variations: false
      })
    } catch (error) {
      console.log(error);
      setLoading({
        commit: false,
        variations: false
      })
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
          setCopied({
            commit: true,
            variations: false
          });
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
            setCopied({
              commit: false,
              variations: true
            });
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      }
    }
  };

  useEffect(() => {
    if (copied.commit || copied.variations) {
      const timer = setTimeout(() => {
        setCopied({
          commit: false,
          variations: false
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied])

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

        {copied.commit ? <p className="message">Copied!</p> : <Button
          className="copy-button"
          onClick={() => {
            handleCopy();
          }}
          disabled={!generatedMessage}
        >
          <Copy />
        </Button>}


        {tabs.length !== 0 ? (
          <>
            <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
            {copied.variations ? <p style={{ fontWeight: "600" }}>Copied!</p> : <Button
              type="primary"
              className="regenarate-copy-button"
              style={{ marginTop: "10px", height: "44px" }}
              onClick={() => {
                handleCopy();
              }}
              disabled={!tabs}
            >
              <Copy />
            </Button>}

          </>
        ) : (
          <></>
        )}
      </Form.Item>

      <div className="buttons">
        <Button
          className="generate-button"
          onClick={() => handleGenerateCommit()}
          disabled={!selectedType || loading.commit || loading.variations}
        >
          Generate Commit
        </Button>
        <Button
          className="variations-button"
          disabled={!selectedType || loading.variations || loading.commit}
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
