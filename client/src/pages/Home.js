import React from 'react';
import styled from 'styled-components';
import ItemDatas from '../components/Section/ItemDatas'

const Home = () => {
  return (
    <HomeWrap>
      <div className='container css-selector'>
        <h1>당신의 분실물을 위한 사이트</h1>
        <p>분실물을 습득하셨거나 중요한 물건을 잃어 버리셨나요? 걱정 마세요! 로스트 파운드에서 분실물을 효율적으로 관리 할 수 있습니다.</p>
      </div>
      <ItemDatas />
    </HomeWrap>
  )
}

export default Home

const HomeWrap = styled.div`

  .css-selector{
    color: #fff;
    max-width: 1150px;
    margin: 35px auto 35px auto;
    border-radius: 15px;
    padding: 50px;
    height: 320px;
    display: grid;

    p{
      max-width: 400px;
      line-height: 1.4;
      font-size: 15px;
    }
  }  
`;