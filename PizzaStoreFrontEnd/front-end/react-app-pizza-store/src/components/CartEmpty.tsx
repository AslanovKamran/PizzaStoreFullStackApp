import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from "../assets/img/empty-cart.png";

const  CartEmpty:React.FC =() => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Your cart is empty <span>😕</span></h2>
                <p>
                   Probably, no pizza was ordered.<br />
                    Go the main catalog to order one.
                </p>
                <img src={emptyCartImg} alt="Empty cart" />
                <Link to="/"  className="button button--black">
                    <span>Go back</span>
                </Link>
            </div>
        </>
    )
}

export default CartEmpty