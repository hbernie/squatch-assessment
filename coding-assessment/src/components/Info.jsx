import './info-styles.css';
import { useState, useEffect } from 'react';

const Info = ({ bundle }) => {
  const [includedProduct, setIncludedProduct] = useState([]);
  const [scentProfile, setScentProfile] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = bundle.products_included.map((el) =>
        fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${el}`)
          .then((res) => res.json())
      );

      try {
        const products = await Promise.all(productPromises);
        const includedProducts = products.map((data) => data.title);
        const profiles = products.map((data) => data.scentProfile);

        setIncludedProduct(includedProducts);
        setScentProfile(profiles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [bundle.products_included]);

    return (
      <div className="info-container">
        <div className="card-info">
          <img src={bundle.imageSrc} />
          <h2>{bundle.title}</h2>
          <h3>Included</h3>
          <ul>
            {includedProduct.map((prod, idx) => (
              <li key={idx}>{prod}</li>
            ))}
          </ul>
          <h3>{bundle.price}</h3>
          <h3>{scentProfile}</h3>
        </div>
      </div>
    );
  };
export default Info;