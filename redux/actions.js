import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK, EDIT_TASK, SELECT_CATEGORY, FETCH_CATEGORIES } from './actionTypes'
import {firebaseApp} from '../firebase'

let newCategoryId = 0 
let newTaskId = 0
// action creators
export const addCategory = newCategory => {
  newCategoryId ++
  return ({
      type: ADD_CATEGORY,
      payload: {
        ... newCategory, 
        id : `${newCategoryId}`,
        tasks : [],
      },
    }
  )
}

export const addTask = newTask => {
  newTaskId ++
  return ({
      type: ADD_TASK,
      payload: {
        ...newTask,
        id : `${newTaskId}`,
        done : false,
      },
    }
  )
}

export const editTask = task => {
  return ({
    type : EDIT_TASK,
    payload : task,
  })
}

export const toggleTask = task => ({
  type: TOGGLE_TASK,
  payload: task,
})

export const selectCategory = category =>({
  type: SELECT_CATEGORY,
  payload: category,
})

export const fetchCategories = () => dispatch => {
  
  firebaseApp.database().ref('/categories').on('value', snap =>{
    
    dispatch({
      type: FETCH_CATEGORIES,
      payload: {categories : snap.val()},
    })
  })
}