import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_LIST,
  GET_LIST_ITEMS
} from '../_actions/types'

export default function(state = {}, action){
  switch(action.type){
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload}
      break;
    case REGISTER_USER:
      return {...state, register: action.payload}
      break;
    case AUTH_USER:
      return{...state, userData: action.payload}
    case ADD_TO_LIST:
      return {...state, userData: {...state.userData, list: action.payload}}
    case GET_LIST_ITEMS:
      return {...state, listDetail: action.payload}
      default:
       return state
  }
}