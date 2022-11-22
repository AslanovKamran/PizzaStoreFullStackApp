import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';
import Header from '../components/Header';

function DeletePizza() {
    const params = useParams();
    const navigate = useNavigate();

    const [pizza, setPizza] = useState();

    async function LoadPizza() {
        try {
            const response = await axios.get(`http://localhost:13063/api/Pizza/${params.id}`);
            setPizza(response.data);

        } catch (error) {
            swal("Wrong path!", "", "error");
            navigate("/");
        }
    }
    useEffect(() => {
        LoadPizza();
    }, []);

    function deletePizza() {
        axios.delete(`http://localhost:13063/api/Pizza/${pizza.id}`)
            .then(res => { console.log(res); swal("Pizza has been deleted", "", "success"); console.log("A Successful Request!" + res.data); navigate('/addPizzas') })
            .catch(error => { console.log(error) });
    }

    if (pizza) {

        return (
            <>
            <Header/>
                <div className='delete__block'>


                    <div className='delete__block__pizza-info'>

                        <img
                            className="pizza-block__image"
                            src={"http://localhost:13063/content/" + pizza.imageUrl}
                            alt="Pizza"
                        />
                       
                            <h4 className="pizza-block__title">{pizza.title} {pizza.id}</h4>
                            <p>Price: {pizza.price} $</p>
                            <p>{pizza.description}</p>
                       

                    </div>
                </div>

                <div className='delete__block__buttons'>


                <Link to={`/updatePizza/${pizza.id}`}>
                    <button className="button button--outline button--add">
                        <span>Update ☰</span>
                    </button>
                </Link>

                <button className="button button--black " onClick={deletePizza}>Delete ✖</button>
                </div>



            </>
        )
    }
}

export default DeletePizza