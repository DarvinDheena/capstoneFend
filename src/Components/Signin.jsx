import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Signin() {
  const [ email , setEmail ] = useState('');
  const [password , setPassword ] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogin = async (event) => {
    event.preventDefault();
    // lets sign in user
    try {
      await axios.post(`http://localhost:6001/auth/login` , {
        email : email ,
        password : password 
      })
        .then((res) => {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('user', JSON.stringify( res.data.user ));
              // Store the User in Redux Store
              dispatch({
                type: 'SET_USER',
                payload: res.data 
              })
              window.alert('logged in successfully')
              // redirect to dashboard page
              navigate('/');
        })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
        <div className='row align-items-center justify-content-center h-100 mt-5 pt-5'>

      <Form onSubmit={ handleLogin } className='col-4 bg-white p-4 shadow rounded-5'>
             <Form.Group className="mb-2" >  
                <Form.Label>Email / UserName</Form.Label>
                <Form.Control 
                className='mt-2'
                    type="email" 
                    placeholder='Email'
                    required
                    value={ email }
                    onChange={(e) =>  setEmail(e.target.value)}
                />
            </Form.Group>
            < Form.Group className="mb-3" >
                <Form.Label className='mb-0'>Password</Form.Label>
                <Form.Control 
                    className='mt-2'
                     type="password" 
                     placeholder='password'
                     required
                     value={ password }
                     onChange={(e) =>  setPassword(e.target.value)}
                />
            </Form.Group>
            <div className=''>
                <Button variant="success" type='submit' className='px-3 w-100'>Login</Button>
            </div>
            <p className='mt-3'>Don't have an account ? <Link to='/signup'>Register here </Link></p>
        </Form>   
      </div>
    </div>
  )
}

export default Signin;