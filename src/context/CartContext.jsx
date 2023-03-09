import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const CartContext = React.createContext({
  CartItems: [],
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartDetails, setCartDetail] = useState({
    CartItems: [],
    totalItems: 0,
  });
  const { CartItems, totalItems } = cartDetails;

  const products = useFetch();
  //This function finds a product by id and adds the found product to cart
  const setCartDetails = (cart, total) => {

    localStorage.setItem("CartItems", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  };

  const addToCartHandler = (id) => {
    let newCartItem = products.find((product) => product.id === id);
    setCartDetail((prevData) => {
      const { CartItems, totalItems } = prevData;

      if (CartItems.includes(newCartItem)) {
        setCartDetails(CartItems, totalItems);
        return prevData;
      } //increments the total items in cart when add to cart is clicked
      else{
      let incrementCartTotal = totalItems + 1;
      if (CartItems.includes(newCartItem)){
        return prevData
      }
      setCartDetails([...CartItems, newCartItem], incrementCartTotal);
      return {
        ...prevData,
        CartItems: [...CartItems, newCartItem],
        totalItems: incrementCartTotal,
        
      };
      }

      
    });
  };
  //This function finds a product by id and removes the found product from cart
  const removeFromCartHandler = (id) => {
    let decrementCartTotal = totalItems - 1;
    setCartDetail((prevData) => {
      let deletedCartItem = prevData.CartItems.filter((product) => product.id !== id);
      setCartDetails(deletedCartItem, decrementCartTotal);
      return {
        ...prevData,
        CartItems: deletedCartItem,
        totalItems: decrementCartTotal,
      };
    });
  };

  const getCartDetails = () => {
    if (localStorage.getItem("CartItems") === null) {
      setCartDetails(CartItems, totalItems);
    } else {
      const cartData = JSON.parse(localStorage.getItem("CartItems"));
      const total = JSON.parse(localStorage.getItem("total"));

      setCartDetail((prevData) => {
        return {
          ...prevData,
          CartItems: cartData,
          totalItems: total,
        };
      });
    }
  };
  useEffect(() => {
    getCartDetails();
    
  
  }, []);
  

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
