
import { Button, Form, Input, Select, Typography } from 'antd';
import { Option } from 'antd/es/mentions';

import './App.css';

const { Title, Text } = Typography;

function App() {

  return (
    <div className='container'>
      <div className='headers'>
        <Title level={2} className='title'>Commit Message Generator</Title>
        <Text className="subtitle" style={{ marginTop: 0, display: 'block' }}>
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
        <Input placeholder='Scope (Optional)' value='' name='scope' />
      </Form.Item>

      <Form.Item>
        <Input placeholder='Ticket Number (Optional)' value='' name='ticketNum' />
      </Form.Item>


      <Form.Item>
        {/* show the generted commit message here with option to copy. */}
        <Input placeholder='generated commit message' value='' name='message' />
        {/* <Button/> */}
      </Form.Item>


      <Button className='generate-button'>Generate Commit Message</Button>
    </div>
  )
}

export default App
