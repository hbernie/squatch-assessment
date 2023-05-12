import { useState, useEffect } from 'react';
import './info-styles.css';
import Info from './Info';

const Filter = ({ info }) => {
  const filterNames = ['woodsy', 'fresh', 'citrus', 'herbal', 'rich', 'spiced'];
  const [filtered, setFiltered] = useState(filterNames);
  const [toDisplay, setToDisplay] = useState(info);

  //filter each of the bundles scents and bundles to be displayed
  useEffect(() => {
    const fetchScents = async () => {
      let allScents = [];
      let display = [];

      for (const bundle_info of info) {
        for (const included of bundle_info.products_included) { //for all products included in a single bundle
          try { 
            let response = await fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${included}`);
            const data = await response.json();
            allScents.push(...data.scent_profile); //all the scents for each bundle

          } catch (error) {
            console.log(error);
          }
        }
        //between every bundle, filter bundles to be displayed based on checked scents
        const bundleScents = [...new Set(allScents)];
        if (filtered.some((scent) => bundleScents.includes(scent))) {
          display.push(bundle_info);
        }
        //empty for the next bundle's scents
        allScents = [];
      }
      setToDisplay(display); // Update the display state
    };
  
    fetchScents();
  }, [info, filtered]);



  //only pass in bundles that match the checked boxes
  const handleChecked = (event) => {
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
              onChange={handleChecked}
              checked={filtered.includes(filterName)} //all checked boxes on mount
              id={idx}
              value={filterName}/>
              <label>{filterName.charAt(0).toUpperCase() + filterName.slice(1)}</label>
            </div>
          ))}
      </div>
      <div className='bundle-component'>
        {toDisplay.map((bundle, id) => (
          <Info bundle={bundle} key={id}/> //pass all display bundle info to Info component
        ))}
      </div>
    </div>
  )
  
}
export default Filter;