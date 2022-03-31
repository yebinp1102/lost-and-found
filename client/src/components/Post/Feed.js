import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';


const Feed = ({posts}) => {
  return (
    <Posts className='grid'>
      {posts.map((post, idx)=>{
        return(
          <div key={idx} className='card'>
            <Link to={`/post/${post.id}`}>
              <h2>{(post.title).slice(0,30)}</h2>
              <p className='postTime'>{post.time}</p>
            </Link>
            <p className='postBody'>{
              (post.detail).length <= 25 ? post.detail : `${(post.detail).slice(0,100)}...`
              }
            </p>
          </div>
        )
      })}
    </Posts>
  )
}

export default Feed

const Posts = styled.div`
  gap: 30px; 
  .card{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    height: 250px;
    border-radius: 10px;
    border: 1px solid lightgray;
    overflow-y: hidden;
    a{
      p{
        margin: 15px 0;
        color: gray;
      }
      border-bottom: 1px solid gray;
    }

    .postBody{
      margin-top: 10px;
    }
  }
`;  