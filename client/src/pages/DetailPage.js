import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ItemInfo from '../components/Section/ItemInfo'
import ItemImage from '../components/Section/ItemImage'

const DetailPage = () => {
  const {itemId} = useParams();
  const [Item, setItem] = useState({})

  useEffect(()=>{
    axios.get(`/api/item/items_by_id?id=${itemId}&type=single`)
      .then(res=>{
        if(res.data.success){
          setItem(res.data.item[0])
        }else{
          alert('글 상세 보기에 실패 했습니다.')
        }
      })
  },[])
  return (
    <DetailWrap className='container pd-2'>
      <div className='grid pd-2'>
        <ItemImage detail={Item} />
        <ItemInfo detail={Item} />
      </div>
    </DetailWrap>
  )
}

export default DetailPage

const DetailWrap = styled.div`

`;