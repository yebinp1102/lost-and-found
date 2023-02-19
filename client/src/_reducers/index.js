import { combineReducers } from "redux";
import user from './user_reducer'

const rootReducter = combineReducers({
  user
})

export default rootReducter