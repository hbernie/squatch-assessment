import './info-styles.css';
import { useState } from 'react';
const Info = ({ info }) => {

  // const [includedProduct, setIncludedProduct] = useState({});
  // useEffect(() => {
  //   fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product')
  //     .then(res => res.json())
  //     .then((data) => {
  //       setInfo(data);
  //     })
  //     .catch(err => console.log(err))
  // }, []);

  return (
    <div className="info-container">
      {info.map((bundle, id) => {
        const { handle, title, products_included, price, imageSrc } = bundle;
        return (
          <div key={id} className="card-info">
            <img src={imageSrc} />
            <h2>{title}</h2>
            <h3>Included</h3>
            <div>{products_included.map((prod, idx) => (
              <p key={idx}>{prod}</p>
            ))}</div>
            <h3>{price}</h3>
          </div>
        )
      })}
    </div>
  )
}
export default Info;