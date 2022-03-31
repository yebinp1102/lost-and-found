import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const EditPost = ({posts, handleEdit, editTitle, setEditTitle, editDetail, setEditDetail}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditDetail(post.detail);
      console.log(post);
    }
  },[post, setEditDetail, setEditTitle]);

  return (
    <EditWrap className='wrap'>
      <div className='container'>
        {editTitle && 
          <>
            <h2>내용 수정하기</h2>
            <form className='newPost' onSubmit={(e)=>e.preventDefault()}>
              <label htmlFor='postTitle'>제목:</label>
              <input
                type='text'
                id='postTitle'
                required
                value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}
              />
              <label htmlFor='postDetail'>내용:</label>
              <textarea
                id='postDetail'
                required
                value={editDetail}
                onChange={(e)=>setEditDetail(e.target.value)}
              />
              <button type='submit' onClick={()=>handleEdit(post.id)} className='btn'>수정하기</button>
            </form>
          </>
        }
        {!editTitle &&
          <>
            <p>존재하지 않는 글 입니다.</p>
            <Link to="/">메인 페이지로 돌아가기</Link>
          </>
        }
      </div>
    </EditWrap>
  )
}

export default EditPost

const EditWrap = styled.main`
  .container{
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
    padding: 30px;
    border: 1px solid lightgray;
  
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

    a{
      font-size: 30px;
      font-weight: bold;
      margin: 20px 0;
      display: inline-block;
    }
    a:hover{
      padding-bottom: 10px;
      border-bottom: 2px solid #000;
    }
  }
`;