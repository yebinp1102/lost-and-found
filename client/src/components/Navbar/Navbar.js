import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({search, setSearch, isLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('/api/users/logout')
      .then(res => {
        if(res.data.success){
          navigate('/login')
        }else{
          alert('로그아웃에 실패 했습니다.')
        }
      })
  }

  return (
    <Nav>
      <div className='container'>
        <form>
          <label htmlFor='searchItem' />
          <input
            id='searchItem'
            type='text'
            placeholder='찾는 물건을 입력하세요...'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
        <div className='navWrap'>
          <Link to='/'>홈으로</Link>
          <Link to='/post'>글 올리기</Link>
          {isLoggedIn ? (
            <>
            <Link to='/profile'>프로필</Link>
            {/* <Link to='/' onClick={handleLogout}>로그아웃</Link> */}
            </>            
          ) : (
            <>
              <Link to='/login'>로그인</Link>
              <Link to='/sign-up'>회원가입</Link>
              <Link to='/' onClick={handleLogout}>로그아웃</Link>
            </>            
          )}
        </div>
      </div>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  background-color: #051367;
  color: #fff;
  padding: 20px;
  
  .container{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a{
      color: #fff;
    }

    form{
      input{
        width: 100%;
        padding: 15px;
        outline: none;
        font-size: 18px;
        border-radius: 5px;
      }
    }

    .navWrap{
      display: flex;
      align-items: center;

      a{
        font-size: 18px;
        padding: 18px 15px;
        box-sizing: content-box;
      }
      a:hover{
        font-weight: bold;
        border-bottom: 5px solid #fff;
      }
    }
  }  
`;