import React from "react";
import PropTypes from "prop-types";
import style from "./cart.module.css";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const { productCon, product } = style;

  return (
    <section className={product}>
      <div className={productCon}>
        {cartItems.length === 0 ? (
          <p>No items added to cart</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <figure>
                <img src={item.image} alt={item.name} />
              </figure>
              <article>
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Remove From Cart
                </button>

                <p>${item.price ? item.price.toFixed(2) : ""}</p>
              </article>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
Cart.propTypes = {
  cartItems: PropTypes.array,
  onRemoveFromCart: PropTypes.func,
};
export default Cart;
