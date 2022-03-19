import React from 'react'
import styled from 'styled-components';

const Post = ({handleSubmit, postTitle, setPostTitle, postDetail, setPostDetail}) => {
  return (
    <PostWrap className='wrap'>
      <div className='container'>
        <h2>새로운 글 올리기</h2>
        <form className='newPost' onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>제목:</label>
          <input
            type='text'
            id='postTitle'
            required
            value={postTitle}
            onChange={(e)=>setPostTitle(e.target.value)}
          />
          <label htmlFor='postDetail'>내용:</label>
          <textarea
            id='postDetail'
            required
            value={postDetail}
            onChange={(e)=>setPostDetail(e.target.value)}
          />
          <button className='btn'>글 올리기</button>
        </form>
      </div>
    </PostWrap>
  )
}

export default Post

const PostWrap = styled.div`

  .container{
    background-color: #fff;
    padding: 30px;
    height: 100%;

    h2{
      border-bottom: 1px solid gray;
      padding-bottom: 20px;
      text-align: center;
    }

    .newPost{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 25px;
      font-size: 25px;

      input[type="text"]{
        font-size: 20px;
        padding: 20px;
      }

      textarea{
        font-size: 20px;
        padding: 20px;
        height: 400px;
      }
    }

    .btn{
      padding: 20px;
      font-size: 20px;
      margin-bottom: 30px;
      border: none;
      background-color: #051367;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;