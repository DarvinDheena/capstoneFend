import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Createpost from './Createpost';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserImage from './UserImage';
import PostImage from './UserImage';
import Button from 'react-bootstrap/Button';




function Dashboard({ getUser }) {

  const getAllPosts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.get(`http://localhost:6001/posts`,{
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

  function myfun(){
    document.getElementById("likebtn").style.fill = "red";
  }

  function mydes(){  
    
    var des = document.getElementById("mydes");
    var x = des.classList.contains("h-des");

    if (x){
      document.getElementById("mydes").classList.remove("h-des");
      document.getElementById("veiw").innerHTML = "View less";
    }  else{
      document.getElementById("mydes").classList.add("h-des");
      document.getElementById("veiw").innerHTML = "View more";
    }
  }

  const likePost = async () => {
    try {
      let user = sessionStorage.getItem('user');
      user = JSON.parse(user);
      const id = user._id;
      await axios.patch(`http://localhost:6001/posts/${id}/like`,)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect ( () => {
      getUser();
      getAllPosts();
  } ,[]);

  let  user = sessionStorage.getItem('user');
  user = JSON.parse(user);
  const picturePath = user.picturePath ;
  let  posts = sessionStorage.getItem('posts');
  posts = JSON.parse(posts);
  console.log(posts);


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

          {/* post */}
          <div className="p-3 py-4 bg-white">     
            {/* post header  */}
            <div className="d-flex align-items-center border-bottom border-secondary pb-2">
              <UserImage size = {'48px'} picturePath={ picturePath }/>
              <h5 className='ms-3'>Darvin</h5>
            </div>
            {/* post img */}
            <div className='mt-4 border-bottom border-secondary pb-3  text-center'>
              <img src="src\assets\IMG-20230320-WA0001.jpg" className='img-fluid' alt="" />
            </div>
            {/* action btn */}
            <ul className='list-unstyled d-flex align-items-center mt-3'>
              <li  onClick={myfun}>                  
                <svg id='likebtn' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-heart-fill ms-2" viewBox="0 0 16 16">
                  <path  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
              </li>
              <li className='ms-4'>
                <svg data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                </svg>
              </li>              
            </ul>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item border-0">                  
                  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Add Comment</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='VIP'></textarea>
                      <button className='btn btn-primary mt-3'>send</button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* description */}
            <div>
              <p id='mydes' className='h-des mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className='text-end'>
                <a  onClick={mydes} id="veiw" className='text-decoration-none link-secondary'>View more</a>
              </div>
            </div>
          </div>

          {/* post */}
          <div className="p-3 py-4 bg-white">     
            {/* post header  */}
            <div className="d-flex align-items-center border-bottom border-secondary pb-2">
              <UserImage size = {'48px'} picturePath={ picturePath }/>
              <h5 className='ms-3'>Dharvin</h5>
            </div>
            {/* post img */}
            <div className='mt-4 border-bottom border-secondary pb-3  text-center'>
              <img src="src\assets\pic.jpg.jpg" className='img-fluid' alt="" />
            </div>
            {/* action btn */}
            <ul className='list-unstyled d-flex align-items-center mt-3'>
              <li  onClick={myfun}>                  
                <svg id='likebtn' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-heart-fill ms-2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
              </li>
              <li className='ms-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                </svg>
              </li>
            </ul>
            {/* description */}
            <div>
              <p id='mydes' className='h-des mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className='text-end'>
                <a  onClick={mydes} id="veiw" className='text-decoration-none link-secondary'>View more</a>
              </div>
            </div>
          </div>

        </div>
        <div className="col-3 sticky-top">
            <div className="bg-white p-3">
              <Createpost />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;