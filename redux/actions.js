import { ADD_CATEGORY, ADD_TASK, TOGGLE_TASK, EDIT_TASK, SELECT_CATEGORY, FETCH_CATEGORIES, SIGN_IN, INIT_ACCOUNT } from './actionTypes'
import {firebaseApp} from '../firebase'

// action creators
export const signIn = user => ({
	type : SIGN_IN,
	payload : user,
})

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

export const fetchCategories = ({uid}) => dispatch => {
	
	firebaseApp.database().ref(`categories/${uid}`).on('value', snap =>{
		if (snap.exists()){
			dispatch({
				type: FETCH_CATEGORIES,
				payload: {categories : snap.val()},
			})
		}
		else {
			dispatch({
				type: INIT_ACCOUNT,
			})
		}
	})
}