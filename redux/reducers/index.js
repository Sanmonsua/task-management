import { combineReducers } from 'redux'
import categories from './categories'
import user from './user'

export default combineReducers({ categories, user })