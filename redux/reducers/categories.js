import {
	ADD_TASK,
	ADD_CATEGORY,
	TOGGLE_TASK,
	SELECT_CATEGORY,
	EDIT_TASK,
	EDIT_CATEGORY,
	FETCH_CATEGORIES,
	INIT_ACCOUNT,
	DELETE_TASK,
	DELETE_CATEGORY,
} from '../actionTypes'

const initialState = {
	allIds: [],
	byIds: {},
	selectedId: null,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_CATEGORIES:
			const { categories } = action.payload
			return {
				...state,
				allIds: Object.keys(categories),
				byIds: { ...categories },
				selectedId:
					+state.selectedId >= categories.length
						? categories[0].id
						: state.selectedId,
			}
		case ADD_TASK:
			const { categoryId } = action.payload
			const newTasks =
				'tasks' in state.byIds[categoryId]
					? [...state.byIds[categoryId].tasks, action.payload]
					: [action.payload]
			return {
				...state,
				byIds: {
					...state.byIds,
					[categoryId]: {
						...state.byIds[categoryId],
						tasks: newTasks,
					},
				},
			}
		case ADD_CATEGORY:
			return {
				...state,
				byIds: {
					...state.byIds,
					[action.payload.id]: { ...action.payload },
				},
				allIds: [...state.allIds, state.newId],
				selectedId: action.payload.id,
			}
		case EDIT_CATEGORY:
			const { id } = action.payload
			return {
				...state,
				byIds: {
					...state.byIds,
					[id]: {
						...action.payload,
						tasks: state.byIds[id].tasks,
					},
				},
			}
		case TOGGLE_TASK:
			const { taskId, category } = action.payload
			return {
				...state,
				byIds: {
					...state.byIds,
					[category]: {
						...state.byIds[category],
						tasks: state.byIds[category].tasks.map((task) =>
							task.id === taskId
								? { ...task, done: !task.done }
								: task
						),
					},
				},
			}
		case EDIT_TASK:
			return {
				...state,
				byIds: {
					...state.byIds,
					[action.payload.categoryId]: {
						...state.byIds[action.payload.categoryId],
						tasks: state.byIds[action.payload.categoryId].tasks.map(
							(task) =>
								task.id === action.payload.id
									? {
											...task,
											name: action.payload.name,
											date: action.payload.date,
									  }
									: task
						),
					},
				},
			}
		case DELETE_TASK:
			const task = action.payload
			return {
				...state,
				byIds: {
					...state.byIds,
					[task.categoryId]: {
						...state.byIds[task.categoryId],
						tasks: state.byIds[task.categoryId].tasks.filter(
							(t) => t.id !== task.id
						),
					},
				},
			}
		case DELETE_CATEGORY: {
			const categoryToDelete = action.payload
			const newIds = state.allIds.filter(
				(id) => id !== categoryToDelete.id
			)
			return {
				...state,
				allIds: newIds,
				byIds: Object.keys(state.byIds).reduce((obj, key) => {
					if (key !== categoryToDelete.id) {
						obj[key] = state.byIds[key]
					}
					return obj
				}, {}),
				selectedId: newIds[0],
			}
		}
		case SELECT_CATEGORY:
			return {
				...state,
				selectedId: action.payload.categoryId,
			}
		case INIT_ACCOUNT:
			return initialState
		default:
			return state
	}
}
