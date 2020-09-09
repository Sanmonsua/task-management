import { ADD_CATEGORY, ADD_TASK } from './actionTypes'


// action creators
export const addCategory = newCategory => ({
  type: ADD_CATEGORY,
  payload: newCategory,
})

export const addTask = newTask => ({
  type: ADD_TASK,
  payload: newTask,
})