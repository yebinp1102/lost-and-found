import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {BsStar} from 'react-icons/bs'
import { addToList } from '../../_actions/user_action'

const ItemInfo = ({detail}) => {
  const [date, setDate] = useState("")
  const [writer, setWriter] = useState("")

  const dispatch = useDispatch();

  useEffect(()=>{
    if(detail && detail.writer && detail.writer.name){
      let name = detail.writer.name
      setWriter(name)
    }
    if(detail && detail.updatedAt){
      let Date = detail.updatedAt.substr(0, 10)
      setDate(Date)
    }
  },[detail])

  const handleClick = () => {
    dispatch(addToList(detail._id))
  }

  return (
    <DetailInfoWrap className='pd-1'>
      <div>
        <h3 className='mg-2'>{detail.conditions === 1 ? '[습득]' : '[분실]'} {detail.title}</h3>
        <p>작성 일자 : {date}</p>
        <p>작성자 : {writer && writer}</p>
        <p>조회수 : {detail.views}</p>
        <div className='desc'>{detail.desc}</div>
      </div>

      <button onClick={handleClick}>
        <BsStar />
        <span>관심 목록에 추가</span>
      </button>
    </DetailInfoWrap>
  )
}

export default ItemInfo

const DetailInfoWrap = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 120px;
  font-size: 14px;

  p{
    font-size: 14px;
    margin-top: 10px;
  }

  .desc{
    border-top: 1px solid #ddd;
    padding-top: 15px;
    margin-top: 15px;
    line-height: 1.5;
  }

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 80px;
    border: none;
    background-color: #456ee3;
    color: #fff;
    padding: 10px;
    border-radius: 10px;

    svg{
      margin-right: 5px;
    }
  }
`;