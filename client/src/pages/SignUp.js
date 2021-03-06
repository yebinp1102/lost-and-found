import React, {useRef, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {FcCheckmark, FcCancel, FcInfo} from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { registerUser } from '../_actions/user_action';

const USER_REGEX = /^[A-z]+[a-z0-9]{5,19}$/
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

const SignUp = () => {
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatchPassword, setValidMatchPassword] = useState(false);
   
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');

  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setValidUsername(USER_REGEX.test(username));
  },[username])

  useEffect(()=>{
    setValidEmail(EMAIL_REGEX.test(email))
  },[email])

  useEffect(()=>{
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  },[password, matchPassword])

  useEffect(()=>{
    setErrMsg('');
  },[username, password, matchPassword])

  const handleSignUp = (e) => {
    e.preventDefault();
    let body = {
      email,
      password,
      name: username
    }
    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success){
          navigate('/login')
        }else{
          alert('??????????????? ?????? ????????????.')
        }
      })
 
  }

  return (
    <SignUpWrap className="wrap">
      <div className='container whiteBox'>
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscrenn"}>{errMsg}</p>
          <h1 className='title'>????????????</h1><hr/>
          <form onSubmit={handleSignUp}>

            {/* ????????? */}
            <label htmlFor='user'>
              ????????? ?????? :
              <FcCheckmark className={validUsername ? "onscreen" : "offscreen"} />
              <FcCancel className={validUsername || !username ? "offscreen" : "onscreen"} />
            </label>
            <input 
              id='user'
              required
              type='text'
              autoComplete='off'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              ref={userRef}
              onFocus={()=>setUsernameFocus(true)}
              onBlur={()=>setUsernameFocus(false)}
            />
            <p className={usernameFocus && username && !validUsername ? "instruction" : "offscreen"}>
              <FcInfo />
              ????????? ????????? ????????? ??????????????? ???????????? ??????, ???????????? ?????? ????????? ???????????????. ????????? 6~20????????? ?????????.
            </p>

            {/* ????????? */}
            <label htmlFor='e-mail'>
              ????????? :
              <FcCheckmark className={validEmail ? "onscreen" : "offscreen"} />
              <FcCancel className={validEmail || !email ? "offscreen" : "onscreen"} />
            </label>
            <input 
              id='e-mail'
              required
              type='email'
              autoComplete='off'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            {/* ???????????? */}
            <label htmlFor='password'>
              ???????????? :
              <FcCheckmark className={validPassword ? "onscreen" : "offscreen"} />
              <FcCancel className={validPassword || !password ? "offscreen" : "onscreen"} />
            </label>
            <input
              type='password'
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete='off'
              id='password'
              onFocus={()=>setPasswordFocus(true)}
              onBlur={()=>setPasswordFocus(false)}
            />
            <p className={passwordFocus ? "instruction" : "offscreen"}>
              <FcInfo />
              ??????????????? ????????? ?????? ????????? ?????????, ????????????, ????????? ???????????? 8-24????????? ?????????. 
            </p>

            <label htmlFor='matchPwd'>
              ???????????? ?????? : 
              <FcCheckmark className={validMatchPassword && matchPassword ? "onscreen" : "offscreen"} />
              <FcCancel className={validMatchPassword || !matchPassword ? "offscreen" : "onscreen"} />
            </label>
            <input
              type='password'
              required
              id='matchPwd'
              value={matchPassword}
              onChange={(e)=>setMatchPassword(e.target.value)}
              onFocus={()=>setMatchFocus(true)}
              onBlur={()=>setMatchFocus(false)}
            />
            <p className={matchFocus && !validMatchPassword ? "instruction" : "offscreen"}>
              <FcInfo />
              ????????? ????????? ??????????????? ???????????? ?????????.
            </p>
            <button className='btn' disabled={!validUsername || !validPassword || !validMatchPassword ? true : false}>????????????</button>
          </form>

          {/* ?????? ??????????????? ????????? ???????????? ?????? */}
          <article>
            <p className='toLogin'>?????? ???????????????????</p>
            <Link to='/login' className='bold'>????????? ????????????</Link>
          </article>
        </section>
      </div>
    </SignUpWrap>
  )
}

export default SignUp

const SignUpWrap = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  
  .container{
    max-width: 700px;
    
    section{
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px;

      form{
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px 0;
      }

      .toLogin{
        margin: 10px 0;
      }

    }


  }
`;