import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../components/Loader';
import { setUser } from '../redux/slices/user/slice';




const RegistrationPage: React.FC = () => {


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
  
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function ResetInputs(){
        setLogin('');
        setPassword('');
        setRepeatPassword('');
    }

    function CreateAcc(event: { preventDefault: () => void; }){
        event.preventDefault();
        setLoading(true);

      if(login.length>0 && password.length>0){
        if(password === repeatPassword){
        

            const formData = new FormData();
            formData.append('login', login);
            formData.append('password', password);

            axios.post('http://localhost:13063/api/User', (formData))
            .then(async res=>{
                console.log(res); ResetInputs(); swal("Registered", "Now you can pay the bill", 'success');
                let response =  axios.get(`http://localhost:13063/api/User/Authorize?login=${login}&password=${password}`);
                dispatch(setUser((await response).data));
                navigate('/cart');
   
            })
            .catch(function (error) {
                if(error.response){
                    switch(error.response.status){
                        case 400: swal("Validation error", "Couldn't perform registration", "error"); ResetInputs(); break;
                        case 500:{swal("This login is occupied", "Try another one", "warning"); ResetInputs();}break;
                        default: swal("Something went wrong", "Unexpected error", "error"); ResetInputs(); break;
                    }
                }
            })
           
            

        }
        else{
            swal("Passwords do not match","Try again","warning")
            ResetInputs();
        }
    }
    
    else{
        swal("Type a valid login and password","","error");
        ResetInputs();
      }

      setLoading(false);
    }

    if(loading) return(<Loader></Loader>)
    return (
        <>
            <div className='login-container'>
                <h3 className='login-container__title'>Registration Page</h3>
                <div className='login-container__inputs'>
                    <form action="" autoComplete='off' noValidate onSubmit={CreateAcc}>
                    <input type="text" name="login" placeholder='Login' value={login} onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setLogin(ev.target.value)} />
                    <input type="password" name="password" placeholder='Password' value={password} onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setPassword(ev.target.value)}  />
                    <input type="password" name="repeatPassword" placeholder='Repeat Password' value={repeatPassword}  onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setRepeatPassword(ev.target.value)} />
                    <button className="button btn-pay" type='submit'>Create an account</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegistrationPage;