import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK, SELECT_CATEGORY } from './actionTypes'

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
export const toggleTask = task => ({
  type: TOGGLE_TASK,
  payload: task,
})

export const selectCategory = category =>({
  type: SELECT_CATEGORY,
  payload: category,
})