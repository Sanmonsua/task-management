import { ADD_TASK, ADD_CATEGORY, TOGGLE_TASK } from '../actionTypes'

initialState = {
    allIds : [],
    byIds : {},
}

export default function (state=initialState, action) {
    switch (action.type){
        case ADD_TASK :
            const { categoryId } = action.payload
            return { 
                ...state, 
                byIds : { 
                    ... state.byIds, 
                    [categoryId] : {
                        ... state.byIds[categoryId],
                        tasks : [
                             ... state.byIds[categoryId].tasks, 
                             action.payload
                            ]
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
                }
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
        default:
            return state
    }
}