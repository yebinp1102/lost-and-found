import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const {userList, setUserList, setIsLoggedIn} = useContext(UserContext);
  // setUsername('ash');
  // console.log(username);
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    emailRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[email, password])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const userDB = await axios.get('/users')
      setUserList(userDB.data)
      console.log(userList);
      const filterUser = userList.filter((user)=>
        user.email === email && user.password === password
      );
      if(filterUser){
        // setUsername(filterUser.username);
        // setUserEmail(filterUser.email);
      }
      setIsLoggedIn(true);
      navigate('/');
    }catch(err){
      console.log(err.message);
    }

  }

  return (
    <LoginWrap className='wrap'>
      <section className='container whiteBox'>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <h1>로그인</h1><hr/>
        <form onSubmit={handleSubmit}>
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