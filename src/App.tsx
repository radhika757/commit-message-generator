
import { Button, Form, Input, Select } from 'antd';
import './App.css';

import Title from 'antd/es/typography/Title';
import { Option } from 'antd/es/mentions';

function App() {

  return (
    <div className='container'>
      <Title>Commit Message Generator</Title>
      <span className='subtitle'>Create consistent and informative commit messages</span>
      <div>
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

      </div>

      <div>
        <Form.Item>
          <Input placeholder='Scope (Optional)' value='' name='scope' />
        </Form.Item>

        <Form.Item>
          <Input placeholder='Ticket Number (Optional)' value='' name='ticketNum' />
        </Form.Item>
      </div>

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
