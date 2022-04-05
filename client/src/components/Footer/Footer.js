import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <div className='container'>
        <p>분실물 관리소 연락처 : 02-123-1234</p>
      </div>
    </FooterWrap>
  )
}

export default Footer

const FooterWrap = styled.div`
  height: 70px;
  display: flex;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  box-shadow: 4px -4px #eee;
  margin-top: 10px;
`;