
import './App.css';

import Title from 'antd/es/typography/Title';

function App() {
  
  return (
    <div className='container'>
      <Title>Commit Message Generator</Title>
      <span className='subtitle'>Create consistent and informative commit messages</span>
      <div>
       <select>
        <option>Fix</option>
        <option>Documentation</option>
       </select>
      </div>
    </div>
  )
}

export default App
