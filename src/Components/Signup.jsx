import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

  const [ registerFormData , setRegisterFormData ] = useState({
    firstName : '',
    lastName : '',
    location : '',
    occupation : '',
    picturePath : '' ,
    email : '',
    password : ''
  })
  const [ picture,setPicture] = useState('');
  const handleBtnClick = async (event) => {
    event.preventDefault();
    const formData = new FormData();
        formData.append('picture', picture )
        formData.append('firstName' , registerFormData.firstName );
        formData.append('lastName',registerFormData.lastName);
        formData.append('email',registerFormData.email);
        formData.append('location' , registerFormData.location);
        formData.append('occupation' , registerFormData.occupation);
        formData.append('password' , registerFormData.password);
        formData.append('picturePath',picture.name);


      await axios.post('http://localhost:6001/auth/register',formData)
            .then((response) => { 
                        window.alert('User Registered successfully ');
                        navigate('/signin');

            })
            .catch((error) => {return console.log(error) } )
      }
  return (
    <div className='form'>
      <Form onSubmit={ handleBtnClick } className='col-5 m-auto bg-white p-4 shadow rounded-5 mb-5 text-bg-light p-3' >
            <Form.Group as={Col} className="mb-2">
            <Form.Label>FirstName</Form.Label>
            <Form.Control 
                className='mt-2'
                type="text" 
                placeholder="Enter firstName"
                name='firstName' 
                value={ registerFormData.firstName }
                required
                onChange={(e) => setRegisterFormData({
                    ...registerFormData , 
                    firstName : e.target.value
                })}/>
            </Form.Group>

            <Form.Group as={Col} className="mb-2" >
            <Form.Label>Lastname</Form.Label>
            <Form.Control 
                type="text"   
                placeholder="Enter lasstname" 
                name='lastName'
                required
                value={ registerFormData.lastName }
                onChange={ e => setRegisterFormData({
                    ...registerFormData ,
                    lastName : e.target.value
                })}
                />
            </Form.Group>

            <Form.Group as={Col} className="mb-2" >
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name='email'
                value={ registerFormData.email }
                required
                onChange={ e => setRegisterFormData({
                    ...registerFormData ,
                    email : e.target.value
                })}/>
            </Form.Group>

            <Form.Group as={Col}  className="mb-2">
            <Form.Label>Profile</Form.Label>
            <Form.Control type="file" placeholder="Choose Picture"
            name='picture' 
            required
            onChange={(e) =>  setPicture(e.target.files[0]) }/>
            </Form.Group>

            <Form.Group as={Col} className="mb-2">
            <Form.Label>location</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter location"
                name='location'
                required
                value={ registerFormData.location }
                onChange={ e => setRegisterFormData({
                    ...registerFormData ,
                    location : e.target.value
                })}/> 
            </Form.Group>
            
            <Form.Group as={Col} className="mb-2">
            <Form.Label>Occupation</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter occupation" 
                name='occupation'
                required
                value={ registerFormData.occupation }
                onChange={ e => setRegisterFormData({
                    ...registerFormData ,
                    occupation : e.target.value
                })}/>
            </Form.Group>

            <Form.Group as={Col} className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                name='password'
                required
                value={ registerFormData.password }
                onChange={ e => setRegisterFormData({
                    ...registerFormData ,
                    password : e.target.value
                })}/>
            </Form.Group>

            <Button variant="success"  type="submit" className='px-3 w-100'>
                Register Here
            </Button>
            <p className='mt-3'>Already  have an account ? <Link to='/signin'>Login here </Link></p>
        </Form>
        
    </div>
  )
}

export default Signup;