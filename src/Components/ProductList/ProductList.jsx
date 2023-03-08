import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import style from './productlist.module.css'
import useCartContext from '../../hooks/useCartContext';



const ProductList = ({products}) => {
    const{productCon,product}=style
    const Cartdata= useCartContext()
    const{addToCart}=Cartdata
  return (
    <section className={product
    }>
        <h2>Product Section</h2>
        <div className={productCon
    }>
        {products.map(product=>(
             <ProductCard 
             key={product.id}
             id={product.id}
             name={product.name}
             price={product.price}
             image={product.image}
             onAddToCart={()=>addToCart(product.id)}
             
             />

        ))}
        </div>
       

    </section>
  )
}
ProductList.propTypes={
    products:PropTypes.array
}
export default ProductList
