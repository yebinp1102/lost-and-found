import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Navbar/Search';
import Feed from '../components/Post/Feed';

const Home = () => {
  return (
    <HomeWrap>
      <div className='css-selector'>
        <div className='container'>
          <h1>당신의 분실물을 위한 사이트</h1>
          <p>분실물을 습득하셨거나 중요한 물건을 잃어 버리셨나요? 걱정 마세요! 로스트 파운드에서 분실물을 효율적으로 관리 할 수 있습니다.</p>
          <SearchBar />
        </div>
      </div>
    </HomeWrap>
  )
}

export default Home

const HomeWrap = styled.div`
  color: #fff;

  .css-selector{
    padding: 80px 70px;
    height: 400px;

    .container{
      display: grid;
      gap: 30px;

      p{
        max-width: 400px;
        line-height: 1.4;
        font-size: 15px;
      }
    }
  }  
`;