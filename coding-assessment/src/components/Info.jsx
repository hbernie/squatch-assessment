import './info-styles.css';
import { useState, useEffect } from 'react';

const Info = ({ bundle }) => {
  const [includedProduct, setIncludedProduct] = useState([]);
  const [scentProfile, setScentProfile] = useState([]);

  //with each bundle, find the included product titles and scent profiles
  useEffect(() => {
    //can't do this without async/await
    const fetchProducts = async () => {
      try {
        const productPromises = bundle.products_included.map((el) =>
          fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${el}`)
            .then((res) => res.json())
        );
        //all the returned data
        const products = await Promise.all(productPromises);

        //set the states
        let includedProducts = products.map((data) => data.title);
        let profiles = products.map((data) => data.scent_profile).reduce((acc, curr) => acc.concat(curr), []); //always adding to array
        profiles = [...new Set(profiles)] //get rid of duplicates
        
        //TODO: display the duplicates in the included products ex: Birchwood Breeze Deodorant X 3

        setIncludedProduct(includedProducts);
        setScentProfile(profiles);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProducts();
  }, [bundle.products_included]);


    return (
      <div className="card-info">
        <div className='img-container'>
          <img src={bundle.imageSrc} />
        </div>
        
        <h2>{bundle.title}</h2>
        <h3>Included</h3>
        <div>
          {includedProduct.map((prod, idx) => (
            <p key={idx}>{prod}</p>
          ))}
        </div>
        <h3>${bundle.price/100}</h3>
          {scentProfile.map((scent, idx) => (
            <p key={idx} className={`scent-${scent}`}>{scent.toUpperCase()}</p>
          ))}
      </div>
    );
  };
export default Info;