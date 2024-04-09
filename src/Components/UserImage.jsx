import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import config from '../config';

const  UserImage = ({ picturePath , size }) => {
  return (
    <div> 
          <Image src= {`${config.API_URL}/assets/${picturePath}`} roundedCircle
          width={size}
          height={size}
          alt='User Profile' />
    </div>
  )
}


export default ( UserImage );