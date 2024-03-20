import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const  UserImage = ({ picturePath , size }) => {
  return (
    <div> 
          <Image src= {`http://localhost:6001/assets/${picturePath}`} roundedCircle
          width={size}
          height={size}
          alt='User Profile' />
    </div>
  )
}

const PostImage = ({ picturePath , size}) => {
    return (
        // <Container> 
        // <Col xs={6} md={4}>
         <Image src= {`http://localhost:6001/assets/${picturePath}`} roundedCircle
         width={size}
         height={size}
         alt='User Profile' />
      //  </Col>
  //  </Container>
    )
   
}

export default ( UserImage, PostImage );