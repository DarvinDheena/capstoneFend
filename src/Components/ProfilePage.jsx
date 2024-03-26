import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Createpost from './Createpost';
import UserImage from './UserImage';

function ProfilePage({ getUser }) {

    // const getUserPosts = async () =>{
    //     let user = sessionStorage.getItem('user');
    //     const token = sessionStorage.getItem('token');
    //     user = JSON.parse(user);
    //     const userId = user._id;
    //     await axios.get(`${config.API_URL}/posts/${userId}/`,{
    //         headers : {
    //           Authorization  : `Bearer ${token}`
    //         }
    //       })
    //       .then((posts)=>{
    //         dispatch({
    //             type: 'SET_USER_POSTS',
    //             payload: posts
    //         });
    //       })
    // }

    useEffect(()=>{
        getUser();
    },[]);

    // const user = useSelector(state => state.user);
    // const posts = useSelector(state => state.posts);
   
    let  user = sessionStorage.getItem('user');
    user = JSON.parse(user);
   
    const picturePath = user.picturePath ;
    

    return (
    <div className='container'>
        <h2>Your Profile</h2>
        <div className="bg-white p-4 mt-4 text-center">
          <div className="row">
            <div className="col-3 border-end">
              <UserImage picturePath={ picturePath } size = {'200px'}/>
              <div><b>{ user.firstName + " " + user.lastName}</b></div>
            </div>
            <div className="col-8 mx-auto text-start">
              <div className="mb-3">
                <label className="form-label">{ "Email address " + " : " } <b>{ user.email }</b></label>
              </div>
              <div className="mb-3">
              <label className="form-label">{ "Location " + " : " } <b>{ user.location }</b></label>
              </div>
              <div>
              <label className="form-label">{ "Occupation " + " : " } <b>{ user.occupation }</b></label>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfilePage;