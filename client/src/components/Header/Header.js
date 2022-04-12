import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    axios.get('/api/users/logout')
      .then(res => {
        if(res.data.success){
          window.location.reload();
        }else{
          alert('로그아웃에 실패 했습니다.')
        }
      })
  }

  if(user.userData && !user.userData.isAuth){
    return(
      <MenuWrap>
        <div className='container flex-space'>
          <Link to='/' className='logo'>LostFound</Link>
          <nav>
            <Link to='/login'>로그인</Link>
            <Link to='/sign-up' className='signUp'>회원가입</Link>
          </nav>
        </div>
      </MenuWrap>
    )
  }else{
    return(
      <MenuWrap>
        <div className='container flex-space'>
          <Link to='/' className='logo'>LostFound</Link>
          <nav>
            <Link to='/user/list' className='list-star'>
              <span>관심목록</span>
            </Link>
            <Link to='/post'>글쓰기</Link>
            <Link to='/profile'>프로필</Link>
            <Link to='/' onClick={handleLogout}>로그아웃</Link>
          </nav>
        </div>
      </MenuWrap>
    )
  }
}

export default Header

const MenuWrap = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 4px 0px #eee;
  z-index: 1000;
  margin-bottom: 3px;
  
  .logo{
    padding: 0 20px;
    font-size: 2rem;
    background: linear-gradient(to bottom right, #3494E6, #65C7F7, #0052D4);
    color: transparent;
    -webkit-background-clip: text;
  }
  nav{
    display: flex;
    align-items: center;

    a{
      color: gray;
      font-size: 15px;
      margin: 0 20px;
    }
    a:hover{
      color: #3494E6;
      font-weight: bold;
    }

    .signUp{
      border: 1px solid lightgray;
      padding: 10px 15px;
      margin-left: 10px;
      border-radius: 5px;
    }
    .signUp:hover{
      border: 1px solid #3494E6;
      color: #fff;
      background-color: #3494E6;
    }
  }
`;