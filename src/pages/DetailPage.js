import React from 'react'
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom'

const DetailPage = ({posts, handleDelete}) => {
  const {id} = useParams();
  const post = posts.find(post=>(post.id).toString() === id);
  return (
    <DetailWrap className='wrap'>
      <div className='container'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postTime'>{post.time}</p>
            <p className='postDetail'>{post.detail}</p>
            <Link to={`/edit/${post.id}`}><button>수정하기</button></Link>
            <button className='deleteButton' onClick={()=>handleDelete(post.id)}>삭제하기</button>
          </>
        }
        {!post &&
          <>
            <h2>글이 존재하지 않습니다.</h2>
            <p className='goToHome'>
              <Link to='/'>홈으로 돌아가기</Link>
            </p>
          </>
        }
      </div>
    </DetailWrap>
  )
}

export default DetailPage

const DetailWrap = styled.div`

  .container{
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
    padding: 30px;
    border: 1px solid lightgray;

    .postTime{
      font-size: 18px;
      margin: 15px 0;
      color: gray;
      border-bottom: 1px solid gray;
      padding-bottom: 15px;
    }

    button{
      border: none;
      padding: 10px 20px; 
      margin-right: 15px;
      border-radius: 5px;
      background-color: #051367;
      color: #fff;
      margin-top: 50px;
      cursor: pointer;
    }

    h2{
      font-weight: 500;
    }

    .goToHome{
      margin-top: 20px;
      a{
        font-size: 20px;
        font-weight: bold;
      }
      a:hover{
        text-decoration: underline;
      }
    }
  }
`;