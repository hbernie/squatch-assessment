import { useState, useEffect } from 'react';
import './App.css'
import Filter from './components/Filter';
import './components/info-styles.css'

function App() {
  const [info, setInfo] = useState([]);

  //fetch all data and set its state
  useEffect(() => {
    fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles')
      .then(res => res.json())
      .then((data) => {
        setInfo(data);
      })
      .catch(err => console.log(err))
  }, []);

  //pass in all info to Filer component
  return (
    <div>
      <Filter info={info}/>
    </div>
  )
}

export default App
