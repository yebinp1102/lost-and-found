import React from 'react'
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrap>
      <div className='container'>
        <h2>분실물 관리소 - Lost and Found</h2>
      </div>
    </HeaderWrap>
  )
}

export default Header

const HeaderWrap = styled.header`
  height: 70px;
  background-color: #5D8BF4;
  color: #fff;
  display: flex;
  align-items: center;

`;