import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getItemLists, removeListItem } from '../_actions/user_action'
import UserListBlock from '../components/Section/UserListBlock'

const ListPage = ({user}) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    
    let itemLists = []

    if(user.userData && user.userData.list){
      if(user.userData.list.length > 0 ){
        user.userData.list.forEach(item=>{
          if(!itemLists.includes(item.id)){
            itemLists.push(item.id)
          }
        })
        dispatch(getItemLists(itemLists))
      }
    }
  },[user.userData])

  const handleDelete = (itemId) => {
    dispatch(removeListItem(itemId))
      .then(res=> res.data)
  }
  
  return (
    <div className='pd-2'>
      <p className='pd-2' style={{textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem'}}><b>{user.userData && user.userData.name}님</b>의 관심 목록</p>
      <UserListBlock item={user.listDetail} removeItem={handleDelete} />
    </div>
  )
}

export default ListPage
