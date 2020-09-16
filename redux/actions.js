import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK, EDIT_TASK, SELECT_CATEGORY, FETCH_CATEGORIES } from './actionTypes'
import {firebaseApp} from '../firebase'

// action creators
export const addCategory = newCategory => ({
	type: ADD_CATEGORY,
	payload: {
		... newCategory, 
		tasks : [],
	},
})


export const addTask = newTask => ({
	type: ADD_TASK,
	payload: {
		...newTask,
		done : false,
	},
})

export const editTask = task => ({
	type : EDIT_TASK,
	payload : task,
})

export const toggleTask = task => ({
	type: TOGGLE_TASK,
	payload: task,
})

export const selectCategory = category =>({
	type: SELECT_CATEGORY,
	payload: category,
})

export const fetchCategories = () => dispatch => {
  
	firebaseApp.database().ref('categories/sdfhdfh').on('value', snap =>{
		dispatch({
			type: FETCH_CATEGORIES,
			payload: {categories : snap.val()},
		})
	})
}