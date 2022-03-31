import React from 'react'
import styled from 'styled-components'

const Profile = ({username, userEmail}) => {
  console.log(username, userEmail);
  return (
    <ProfileWrap className='wrap'>
      <div className='container whiteBox'>
        <MyProfile>
          <h1>내 정보</h1>
          <MyInfo>
            <p>유저 명 : {username}</p>
            <p>이메일 : {userEmail}</p>
          </MyInfo>
        </MyProfile>
      </div>
    </ProfileWrap>
  )
}

export default Profile

const ProfileWrap = styled.main`

`;

const MyProfile = styled.section`

`;
const MyInfo = styled.div`

`;