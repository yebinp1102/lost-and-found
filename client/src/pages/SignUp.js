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
          alert('회원가입에 실패 했습니다.')
        }
      })
 
  }

  return (
    <SignUpWrap className="wrap">
      <div className='container whiteBox'>
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscrenn"}>{errMsg}</p>
          <h1 className='title' style={{textAlign: 'center'}}>회원가입</h1><hr/>
          <form onSubmit={handleSignUp}>

            {/* 유저명 */}
            <label htmlFor='user'>
              사용자 이름 :
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
              사용자 이름은 반드시 알파벳으로 시작해야 하며, 알파벳과 숫자 조합을 허용합니다. 조합은 6~20자여야 합니다.
            </p>

            {/* 이메일 */}
            <label htmlFor='e-mail'>
              이메일 :
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

            {/* 비밀번호 */}
            <label htmlFor='password'>
              비밀번호 :
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
              비밀번호는 반드시 하나 이상의 알파벳, 특수문자, 숫자를 포함하는 8-24자여야 합니다. 
            </p>

            <label htmlFor='matchPwd'>
              비밀번호 확인 : 
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
              반드시 작성한 비밀번호와 일치해야 합니다.
            </p>
            <button className='btn' disabled={!validUsername || !validPassword || !validMatchPassword ? true : false}>회원가입</button>
          </form>

          {/* 이미 회원이라면 로그인 페이지로 유도 */}
          <article>
            <p className='toLogin'>이미 회원이신가요?</p>
            <Link to='/login' className='bold'>로그인 페이지로</Link>
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
  width: 100vw;
  height: calc(100vh - 70px);
  font-size: 14px;
  
  .container{
    max-width: 500px;
    
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

    input{
      margin: .75rem 0;
      height: 35px;
      padding: 10px;
      border: 1px solid darkgray;
      border-radius: 5px;
    }

  }
`;