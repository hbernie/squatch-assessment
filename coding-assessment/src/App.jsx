import { useState, useEffect } from 'react';
// import Info from './components/Info';
import './App.css'
import Filter from './components/Filter';
import './components/info-styles.css'

function App() {
  const [info, setInfo] = useState([]);
  // const [filtered, setFiltered] = useState([]);

  //fetch all data and set its state
  useEffect(() => {
    fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles')
      .then(res => res.json())
      .then((data) => {
        setInfo(data);
      })
      .catch(err => console.log(err))
  }, []);

  //handle on/off check function and set state
  // const handleFilterChange = (filters) => {
  //   setFiltered(filters);
  // };

  // only send over bundles that are selected into Info component
  // const filteredBundles = info.filter(async (bundle) => {
  //   const bundleScentProfiles = bundle.products_included.map((el) =>
  //     fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${el}`)
  //       .then((res) => res.json())
  //       .then((data) => data.scent_profiles)
  //       .catch((err) => console.log(err))
  //   );
  
  //   const scentProfiles = await Promise.all(bundleScentProfiles);
  //   const uniqueProfiles = [...new Set(scentProfiles.flat())];
  //   return filtered.every((filter) => uniqueProfiles.includes(filter));
  // });

  return (
    <div>
      <Filter 
      // onCheck={handleFilterChange}
       info={info}/>
      {/* <div className='bundle-component'>
        {info.map((bundle, id) => (
          <Info bundle={bundle} key={id}/>
        ))}
      </div> */}
    </div>
  )
}

export default App
