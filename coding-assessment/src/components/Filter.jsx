const Filter = () => {
  const filter = [];
  const filterNames = ['Woodsy', 'Fresh', 'Citrus', 'Herbal', 'Rich', 'Spiced'];
  for (const name of filterNames){
    filter.push({ label: name, value: name.toLocaleLowerCase()});
  }

  return(
    <div className="filters">
        {filter.map((filterName, idx) => (
          <div key={idx}>
          <input type="checkbox" id={idx} value={filterName.value}/>
          <label>{filterName.label}</label>
          </div>
        ))}
    </div>
  )
  
}
export default Filter;