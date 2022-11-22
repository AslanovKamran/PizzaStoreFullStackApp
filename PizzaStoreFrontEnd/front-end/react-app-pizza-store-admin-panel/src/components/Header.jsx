import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import pizzaLogoSvg from '../assets/img/pizza-logo.svg'




function Header() {



  return (
    <div className="header">
      <div className="container">

        <Link to="/home">
          <div className="header__logo">
            <img width="38" src={pizzaLogoSvg} alt="Pizza logo" />
            <div>
              <h1>Pizza Store</h1>
              <p>Step It Project</p>
            </div>
          </div>
        </Link>



        <div className='container__routes'>

          <Link to="/addPizzas" className="button button--black">
            <span>Pizzas</span>
          </Link>
          <Link to="/addCategories" className="button button--black">
            <span>Categories</span>
          </Link>
        </div>
      </div>

     
    </div>
  )
}

export default Header