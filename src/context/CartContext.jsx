import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const CartContext = React.createContext({
  CartItems: [],
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [CartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);


  const products = useFetch();
  //This function finds a product by id and adds the found product to cart
  const setCartDetails = (cart, total) => {
    localStorage.setItem("CartItems", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  };

  const addToCartHandler = (id) => {
    let newCartItem = products.find((product) => product.id === id);
    setCartItems((prevData) => {
      if (prevData.includes(newCartItem)) {
        setCartDetails(prevData);
        return prevData;
      } //increments the total items in cart when add to cart is clicked
      let incrementCartTotal = totalItems + 1;
      setTotalItems(incrementCartTotal);
      setCartDetails([...prevData, newCartItem], incrementCartTotal);

      return [...prevData, newCartItem];
    });
  };
  //This function finds a product by id and removes the found product from cart
  const removeFromCartHandler = (id) => {
    let decrementCartTotal = totalItems - 1;
    setTotalItems(decrementCartTotal);
    setCartItems((prevData) => {
      let deletedCartItem = prevData.filter((product) => product.id !== id);
      setCartDetails(deletedCartItem, decrementCartTotal);
      return deletedCartItem;
    });
  };


  const getCartDetails = () => {
    if (localStorage.getItem("CartItems") === null) {
      setCartDetails(CartItems, totalItems);
    } else {
      const cartData = JSON.parse(localStorage.getItem("CartItems"));
      const total = JSON.parse(localStorage.getItem("total"));
      setCartItems(cartData);
      setTotalItems(total);
    }
  };
  useEffect(() => {
    getCartDetails();
    localStorage.clear()
  
    
  }, [getCartDetails]);

  const cartData = {
    CartItems,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    totalItems,
  };
  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};
