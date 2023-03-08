import  { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCartContext = () => {
  let cartData = useContext(CartContext);
  return cartData;
};

export default useCartContext;
