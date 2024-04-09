import React, { useEffect } from 'react';
import config from '../config';

function Home() {
  
  useEffect(()=>{
  },[])
  return (
    <div className='container'>
      <div className="row align-items-center">
        <div className="col">
          <h2 className='display-3 fw-bold lh-sm'>Welcome to the Social Media Web</h2>
          <p className='py-4 fs-5 col-10'>if you don't have an account ! please <a href='/signup' className='btn btn-primary'>SignUp</a> </p>   
          <p className='py-4 fs-5 col-10'>Already  have an account ! please <a href='/signin' className='btn btn-primary'>Signin</a> </p>   
        </div>
        <div className="col">
          <img src={`${config.API_URL}/assets/banner.webp`} className='img-fluid' alt="banner" />
        </div>
      </div>
    </div>
  )
}

export default Home;