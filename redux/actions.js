import { 
	ADD_CATEGORY, 
	ADD_TASK, 
	TOGGLE_TASK, 
	EDIT_TASK,
	EDIT_CATEGORY,
	SELECT_CATEGORY, 
	FETCH_CATEGORIES, 
	SIGN_IN, 
	DELETE_TASK, 
	INIT_ACCOUNT, 
	DELETE_CATEGORY 
} from './actionTypes'

import { firebaseApp } from '../firebase'

// action creators
export const signIn = user => ({
	type : SIGN_IN,
	payload : user,
})

export const addCategory = newCategory => ({
	type: ADD_CATEGORY,
	payload: {
		... newCategory,
		id : `${Date.now()}`,
		tasks : [],
	},
})

export const editCategory = newCategory => ({
	type: EDIT_CATEGORY,
	payload: {
		... newCategory,
	},
})

export const addTask = newTask => ({
	type: ADD_TASK,
	payload: {
		...newTask,
		id : `${Date.now()}`,
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

export const deleteTask = task => ({
	type: DELETE_TASK,
	payload: task,
})

export const deleteCategory = category => ({
	type: DELETE_CATEGORY,
	payload: category,
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