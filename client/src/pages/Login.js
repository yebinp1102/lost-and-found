import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_action';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(()=>{
    emailRef.current.focus();
  },[])


  useEffect(()=>{
    setErrMsg('');
  },[email, password])

  const handleLogin = () => {
    let body = {
      email: email,
      password: password
    }
    dispatch(loginUser(body))
      .then(res => {
        console.log(res);
        if(res.payload.loginSuccess) {
          navigate('/')
        }else{
          alert('로그인 에러가 발생 했습니다.')
        }
    })
  }

  return (
    <LoginWrap className='wrap'>
      <section className='container whiteBox'>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <h1>로그인</h1><hr/>
        <form onSubmit={handleLogin}>
          <label htmlFor='email'>이메일 :</label>
          <input
            ref={emailRef}
            required
            id='email'
            type='email'
            autoComplete='off'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor='password'>비밀번호 :</label>
          <input
            required
            autoComplete='off'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id='password'
          />
          <button disabled={!password || !email ? true : false} className='btn'>로그인</button>
        </form>
        <article>
          <p className='toSignUp'>회원이 아닌가요?</p>
          <Link to='/login' className='bold'>회원가입 페이지로</Link>
          </article>
      </section>
    </LoginWrap>
  )
}

export default Login

const LoginWrap = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  .container{
    max-width: 600px;

    form{
      display: flex;
      flex-direction: column;
      padding: 40px 0;
    }

    h1{
      padding-bottom: 20px;
    }
    .toSignUp{
      margin-bottom: 10px;
    }
  }
`;