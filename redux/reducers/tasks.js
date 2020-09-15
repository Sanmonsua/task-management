import { ADD_TASK, TOGGLE_TASK, EDIT_TASK } from '../actionTypes'

initialState = {
    
}

export default function (state=initialState, action) {
    switch (action.type){
        case ADD_TASK :
            const { id } = action.payload
            return { 
                ...state, 
                [id] : action.payload
            }
        case TOGGLE_TASK:
            const { taskId } = action.payload
            return {
                ...state,
                [taskId] : {
                    ... state[taskId], 
                    done : !state[taskId].done
                }
            }
        case EDIT_TASK:
            return {
                ...state,
                [taskId] : {
                    ... state[taskId], 
                    ...action.payload
                }
            } 
        default:
            return state
    }
}