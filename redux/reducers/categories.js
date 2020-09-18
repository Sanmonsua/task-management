import { 
	ADD_TASK, 
	ADD_CATEGORY, 
	TOGGLE_TASK, 
	SELECT_CATEGORY, 
	EDIT_TASK,
	EDIT_CATEGORY,
	FETCH_CATEGORIES, 
	INIT_ACCOUNT, DELETE_TASK
} from '../actionTypes'

const initialState = {
	allIds : [],
	byIds : {},
	selectedId : '0',
	newId : 0,
}

export default function (state=initialState, action) {
	switch (action.type){
	case FETCH_CATEGORIES : {
		const { categories } = action.payload
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
				[state.newId]:{... action.payload, id : `${state.newId}`}
			},
			allIds : [ ...state.allIds, state.newId ],
			selectedId : `${state.newId}`,
			newId : `${state.newId++}`
		}
	}
	case EDIT_CATEGORY : {
		const { id } = action.payload
		return {
			...state,
			byIds : {
				... state.byIds, 
				[id]:{... action.payload}
			},
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
	case DELETE_TASK:{
		const task = action.payload
		return {
			...state,
			byIds : {
				...state.byIds,
				[task.categoryId]:{
					...state.byIds[task.categoryId],
					tasks : state.byIds[task.categoryId].tasks.filter(
						t => t.id !== task.id
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
	case INIT_ACCOUNT : 
		return initialState
	default :
		return state
	}
}