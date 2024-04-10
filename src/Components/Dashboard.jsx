import React, { useEffect, useState } from 'react';
import Createpost from './Createpost';
import axios from 'axios';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const  Dashboard =  ({ getUser })  => {
  const [comment , setComment ] = useState('');
  const navigate = useNavigate();

  const getAllPosts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.get(`${config.API_URL}/posts`,{
        headers : {
          Authorization  : `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log('posts get',response);
          sessionStorage.setItem('posts',JSON.stringify(response.data));
        })
    }
    catch(error) {
      console.log(error);
    }

  }
  const  handleLike = async (id) => {    

   const userId = user._id ;
   const token = sessionStorage.getItem('token');

   await axios.patch(`http://localhost:6001/posts/${id}/like`,{userId : userId } , {
    headers : {
           Authorization  : `Bearer ${token}`
         }
   } )
   .then((response) => {
    if (response.data.likes) {
      document.getElementById(id).style.fill = "red";
    }
    else {
      document.getElementById(id).style.fill = "black";
    } 

   })
   navigate('/dashboard');
  }
  const handleComment = async(id) => {
    const token = sessionStorage.getItem('token');
    await axios.patch(`http://localhost:6001/posts/${id}/comment`,{ newComment : comment } , {
      headers : {
            Authorization  : `Bearer ${token}`
          }
    } )
    .then((response) => {
        const comments = response.data.comments;
      console.log(comments)
    })
    navigate('/dashboard');
  }

  getAllPosts();

  let  user = sessionStorage.getItem('user');
  user = JSON.parse(user);
  const picturePath = user.picturePath ;
  let posts = sessionStorage.getItem('posts');
  posts = JSON.parse(posts);  


  return (
    <div className='container'>
      <div className='row h-100'>
        <div className="col-3 text-center">
          <div className="p-3 bg-white">
            <UserImage picturePath={ picturePath } size = {'200px'}/>
            <h3 className='my-3'>{ user.firstName + ' ' + user.lastName }</h3>
            <h5>I am from { user.location }</h5>
            <h5>I am an { user.occupation }</h5>
            {/* <a href='/profile' className='btn btn-primary px-4 mt-4'>Edit</a> */}
          </div>
        </div>
        <div className="col-6 h-post">
          <div className="p-3 py-4 bg-white"> 
          {
            setTimeout(()=>{
              {
                posts.map(post=>{
                return(  
                  <>
                    <div className="d-flex align-items-center border-bottom border-secondary pb-2">
                      <UserImage size = {'48px'} picturePath={ post.userPicturePath }/>
                      <h5 key={ post._id } className='ms-3'>{post.firstName + ' ' + post.lastName }</h5>
                    </div> 
                    <div className='mt-4 border-bottom border-secondary pb-3  text-center'>
                    <div>
                      <p id='mydes' className='h-des mb-0 text-start' >{ post.description }</p>
                    </div>
                      <img src={`${config.API_URL}/assets/${post.picturePath}`} className='img-fluid' alt="" key={posts._id}/>
                    </div>
                    <ul className='list-unstyled d-flex align-items-center mt-3'>
                    <li  onClick={()=>handleLike(post._id)} key={post._id + "like"}>                  
                      <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-heart-fill ms-2" viewBox="0 0 16 16" id={post._id}>
                        <path  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                      </svg>
                    </li>
                    <li className='ms-4' key={post._id + "comment"}>
                      <svg data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16" >
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                      </svg>
                    </li>              
                  </ul>
                  <div className="accordion" id="accordionExample">
                  <div className="accordion-item border-0">                  
                    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      <div className="mb-3">
                        <label  className="form-label">Add Comment</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='VIP' value={comment }
                        onChange={ (e) =>setComment(e.target.value)  }></textarea>
                        <button className='btn btn-primary mt-3' onClick={() => handleComment(post._id)}>send</button>
                        <ul >
                          {
                            posts.map(post=>{
                              const comments = post.comments ;
                              return (
                                <>
                                    { comments.map((comment ,index)=> {
                                    return(
                                      <>
                                        <li key={index}> { comment }</li>
                                      </>)
                                  })
                                }
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              
                  </>
                    )
                  })
              }
            },2000)
          }    
             
          </div>
        </div>
        {/* CREATE POST  */}
        <div className="col-3 sticky-top">
            <div className="bg-white p-3">
              <Createpost getAllPosts={ getAllPosts }/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;