import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Card from '../utils/Card'
import FilterBox from '../utils/FilterBox'
import {places} from './Datas'
const ItemDatas = () => {

  const [items, setItems] = useState([])
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [postSize, setPostSize] = useState(0)
  const [Filters, setFilters] = useState({
    places: []
  })

  useEffect(()=>{
    let body = {
      skip,
      limit
    }
    getItem(body)
  },[])

  const getItem = (body) => {
    axios.post('/api/item/items', body)
    .then(res=>{
      if(res.data.success){
        if(body.loadMore) setItems([...items, ...res.data.itemInfo])
        else setItems(res.data.itemInfo)
        setPostSize(res.data.postSize)
      }else{
        alert('상품을 불러오는데 실패했습니다.')
      }
    })
  }
  
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

  const handleLoadMore = () => {
    let skip =+ limit

    let body = {
      skip,
      limit,
      loadMore: true
    }
    getItem(body)
    setSkip(skip)
  }

  const showFilterResults = (filters) => {
    let body ={
      skip: 0,
      limit,
      filters

    }
    getItem(body)
    setSkip(0)
  }

  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    showFilterResults(newFilters)
  }

  return (
    <ItemWrap className='container pd-2'>
      <p>최근 올라온 분실문</p>
      <hr/>
      <div className='filters grid'>
        <FilterBox title={"지역"} lists={places} handleFilters={filters => handleFilters(filters, "places")} />
      </div>

      <div className='grid-3 mg-2'>
        {renderItems}
      </div>

      {postSize >= limit && 
        <div className='btn-center'>
          <button className='btn' onClick={handleLoadMore}>더보기</button>
        </div>
      }
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

  .btn-center{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }



`;