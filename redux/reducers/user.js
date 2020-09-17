import { SIGN_IN } from '../actionTypes'

const initialState = {
	isAuthenticated: false,
}

export default function (state = initialState, action) {
	console.log(action.payload)
	switch (action.type){
	case SIGN_IN:
		return {
			... action.payload.user,
			isAuthenticated: true,
		}
	default : 
		return state
	}
}