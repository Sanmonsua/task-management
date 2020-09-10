import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK } from './actionTypes'


// action creators
export const addCategory = newCategory => ({
  type: ADD_CATEGORY,
  payload: newCategory,
})

export const addTask = newTask => ({
  type: ADD_TASK,
  payload: newTask,
})

export const toggleTask = task => ({
  type: TOGGLE_TASK,
  payload: task,
})