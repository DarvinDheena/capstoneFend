import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NavbarHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>{
    // remove the user from the session storage
    sessionStorage.removeItem('user');
    // remove the user from the redux store
    dispatch({
        type: 'UNSET_USER',
    });

    // remove the token from the session storage
    sessionStorage.removeItem('token');

    // redirect to the login page
    navigate('/signin');
  }
  useEffect(()=>{
  } ,[])
  
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark" className='text-bg-dark p-3'>
        <Container>
          <Navbar.Brand className='fs-3' >SocialMedia</Navbar.Brand>
          <Nav className="ms-auto">        
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>  
            <Nav.Link href="/signin" >Sign In</Nav.Link> 
            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link onClick={ handleLogout }>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
  )
}

export default NavbarHome;