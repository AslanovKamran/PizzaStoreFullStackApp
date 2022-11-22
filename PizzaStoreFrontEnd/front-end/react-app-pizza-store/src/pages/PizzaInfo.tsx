import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';


import swal from 'sweetalert';
import { addItem } from '../redux/slices/cart/slice';


interface IPizza{
    id:number,
    imageUrl:string,
    title:string,
    price:number,
    description:string
  }

const PizzaInfo:React.FC = ()  =>{
    const params = useParams();
    const [pizza, setPizza] = useState<IPizza>();
    const navigate = useNavigate();

    async function LoadPizza() {
        try {
            const { data } = await axios.get(`http://localhost:13063/api/Pizza/${params.id}`);
            setPizza(data);
        } catch (error) {
            swal("Wrong path!", "", "error");
            navigate("/");
        }
    }
    useEffect(() => {
        LoadPizza();
    }, []);

   
    const dispatch = useDispatch();

    function AddItem() {
        if(pizza){

            const item = {
                id: pizza.id,
                title: pizza.title,
                price: pizza.price,
                imageUrl: pizza.imageUrl,
            };
            dispatch(addItem(item));
        }
    }

    if (!pizza) { return (<Loader />) }

    return (
        <div className='container'>
            <div className='content__info'>

                <img src={"http://localhost:13063/content/" + pizza.imageUrl} alt="pizzaImg"/>
                <h3>{pizza.title}</h3>
                <p>{pizza.description}</p>
                <h3>Price : {pizza.price}$</h3>
            </div>
            <div className="cart__bottom-buttons">
                
                <Link to="/" className="button button--outline button--add go-back-btn">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>Back to the store</span>
                </Link>

                <button onClick={AddItem} className="button button--outline button--add">
                    <span> Add to the cart</span>
                </button>

            </div>

            <div className="pizza-block__bottom">

            
            </div>
        </div>
    )
}

export default PizzaInfo