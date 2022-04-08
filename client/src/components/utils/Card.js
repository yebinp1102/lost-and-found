import React from 'react'
import styled from 'styled-components'

const Card = ({cover, title}) => {
  return (
    <CardWrap>
      <Img>
        {cover}
      </Img>
      <p>{title}</p>
    </CardWrap>
  )
}

export default Card

const CardWrap = styled.div`
  height: 270px;


  p{
    height: 70px;
    padding: 10px;
    border-top: 1px solid #ddd;
  }
`;

const Img = styled.div`
  height: 200px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;