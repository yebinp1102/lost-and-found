import React from 'react';
import styled from 'styled-components';

const Home = ({posts}) => {
  return (
    <HomeWrap>
      {posts.length ? (
        <div className='container'>{posts[0].title}</div>
      ) : (
        <h1>분실물이 존재하지 않습니다.</h1>
      )}
    </HomeWrap>
  )
}

export default Home

const HomeWrap = styled.div`
  min-height: calc(100vh - 280px);
  overflow: scroll;
  background-color: #eee;
  
  h1{
    margin-top: 180px;
    text-align: center;
  }
`;