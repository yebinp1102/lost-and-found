import React, { useEffect } from 'react'
import styled from 'styled-components'

const UserListBlock = ({item}) => {
  useEffect(()=>{
    console.log(item)
  },[])

  const renderImage = (images) => {
    if(images.length > 0){
      let image = images[0]
      return `http://localhost:5000/${image}`
    }
  }

  const renderItems = () => (
    item && item.map( (itemInfo, idx) => (
      <div key={idx} className='infoBox pd-1'>
        <div className='imgBox'>
          <img src={renderImage(itemInfo.images)} alt='itemImage' />
        </div>
        <div>
          <p>{itemInfo.conditions === 1 ? '[습득]' : '[분실]'} {itemInfo.title}</p>
          <p className='mg-1'>작성 일자 : {itemInfo.updatedAt.substr(0, 10)}</p>
          <button>삭제하기</button>
        </div>
      </div>
    ))
  )

  return (
    <UserListWrap>
      <div className='container grid'>
        {renderItems()}
      </div>
    </UserListWrap>
  )
}

export default UserListBlock

const UserListWrap = styled.article`
  color: #696969;

  .infoBox{
    gap: 10px;
    display: flex;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 20px;
    

    .imgBox{
      width: 100px;
      height: 100px;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    button{
      background-color: #456ee3;
      border: none;
      border-radius: 5px;
      padding: 5px;
      color: #fff;
      color: 14px;
    }
  }
`;