import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Dashboard from './Components/Dashboard';
import ProfilePage from './Components/ProfilePage';
import NavbarHome from './Components/NavbarHome';
import axios from 'axios';
import config from './config';


function App() {

  const [ isLogin , setIsLogin ] = useState(false);

  const getUser = async () =>{
    try {
      let  user = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');
      user = JSON.parse(user) 
      if (user) {
        await axios.get(`${config.API_URL}/users/${user._id}`,{
          headers : {
            Authorization : `Bearer ${token}`
          } }) 
        .then((user)=> {
          return user.data;
        }) } 
     } 
    catch (error) {
      console.log(error);
    }
  }

  const getAllPosts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.get(`${config.API_URL}/posts`,{
        headers : {
          Authorization  : `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log('posts get')
          sessionStorage.setItem('posts',JSON.stringify(response.data));
        })
    }
    catch(error) {
      console.log(error);
    }

  }
    
  return (
    <div>
      <Router>
      <NavbarHome isLogin = { isLogin } setIsLogin = { setIsLogin }/>
        <Routes>
          <Route path='/' element ={ <Home />}></Route>
          <Route path='/signup' element ={ <Signup />}></Route>
          <Route path='/signin' element ={ <Signin  setIsLogin = { setIsLogin }/>}></Route>
          <Route path='/dashboard' element ={ <Dashboard getUser = { getUser } getAllPosts = { getAllPosts } isLogin = { isLogin }/>}></Route>
          <Route path='/profile' element ={ <ProfilePage getUser={ getUser }/>}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;