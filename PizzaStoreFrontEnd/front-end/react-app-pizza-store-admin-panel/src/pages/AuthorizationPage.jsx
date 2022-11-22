import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelector, setAdmin } from '../redux/slices/adminSlice';

const initialState = {
  login: '',
  password: ''
}

function AuthorizationPage() {

  var naviagate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [credentials, setCredentials] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : "");
  const [errors, setErrors] = useState({});

  const admin = useSelector(adminSelector);
  const dispatch = useDispatch();

  function isValid() {
    let temp = {}
    temp.login = credentials.login === "" ? false : true;
    temp.password = credentials.password === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every(value => value === true);
  }

  function handleInputChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  function resetForm() {
    setCredentials(initialState);
    setErrors({});
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (isValid()) {
      axios.get(`http://localhost:13063/api/User/Authorize?login=${credentials.login}&password=${credentials.password}`)
      .then(response=>
        {
          if(response.data.isAdmin === false) {
            swal("Access denied!", "You are not an admin", "error");
            resetForm();
          }
          else if(response.data.isAdmin === true){
            dispatch(setAdmin(response.data));
            swal("Access Granted", "Welcome to Admin Panel", "success");
            naviagate("/home");
          }
          resetForm();
          
      })
      .catch(error=>{switch (error.response.status) 
        {
          case 404: swal("Wrong login or password" , "Try again", "error"); resetForm(); break;          
          case 500: swal("Server Error" , "Try again later", "error"); resetForm(); break;          
          default: swal("Unexpected Error" , "Try again later", "error"); resetForm();          
        }})
        .finally(setLoading(false));
    }
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  console.log(admin);

  if(isLoading) return(<Loader/>)
  return (
    <>
      <h3 style={{ paddingTop: '20px' }}>
        Welcome to the <i>Pizza Store Admin Panel 🍕</i> <br /> Identify Yourself Here:
      </h3>

      <form className='authorization_form' action="" autoComplete='off' noValidate onSubmit={handleFormSubmit}>
        <input onChange={handleInputChange} className={'form-control' + applyErrorClass('login')} type="text" placeholder='Login' value={credentials.login} name="login" />
        <input onChange={handleInputChange} className={'form-control' + applyErrorClass('password')} type={passwordType} placeholder='Password' value={credentials.password} name="password" />
        <div className='authorization_form__toggle'>
          <span onClick={togglePassword}>👁</span>
        </div>
        
        <div className='form-group text-center'>
          <button type='submit' className='button button'>Log In</button>
        </div>
      </form>

      <h4 className='deleteCategory__hidden'>Hidden</h4>

    </>
  )
}

export default AuthorizationPage