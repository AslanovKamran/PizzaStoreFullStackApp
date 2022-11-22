import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../components/Loader';
import { setUser } from '../redux/slices/user/slice';

const LoginPage: React.FC = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();






  function ResetInputs(): void {
    setLogin('');
    setPassword('');
  }

  async function Authorize() {
    setLoading(true);
    try {
      let response = await axios.get(`http://localhost:13063/api/User/Authorize?login=${login}&password=${password}`);
      swal("Welcome", "You can make an order now", "success");
      dispatch(setUser(response.data));
      navigate('/cart');

    } catch (error) {
      swal("Wrong userName or password!", "", "error");
      ResetInputs();

    }
    finally {
      setLoading(false);
    }
  }

  async function Press(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (login.length > 0 && password.length > 0) {
      console.log(login);
      console.log(password);
      await Authorize();
    }
    else { swal("Login or passwrod can not be empty", "", "error"); ResetInputs(); }
  }


  if (loading) return (<Loader></Loader>)
  else {

    return (


      <>
        <div className='login-container'>

          <h3 className='login-container__title'>Login Page</h3>
          <div className='login-container__inputs'>
            <form autoComplete='off'>

              <input type="text" name="login" placeholder='Login' onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setLogin(ev.target.value)} value={login} />
              <input type="password" name="password" placeholder='Password' onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setPassword(ev.target.value)} value={password} />
              <button className="button btn-pay" onClick={Press}>Log in</button>
            </form>
          </div>

          <div className='login-container__register'>
            <Link to="/register">
              <a>I don't have an account yet.</a>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default LoginPage;