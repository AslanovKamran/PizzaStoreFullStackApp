import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import pizzaImg from "../assets/img/defaultPizzaImage.jpg";
import userImg from "../assets/img/DefaultUser.png";
import pizzaCategories from "../assets/img/pizzaCategories.jpg";
import Header from '../components/Header';
import Loader from '../components/Loader';

function HomePage() {

    const [amoutOfPizza,setAmountOfPizza] = useState();
    const [amoutOfCategories,setAmountOfCategories] = useState();
    const [amoutOfUsers,setAmountOfUsers] = useState();
    const [loading, setLoading] = useState(true); 

    async function loadInitialIfno() {
        console.log("Worked")
        setLoading(true);
        try {
           let response = await axios.get(`http://localhost:13063/api/DbInfo`);
           console.log(response.data);
           setAmountOfCategories(response.data.amountOfCategories);
           setAmountOfUsers(response.data.amountOfUsers);
           setAmountOfPizza(response.data.amountOfPizza);
        } catch (error) {
            console.log("Error:" + error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadInitialIfno();
    }, [])

    if(loading) return(<Loader></Loader>)

    return (
        <>
        <Header/>
            <div className=''>

                <div className='content'>
                    <h5>All Info:</h5>
                    <hr />
                </div>


                <div className='home-content'>

                    <div className='home-content__block'>
                        <h5>Pizzas</h5>
                        <p>Press on the image to go to the pizza operations</p>
                        <div>
                            <Link to="/addPizzas">
                                <img src={pizzaImg} alt="Default" />
                            </Link>
                            <h5>Total Amount: <CountUp end={amoutOfPizza} duration={1}></CountUp></h5>
                        </div>
                    </div>


                    <div className='home-content__block'>
                        <h5>Categories</h5>
                        <p>Press on the image to go to the category operations</p>
                        <div>
                            <Link to="/addCategories">
                                <img src={pizzaCategories} alt="Default" />
                            </Link>
                            <h5>Total Amount: <CountUp end={amoutOfCategories} duration={1}></CountUp></h5>
                        </div>
                    </div>

                    <div className='home-content__block'>
                        <h5>Users</h5>
                        <p>Press on the image to go to the category operations</p>
                        <div>
                            <Link to="/addPizzas">
                                <img src={userImg} alt="Default" />
                            </Link>
                            <h5>Total Amount: <CountUp end={amoutOfUsers} duration={1}></CountUp></h5>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomePage