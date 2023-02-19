import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){

  function AuthenticationCheck(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let user = useSelector(state => state.user);

    useEffect(()=>{
      dispatch(auth()).then(res=>{
        if(!res.payload.isAuth && option){
            navigate('/')
        }else{
          if(adminRoute && !res.payload.isAdmin){
            navigate('/')
          }else{
            navigate('/')
          }
        }
      })
    },[])

    return(
      <SpecificComponent {...props} user={user} />
    )
  }

  return AuthenticationCheck();
}