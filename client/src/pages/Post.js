import axios from 'axios';
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import FileUpload from '../components/utils/FileUpload';

const Places = [
  {key: 1, value: '서울'},
  {key: 2, value: '경기도'},
  {key: 3, value: '충청북도'},
  {key: 4, value: '충청남도'},
  {key: 5, value: '전라북도'},
  {key: 6, value: '전라남도'},
  {key: 7, value: '강원도'},
  {key: 8, value: '제주도'},
  {key: 9, value: '경상북도'},
  {key: 10, value: '경상남도'},
  {key: 11, value: '부산'},
  {key: 12, value: '대구'},
  {key: 13, value: '광주'},
  {key: 14, value: '대전'}
]

const Post = ({user}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState(1);
  const [images, setImages] = useState([])

  const updateImages = (newImages) =>{
    setImages(newImages)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      writer: user.userData._id,
      title,
      desc,
      images,
      place
    }
    axios.post('/api/product', body)
      .then(res=>{
        if(res.data.success){
          alert('상품 업로드에 성공 했습니다.')
          navigate('/')
        }else{
          alert('상품 업로드에 실패 했습니다.')
        }
      })

  }

  return (
    <PostWrap>
      <h2 className='mg-2 main-color'>분실물 업로드</h2>
      <section className='flex-center'>
        <form onSubmit={handleSubmit} >
          <FileUpload refreshFunction={updateImages}/>
          <div className='flex-column'>
            <label>제목</label>
            <input
              type='text'
              required
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <label>내용</label>
            <textarea 
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
              required
              type='text'
            />
          </div>
          <select className='mg-2' value={place} onChange={(e)=>setPlace(e.target.value)} >
             {Places.map(place=>(
              <option key={place.key} value={place.key}>{place.value}</option>
            ))}
          </select>
          <button type='submit' className='btn' disabled={!title || !desc || !place ? true : false}>작성하기</button>
        </form>
      </section>
    </PostWrap>
  )
}

export default Post

const PostWrap = styled.main`
  h2{
    margin: 80px 0;
    text-align: center;
  }
   section{
    max-width: 700px;
    margin: 0 auto;

    form{
      width: 100%;

      label{
        font-size: 16px;
        margin: 15px 0;
      }
 
      input, textarea{
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
      }
 
      textarea{
        min-height: 200px;
      }
 
      select{
        display: block;
    }
  }  
`; 