import { useState, useEffect } from 'react';
import Info from './components/Info';
import './App.css'
import Filter from './components/Filter';

function App() {
  const [info, setInfo] = useState([]);

  //fetch data and send over to Info component bundle by bundle
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
      <Filter />
      {info.map((bundle, id) => (
        <Info bundle={bundle} key={id}/>
      ))}
    </div>
  )
}

export default App
