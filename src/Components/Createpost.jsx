import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../config';

function Createpost({  getAllPosts }) {
    const [ description , setDescription ] = useState('');
    const [ picture , setPicture ] = useState('');

    const handleCreatePost = async (event) => {
        event.preventDefault();
        let user = sessionStorage.getItem('user');
        let token = sessionStorage.getItem('token');
        user = JSON.parse(user);
        const formData = new FormData ();
            formData.append('picture', picture )
            formData.append('userId' ,user._id);
            formData.append('picturePath',picture.name);
            formData.append('description' , description);
        try {
            
            await axios.post(`${config.API_URL}/create`,formData ,{
             headers : {
                    Authorization  : `Bearer ${token}`
                  }
            })
                .then((posts) =>{
                    setTimeout(()=>{
                        console.log(posts);
                        sessionStorage.setItem('posts',JSON.stringify(posts));
                        setDescription('');
                        setPicture('');
                        getAllPosts();
                        window.alert('Post postsed Successfully')
                    },1200)
                })
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div>
        <h2>Create Post </h2>
        <Form onSubmit={ handleCreatePost }>
            <Form.Group as={Col} >
                <Form.Label className='mt-3'>Description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Description"
                    name='description' 
                    value={ description }
                    onChange={(e) => setDescription(e.target.value) }/>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label className='mt-3'>Image</Form.Label>
                <Form.Control type="file" 
                placeholder="Choose Picture"
                name='picture' 
                required
                onChange={(e) =>  setPicture(e.target.files[0]) }/>
            </Form.Group>
            <Button variant="primary" className='mt-4' type="submit">
                CreatePost
            </Button>
        </Form>

    </div>
  )
}

export default Createpost;