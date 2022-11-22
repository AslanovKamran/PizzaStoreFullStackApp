import React from 'react';
import { useState } from 'react';
import styles from "./AddCategoriesBlock.module.scss";
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../Loader';
import swal from 'sweetalert';
import CategoryBlock from '../CategoryBlock';

const initialStateValues = {
  id: 0,
  name: '',
}

function AddCategoriesBlock() {

  const [values, setValues] = useState(initialStateValues);
  const [loading, setLoading] = useState(true);
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : "");
  const [errors, setErrors] = useState({});


  const [myCategories, setMyCategories] = useState([]);

  async function loadCategories() {
    setLoading(true);
    try {
      let response = await axios.get("http://localhost:13063/api/Category");
      console.log(response);
      setMyCategories(response.data);
      console.log(myCategories);

    } catch (error) {
      console.log("Error:" + error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function isValid() {
    let temp = {}
    temp.name = values.name === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every(value => value === true);
  }

  function handleInputChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function resetForm() {
    setValues(initialStateValues);
    setErrors({});
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();

      formData.append('name', values.name);



      axios.post('http://localhost:13063/api/Category', (formData))
        .then(res => { console.log(res); resetForm(); loadCategories(); swal("Category has been added", "", "success"); })
        .catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400: swal("Validation error", "Category can't be empty", "error"); resetForm(); break;
              case 500: swal("Could't add Category", "Check the name. It may be repeated", "warning"); resetForm(); break;
              default: swal("Something went wrong", "Unexpected error", "error"); resetForm(); break;
            }
          }
        });
    }
  }

  if (loading) return (<Loader />);
  return (
    <>
      <h3>
        Add Category Here
      </h3>

      <form action="" autoComplete='off' noValidate onSubmit={handleFormSubmit}>

        <div className={styles.form}>
          <input onChange={handleInputChange} className={'form-control' + applyErrorClass('name')} placeholder='Category Title' type="text" name="name" value={values.name} />
          <button type='submit' className='button button'>Add</button>
        </div>
      </form>

      <h3 style={{ textAlign: 'center' }}>All Categories</h3>

      <div className={styles.categoriesList}>
        {
          myCategories.map((obj) => (<CategoryBlock key={obj.id} {...obj} />))
        }
      </div>

      <div className={styles.empty}>Don't look here</div>
    </>
  )
}

export default AddCategoriesBlock