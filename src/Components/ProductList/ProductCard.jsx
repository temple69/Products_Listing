import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ name, image, price, description,onAddToCart,clicked }) => {
  return (
    <div>
        <h4>{name}</h4>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <article>
      <button onClick={onAddToCart}>Add To CART</button>
        
        <p>${price.toFixed(2)}</p>
      </article>
      <p>{description}</p>
      
    </div>
  );
};
ProductCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string,
  onAddToCart: PropTypes.func,
};
export default ProductCard;
