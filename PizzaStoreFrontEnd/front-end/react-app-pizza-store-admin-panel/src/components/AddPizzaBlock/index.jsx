import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./AddPizzaBlock.module.scss";



import defaultImageSrc from '../../assets/img/defaultPizzaImage.jpg'
import Loader from '../Loader';

const initialFieldValues = {
  id:0,
  imageUrl: 'Some Url',
  title: '',
  price: '',
  description: '',
  categoryId: 1,
  
  //for preview
  imageSrc: defaultImageSrc,
  imageFile: null
}




function AddPizzaBlock({ addPizza }) {

  const [values, setValues] = useState(initialFieldValues);
  const [loading, setLoading] = useState(true);
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : "");
  const [errors, setErrors] = useState({});
  
  const [myCategories, setMyCategories] = useState([]);
  

 
  async function loadCategories() {
    setLoading(true);
    try {
      let response = await axios.get("http://localhost:13063/api/Category")
      setMyCategories(response.data);

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
    temp.title = values.title === "" ? false : true;
    temp.price = values.price === "" ? false : true;
    temp.categoryId = values.categoryId <= 0 ? false : true;
    temp.description = values.description === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;

    setErrors(temp);
    return Object.values(temp).every(value => value === true);
  }

  function handleInputChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = x => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result
        })
      };

      reader.readAsDataURL(imageFile);
    }
    else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
  }

  function resetForm() {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();
      formData.append('id',values.id);
      formData.append('imageUrl', values.imageUrl);
      formData.append('title', values.title);
      let price = values.price.toString().replace(".",",");
      formData.append('price', price);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);
      formData.append('imageFile', values.imageFile);
      
      for (var pair of formData.entries()) {
        console.log(pair[0] + ':' + pair[1]);
      }

      addPizza(formData, resetForm);

    }

  }

  if(loading) return (<Loader/>)
  if(myCategories.length === 0) return(<h1 style={{"textAlign":"center"}}>Firstly, add at least 1 category</h1>)
  return (
    <>
      <h3>
        Add Pizza Here
      </h3>

      <form className={styles.form} action="" autoComplete='off' noValidate onSubmit={handleFormSubmit}>
        <div className={styles.card}>
          <img src={values.imageSrc} alt="No Pic Choosen" className={styles.img} />
          <div className='card-body'>
            <div className='form-group'>
              <input type="file" accept='image/*' className={'form-control-file' + applyErrorClass('imageSrc')} onChange={showPreview} id="image-uploader" />
            </div>
            <div style={{display:'flex', gap:'10px', flexDirection:'column'}} className='form-group'>
              <input onChange={handleInputChange} className={'form-control' + applyErrorClass('title')} placeholder='Title' type="text" name="title" value={values.title} />
              <input onChange={handleInputChange} className={'form-control' + applyErrorClass('price')} placeholder='Price' type="text" name="price" value={values.price} />
              <textarea onChange={handleInputChange} className={'form-control' + applyErrorClass('description')} placeholder='Description' type="text" name="description" value={values.description} />
            </div>

            <select value={values.categoryId} onChange={handleInputChange} name="categoryId">
              {myCategories.map((obj) => <option key={obj.id} value={obj.id}>{obj.name}</option>)}
            </select>

            <div className='form-group text-center'>
              <button type='submit' className='button button'>Add Pizza</button>
            </div>
          </div>
        </div>
      </form>

     


    </>
  )
}

export default AddPizzaBlock;

