import { useState, useEffect } from 'react';
import Info from './components/Info';
import './App.css'

function App() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles')
      .then(res => res.json())
      .then((data) => {
        setInfo(data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <Info info={info}/>
    </div>
  )
}

export default App
