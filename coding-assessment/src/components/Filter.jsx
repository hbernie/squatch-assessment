import { useState, useEffect } from 'react';
import './info-styles.css';
import Info from './Info';

const Filter = ({ info }) => {
  const filterNames = ['woodsy', 'fresh', 'citrus', 'herbal', 'rich', 'spiced'];
  const [filtered, setFiltered] = useState(filterNames);
  const [toDisplay, setToDisplay] = useState(info);

  //get the scents and titles of all the bundles
  useEffect(() => {
    const fetchScents = async () => {
      let allScents = [];
      let display = [];

      for (const bundle_info of info) {
        for (const included of bundle_info.products_included) {
          try { //for all products included in a single bundle
            let response = await fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${included}`);
            const data = await response.json();
            allScents.push(...data.scent_profile);

          } catch (error) {
            console.log(error);
          }
        }
        //between every bundle
        //if it matches filtered, add it to display
        //empty scents state and 
        const bundleScents = [...new Set(allScents)];
        if (filtered.some((scent) => bundleScents.includes(scent))) {
          display.push(bundle_info);
        }
        console.log(display)
        allScents = [];
      }
      setToDisplay(display); // Update the display state
    };
  
    fetchScents();
  }, [info, filtered]);



  //only pass in bundles that match the checked boxes
  const checked = (event) => {
    const filterVal = event.target.value;
    if (event.target.checked) {
      setFiltered((prevData) => [...prevData, filterVal]);
    } else {
      setFiltered((prevData) => prevData.filter((val) => val !== filterVal));
    }
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
        {toDisplay.map((bundle, id) => (
          <Info bundle={bundle} key={id}/>
        ))}
      </div>
    </div>
  )
  
}
export default Filter;