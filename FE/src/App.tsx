import { useState } from "react";
import "./App.css";

import { Button, Form, Input, Select, Tabs, Typography } from "antd";
import { Option } from "antd/es/mentions";
import { RefreshCw } from "lucide-react";

const { Title, Text } = Typography;
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Option 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Option 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Option 3",
    children: "Content of Tab Pane 3",
  },
];

function App() {
  const [generatedMessage, setGeneratedMessage] = useState(false);

  const onChange = (key: string) => {
    console.log(key);
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
          // onChange={handleChange}
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
        {!generatedMessage ? (
          <Input
            type="text"
            name="generatedMessage"
            placeholder="My auto generated commit"
          />
        ) : (
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        )}
      </Form.Item>

      <div className="buttons">
        <Button className="generate-button">Generate Commit</Button>
        <Button className="variations-button">
          <RefreshCw />
          Generate Variations
        </Button>
      </div>
    </div>
  );
}

export default App;
