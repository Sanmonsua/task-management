import { ADD_TASK, ADD_CATEGORY, TOGGLE_TASK, SELECT_CATEGORY, EDIT_TASK, FETCH_CATEGORIES } from '../actionTypes'

const initialState = {
	allIds : [],
	byIds : {
		'0' : {
			color:'#f55c33',
			name:'Work',
			id:'0',
			tasks:[],
		}
	},
	selectedId : '0',
	newId : 1,
}

export default function (state=initialState, action) {
	switch (action.type){
	case FETCH_CATEGORIES : {
		const { categories } = action.payload
		if (!categories) return {... state}
		return {
			... state,
			allIds: categories.map(c => c.id),
			byIds: {...state.byIds, ... categories},
			selectedId : +state.selectedId >= categories.length ? '0' : state.selectedId,
			newId: `${categories.length}`
		}
	}
	case ADD_TASK : {
		const { categoryId } = action.payload
		const newTasks = 'tasks' in state.byIds[categoryId] 
			? [... state.byIds[categoryId].tasks, action.payload]
			: [ action.payload ]
		return { 
			...state, 
			byIds : { 
				... state.byIds, 
				[categoryId] : {
					... state.byIds[categoryId],
					tasks : newTasks
				} 
			} 
		}
	}
	case ADD_CATEGORY : {
		return {
			...state,
			byIds : {
				... state.byIds, 
				[state.newId]:{... action.payload, id : state.newId}
			},
			allIds : [ ...state.allIds, state.newId ],
			selectedId : state.newId,
			newId : `${+state.newId++}`
		}
	}
	case TOGGLE_TASK:{
		const { taskId, category } = action.payload
		return {
			...state,
			byIds: {
				...state.byIds,
				[category]:{
					...state.byIds[category],
					tasks : state.byIds[category].tasks.map(
						task => task.id === taskId ? {...task, done:!task.done} : task 
					)
				}
			}
		}
	}
	case EDIT_TASK: {
		return {
			...state,
			byIds : {
				...state.byIds,
				[action.payload.categoryId]:{
					...state.byIds[action.payload.categoryId],
					tasks : state.byIds[action.payload.categoryId].tasks.map(
						task => task.id === action.payload.id 
							? {...task, name:action.payload.name, date:action.payload.date} 
							: task 
					)
				}
			}
		}
	}                
	case SELECT_CATEGORY: {
		return {
			...state,
			selectedId : action.payload.categoryId,
		}
	}
	default:
		return state
	}
}