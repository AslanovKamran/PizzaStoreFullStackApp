import React from 'react'
import pizzaLogoSvg from '../assets/img/pizza-logo.svg'

const Loader:React.FC=()=> {
    return (
        <div className='loader'>
            <div className='loader__image'>
                <img src={pizzaLogoSvg} alt="Pizza Logo" />
            </div>

            <div className='loader__text'>
                <h2>
                   Loading
                </h2>
                    <span className='dot first'></span>
                    <span  className='dot second'></span>
                    <span className='dot third'></span>
            </div>
        </div>
    )
}

export default Loader
