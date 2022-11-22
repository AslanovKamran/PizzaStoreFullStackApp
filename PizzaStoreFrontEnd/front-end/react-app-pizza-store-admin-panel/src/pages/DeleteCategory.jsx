import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import Header from '../components/Header';
import Loader from '../components/Loader';

function DeleteCategory() {

  const navigate = useNavigate();
  const params = useParams();

  const [category, setCategory] = useState();

  const [pizzas, setPizzas] = useState([]);

  async function LoadCategoryAndPizzaCount() {
    try {
      const response = await axios.get(`http://localhost:13063/api/Category/GetPizzasCountByCategoryId/${params.id}`)
      console.log(response);
      setCategory(response.data);
    } catch (error) {
      swal("Wrong path!", "", "error");
      navigate('/addCategories');
    }
  }

  useEffect(() => {
    LoadCategoryAndPizzaCount();
    console.log("use Effect workd")
  }, [params.id]);

  function submitDeleting() {
    axios.delete(`http://localhost:13063/api/Category/${category.id}`)
      .then(res => { console.log(res); swal("Category has been deleted", "", "success"); console.log("A Successful Request!" + res.data); navigate('/addCategories') })
      .catch(error => {
        console.log(error);
        switch (error.response.status) {
          case 500: {
            setPizzas(error.response.data.pizzas); swal("Cannot delete this category", "It includes the following pizza(s)", "error");
          }
        }

      });

  }

  console.log(category);
  console.log(pizzas);
  if (!category) return (<Loader />)
  return (
    <>
    <Header/>
      <div className='deleteCategory'>

        <h3>Are you sure you want to delete this category?</h3>
        <h3>Category: {category.name}</h3>
        <h3> This category has {category.pizzasCount} pizzas</h3>

        <div className='deleteCategory__buttons'>

          <Link to={`/updateCategory/${category.id}`}>
            <button className="button button--outline button--add">
              <span>Update ☰</span>
            </button>
          </Link>
          <button className="button button--black " onClick={submitDeleting}>Delete ✖</button>
        </div>


      </div>
      {
        pizzas.length
        ? pizzas.map((obj) => <h3 key={obj.id}>{obj.title}</h3>)
        : <></>
      }
      <h6 className='deleteCategory__hidden'>Empty Block</h6>
    </>
  )
}

export default DeleteCategory