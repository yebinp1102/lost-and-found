import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){

  function AuthenticationCheck(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(auth()).then(res=>{
        if(!res.payload.isAuth){
          if(option){
            navigate('/login')
          }
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
      <SpecificComponent {...props} />
    )
  }

  return AuthenticationCheck();
}