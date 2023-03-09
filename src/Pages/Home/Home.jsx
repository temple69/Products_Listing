import React, {  useEffect, useState } from "react";
import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import ProductList from "../../Components/ProductList/ProductList";
import useCartContext from "../../hooks/useCartContext";
import useFetch from "../../hooks/useFetch";


const Home = () => {
  const cartData = useCartContext();
  const { CartItems,removeFromCart,totalItems} = cartData;
  const products = useFetch();
  const [showCart,setShowCart]=useState(false)
  const showCartHandler=()=>{
    setShowCart(true)
  }
  const hideCartHandler=()=>{
    setShowCart(false)
  }
  
  

  return (
    <>
    <Header totalItems ={totalItems} openCartHandler={showCartHandler}/>
    <main>
      <ProductList products={products} />
      {showCart?<Cart cartItems={CartItems}
      onRemoveFromCart={removeFromCart} closeCart={hideCartHandler}/>:""}
    </main>
    </>
  );
};

export default Home;
