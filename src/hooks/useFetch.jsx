import  { useEffect, useState } from "react";

const useFetch = () => {
  const [products, setProductsData] = useState([]);
  useEffect(() => {
    // this functions fetches products data from an API and also checks for error;
    const getProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const productsdata = await response.json();
        let filteredData = {};
        let newData = productsdata.map((product) => {
          return (filteredData = {
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
          });
        });
        setProductsData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return products;
};

export default useFetch;
