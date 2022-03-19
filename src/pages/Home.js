import React from 'react';
import styled from 'styled-components';
import Feed from '../components/Post/Feed';

const Home = ({posts}) => {

  return (
    <HomeWrap className='wrap'>
      <div className='container'>
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <h1>게시글이 존재하지 않습니다.</h1>
        )}
      </div>
    </HomeWrap>
  )
}

export default Home

const HomeWrap = styled.div`
  
  h1{
    margin-top: 180px;
    text-align: center;
  }
`;