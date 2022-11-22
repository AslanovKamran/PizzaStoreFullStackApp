import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

import styles from "../components/AddPizzaBlock/AddPizzaBlock.module.scss";

import swal from 'sweetalert';
import Header from '../components/Header';

function UpdatePizza() {

    const navigate = useNavigate();
    const params = useParams();

    const [pizza, setPizza] = useState();
    const [categories, setCategories] = useState([]);

    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : "");
    const [errors, setErrors] = useState({});


    function isValid() {
        let temp = {}
        temp.title = pizza.title === "" ? false : true;
        temp.price = pizza.price === "" ? false : true;
        temp.description = pizza.description === "" ? false : true;
        temp.categoryId = pizza.categoryId <= 0 ? false : true;

        setErrors(temp);
        return Object.values(temp).every(value => value === true);
    }


    async function LoadPizza() {
        try {
            const response = await axios.get(`http://localhost:13063/api/Pizza/${params.id}`);
            setPizza(response.data);

        } catch (error) {
            swal("Wrong path!", "", "error");
            navigate("/");
        }
    }

    async function LoadCategories() {
        try {
            const response = await axios.get(`http://localhost:13063/api/Category`);
            setCategories(response.data);

        } catch (error) {
            swal("Wrong path!", "", "error");

        }
    }

    useEffect(() => {
        LoadPizza();
        LoadCategories();
    }, [params.id]);





    async function handleFormSubmit(event) {
        event.preventDefault();
        if (isValid()) {

            const formData = new FormData();

            
            formData.append('id', pizza.id);
            formData.append('title', pizza.title);
           
            formData.append('price', pizza.price.toString().replace('.',','));
            formData.append('description', pizza.description);
            formData.append('categoryId', pizza.categoryId);
           

            for (var pair of formData.entries()) {
                console.log(pair[0] + ':' + pair[1]);
            }
            axios.put('http://localhost:13063/api/Pizza', formData)
                .then(res => { console.log(res); swal("Pizza has been updated", "", "success"); console.log("A Successful Request!" + res); navigate('/addPizzas') })
                .catch(err => {
                    console.log(err.response.status);
                    switch (err.response.status) {
                        case 400: swal("Validation Error!", "Check your price Ex: 17,05", "error"); break;
                        default: swal("Unexpected Error!", "Contact the admin", "error");
                    }
                })


        }
    }

    function handleInputChange(event) {
        setPizza({
            ...pizza,
            [event.target.name]: event.target.value
        });
    }

    if (!pizza || categories.length === 0) return (<Loader />)
    if (pizza && categories.length>0) {
        return (
            <>
            <Header/>
            <h4 style={{textAlign:'center',marginTop:'20px'}}>Pizza To Update:</h4>
                <form action="" autoComplete='off' noValidate onSubmit={handleFormSubmit}>
                    <div className='update--block'>
                        <img src={"http://localhost:13063/content/" + pizza.imageUrl} alt="No Pic Choosen" className={styles.img} />
                        <h3>{pizza.category}</h3>
                        <input className={'form-control' + applyErrorClass('title')} onChange={(handleInputChange)} name="title" type="text" value={pizza.title} />
                        <input className={'form-control' + applyErrorClass('price')} onChange={handleInputChange} name="price" type="number" value={pizza.price} />
                        <textarea className={'form-control' + applyErrorClass('description')} onChange={handleInputChange} name="description" type="textarea" value={pizza.description} />
                        <select value={pizza.categoryId} onChange={handleInputChange} name="categoryId">
                            {categories.map((obj) => <option key={obj.id} value={obj.id}>{obj.name}</option>)}
                        </select>
                        <button className='button button' type='submit'>Sumbit</button>
                    </div>
                </form>

            </>
        )
    }
}

export default UpdatePizza