import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import Header from '../components/Header';
import Loader from '../components/Loader';

function UpdateCategory() {

  const navigate = useNavigate();
  const params = useParams();

  const [category, setCategory] = useState();
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : "");
  const [errors, setErrors] = useState({});

  function isValid() {
    let temp = {}
    temp.name = category.name === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every(value => value === true);
}

async function LoadCurrentCaegory() {
  try {
      const response = await axios.get(`http://localhost:13063/api/Category/${params.id}`);
      console.log(response);
      setCategory(response.data)

  } catch (error) {
      swal("Wrong path!", "", "error");
      navigate('/addCategories');

  }
}

useEffect(()=>{
  LoadCurrentCaegory();
  console.log("use Effect workd")
},[params.id]);



console.log(category);

if(!category) return (<Loader/>);


async function handleFormSubmit(event){
  event.preventDefault();
  if(isValid()){
    const formData = new FormData();

    formData.append('id', category.id);
    formData.append('name',category.name);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ':' + pair[1]);

      axios.put('http://localhost:13063/api/Category',formData)
      .then(res=>{console.log(res); swal("Category has been updated", "Yes","success"); navigate('/addCategories')})
      .catch(err=>{
        console.log(err.response);
        switch(err.response.status){
          case 500: swal("Cannot Add A repetative Category", "Please, type in another name", "error"); break;
          case 400: swal("Walidation error" , "Try Again with other data", "error"); break;
          default:swal("Unexpected Error", "","error");
        }
      })
  }
  }
}

function handleInputChange(event) {
  setCategory({
      ...category,
      [event.target.name]: event.target.value
  });
}

  
  
  return (
    <>
    <Header/>
      <h3>Category to  Update</h3>
      <form action="" autoComplete='off' noValidate onSubmit={handleFormSubmit}>
        <div className='update--block'>
        <input className={'form-control' + applyErrorClass('name')} onChange={(handleInputChange)} name="name" type="text" value={category.name} />
        <button className='button button' type='submit'>Sumbit</button>
        </div>
      </form>
    </>
  )
}

export default UpdateCategory