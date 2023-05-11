import { useState, useEffect } from 'react';
import './info-styles.css';
import Info from './Info';

const Filter = ({ info }) => {
  const filterNames = ['woodsy', 'fresh', 'citrus', 'herbal', 'rich', 'spiced'];
  const [scents, setScents] = useState([]);
  const [filtered, setFiltered] = useState(filterNames);
  const [toDisplay, setToDisplay] = useState([]);

  //get the scents and titles of all the bundles

  useEffect(() => {
    const fetchScents = async () => {
      const allScents = [];
  
      for (const bundle_info of info) {
        for (const included of bundle_info.products_included) {
          try {
            let response = await fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${included}`);
            const data = await response.json();
            allScents.push(...data.scent_profile);
          } catch (error) {
            console.log(error);
          }
        }
      }
  
      let uniqueScents = [...new Set(allScents)]; // Get rid of duplicates
      setScents(uniqueScents);
    };
  
    fetchScents();
  }, [info, filtered]);

  useEffect(() => {
    let display = []
    for (const bundle of info){
      for (const product of scents){
        if (filtered.includes(product)){
          display.push(bundle)
        }
      }
    }
    display = [...new Set(display)];
    setToDisplay(display);
  }, [filtered, info, scents])



  //only pass in bundles that match the checked boxes
  const checked = (event) => {
    const filterVal = event.target.value;
    if (event.target.checked) {
      setFiltered((prevData) => [...prevData, filterVal]);
    } else {
      setFiltered((prevData) => prevData.filter((val) => val !== filterVal));
    }
    setScents([]);
  };


  return(
    <div className='filter-component'>
      <div className="filters">
          {filterNames.map((filterName, idx) => (
            <div key={idx}>
            <input 
              type="checkbox"
              onChange={checked}
              checked={filtered.includes(filterName)}
              id={idx}
              value={filterName}/>
              <label>{filterName}</label>
            </div>
          ))}
      </div>
      <div className='bundle-component'>
        {toDisplay && toDisplay.map((bundle, id) => (
          <Info bundle={bundle} key={id}/>
        ))}
      </div>
    </div>
  )
  
}
export default Filter;