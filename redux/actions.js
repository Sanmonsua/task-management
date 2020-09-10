import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK } from './actionTypes'

let newCategoryId = 0 

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

export const addTask = newTask => ({
  type: ADD_TASK,
  payload: newTask,
})

export const toggleTask = task => ({
  type: TOGGLE_TASK,
  payload: task,
})