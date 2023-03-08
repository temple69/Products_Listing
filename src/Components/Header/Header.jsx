
import React from 'react'
import styling from './header.module.css'
import PropTypes from 'prop-types';

const Header = ({totalItems,openCartHandler}) => {
    const{header}=styling
  return (
    <header className={header}>
        <nav>
            <h2>Temple Stores</h2>
            <button onClick={openCartHandler}>My Cart <span>{totalItems}</span></button>
        </nav>
    </header>
  )
}
Header.propTypes={
    totalItems:PropTypes.number,
    openCartHandler:PropTypes.func
}

export default Header