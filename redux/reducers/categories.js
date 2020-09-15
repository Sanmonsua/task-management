import { ADD_TASK, ADD_CATEGORY, TOGGLE_TASK, SELECT_CATEGORY, EDIT_TASK, FETCH_CATEGORIES } from '../actionTypes'

initialState = {
    allIds : [],
    byIds : {},
    selectedId : "0",
}

export default function (state=initialState, action) {
    switch (action.type){
        case FETCH_CATEGORIES :
            const { categories } = action.payload
            return {
                ... state,
                allIds: categories.byIds.map(c => c.id),
                byIds: {... categories.byIds},
            }
        case ADD_TASK :
            const { categoryId } = action.payload
            const newTasks = state.byIds[categoryId].hasOwnProperty('tasks') 
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
        case ADD_CATEGORY :
            const { id } = action.payload
            return {
                ...state,
                allIds : [ ...state.allIds, id ],
                byIds : {
                    ... state.byIds, 
                    [id]:action.payload
                },
                selectedId : state.allIds.length === 0 ? id : state.selectedId,
            }
        case TOGGLE_TASK:
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
        case EDIT_TASK:
            return ({
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
                
            )
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedId : action.payload.categoryId,
            }
        default:
            return state
    }
}