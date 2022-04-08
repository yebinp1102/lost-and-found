import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Card from '../utils/Card'

const ItemDatas = () => {

  const [items, setItems] = useState([])

  useEffect(()=>{
    let body = {

    }
    axios.post('/api/item/items')
      .then(res=>{
        if(res.data.success){
          console.log(res.data)
          setItems(res.data.itemInfo)
        }else{
          alert('상품을 불러오는데 실패했습니다.')
        }
      })

  },[])
  
  const renderItems = items.map((item, idx)=>{
    return(
      <div key={idx} className='item'>
        <Card
          cover={<img src={`http://localhost:5000/${item.images[0]}`} />}
          title={item.title}
        />
      </div>
    )
  })

  return (
    <ItemWrap className='container pd-2'>
      <p>최근 올라온 분실문</p>
      <hr/>
      <div className='grid-3 mg-2'>
        {renderItems}
      </div>
    </ItemWrap>
  )
}

export default ItemDatas

const ItemWrap = styled.section`
  margin-top: 50px;

  p{
    font-size: 18px;
    padding-bottom: 30px;
  }

  .item{
    border: 1px solid #ddd;
    border-radius: 5px;
  }


`;