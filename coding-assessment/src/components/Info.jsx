import './info-styles.css';
import { useState, useEffect } from 'react';

const Info = ({ bundle }) => {
  const [includedProduct, setIncludedProduct] = useState([]);
  const [scentProfile, setScentProfile] = useState([]);

  //with each bundle, find the included product titles and scent profiles
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = bundle.products_included.map((el) =>
          fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${el}`)
            .then((res) => res.json())
        );
        //all the returned data
        const products = await Promise.all(productPromises);

        //set the states
        let productTitle = products.map((data) => data.title);
        let productScents = products.map((data) => data.scent_profile).flat();

        const duplicateProducts = {};
        for (const prod of productTitle){
          if (duplicateProducts[prod] !== undefined) duplicateProducts[prod]++;
          else duplicateProducts[prod] = 1;
        }

        setIncludedProduct(() => {
          const products = [];
          for (let key in duplicateProducts){
            if (duplicateProducts[key] === 1) products.push(key)
            else products.push(key + ' X ' + duplicateProducts[key])
          }
          return products;
        })

        productScents = [...new Set(productScents)] //get rid of duplicates
        setScentProfile(productScents);
        // setIncludedProduct(productTitle);

      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [bundle]);


    return (
      <div className="card-info">
        <div className='img-container'>
          <img src={bundle.imageSrc} />
        </div>
        <h2>{bundle.title}</h2>
        <div>
        <h3>Included</h3>
          {includedProduct.map((prod, idx) => (
            <p key={idx}>{prod}</p>
          ))}
        </div>
        <h3 className='price'>${bundle.price/100}</h3>
          {scentProfile.map((scent, idx) => (
            <p key={idx} className={`scent-${scent}`}>{scent.toUpperCase()}</p>
          ))}
      </div>
    );
  };
export default Info;