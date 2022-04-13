import axios from 'axios'
import {
  LOGIN_USER, REGISTER_USER, AUTH_USER, ADD_TO_LIST, GET_LIST_ITEMS, REMOVE_LIST_ITEM
} from './types'


export function loginUser(body){
  const request = axios.post('/api/users/login', body)
    .then(res=>res.data)
  return{
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(body){
  const request = axios.post('/api/users/register', body)
    .then(res=>res.data)
    return{
      type: REGISTER_USER,
      payload: request
    }
}

export function auth (){
  const request = axios.get('/api/users/auth')
    .then(res=>res.data)
  return{
    type: AUTH_USER,
    payload: request
  }
}

export function addToList (id){
  let body = {
    itemId : id
  }
  const request = axios.post('/api/users/addToCart', body)
    .then(res=> res.data)
  return{
    type: ADD_TO_LIST,
    payload: request
  }
}

export function getItemLists(itemLists){
  const request = axios.get(`/api/item/items_by_id?id=${itemLists}&type=array`)
    .then(res=>res.data)
  return{
    type: GET_LIST_ITEMS,
    payload: request
  }
}

export function removeListItem(itemId){
  const request = axios.get(`/api/users/removeFromList?id=${itemId}`)
    .then(res=> {
      return res.data
    })

  return{
    type: REMOVE_LIST_ITEM,
    payload: request
  }
}