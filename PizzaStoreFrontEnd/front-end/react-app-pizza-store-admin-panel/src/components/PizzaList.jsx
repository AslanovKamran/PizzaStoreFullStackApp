import React, { useEffect, useState } from 'react';
import AddPizzaBlock from '../components/AddPizzaBlock';
import axios from 'axios';

import swal from 'sweetalert';
import Pagination from './Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { paginationSelector, setCurrentPage } from "../redux/slices/paginationSlice";
import Loader from './Loader';
import PizzaBlock from './PizzaBlock';


function PizzaList() {

    const dispatch = useDispatch();
    const pagination = useSelector(paginationSelector);
    const currentPage = pagination.currentPage;


    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageInfo, setPageInfo] = useState([]);

    async function loadPizzas() {
        console.log("Worked")
        setLoading(true);
        try {
            let response = await axios.get(`http://localhost:13063/api/Pizza?sortBy=price&orderBy=asc&page=${currentPage}`);
            setPizzas(response.data.pizzas);
            setPageInfo(response.data.pageInfo);

        } catch (error) {
            console.log("Error:" + error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPizzas();
    }, [currentPage], [pizzas])



    const pizzaApi = (url = 'http://localhost:13063/api/Pizza') => {
        return {
            create: newRecord => axios.post(url, newRecord),
        }
    }

    function addPizza(formData, resetForm) {
        pizzaApi().create(formData)
            .then(res => {

                swal("Pizza has been added", "", "success");
                console.log("A Successful Request!" + res);
                loadPizzas();
                resetForm();
            })
            .catch(function (error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 400: swal("Validation error", "May be the price you've typed is wrong.", "error"); resetForm(); break;
                        case 500: swal("Couldn't add pizza", "Check the title. It may be repeated", "warning"); resetForm(); break;
                        default: swal("Something went wrong", "Unexpected error", "error"); resetForm(); break;
                    }
                }
            })

    }

    function onPageChange(number) {
        dispatch(setCurrentPage(number));
    }




    if (loading) return (<Loader/>);
    return (
        <>
            <AddPizzaBlock addPizza={addPizza} />
            <h3 style={{textAlign:'center'}}>All pizzas</h3>

            <div className="content__items">

                {
                    pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
                }

            </div>

            {
                pizzas.length === 0 &&
                <h1 style={{ textAlign: 'center' }}>No Pizzas</h1>
            }
            {pizzas.length > 0 &&
                <Pagination onPageChange={onPageChange} currentPage={currentPage} pageCount={Math.ceil(pageInfo.totalPages)} itemsPerPage={Math.ceil(pageInfo.itemsPerPage)} />
            }



        </>
    )
}

export default PizzaList