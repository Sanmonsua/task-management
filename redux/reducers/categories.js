import { ADD_TASK, ADD_CATEGORY } from '../actionTypes'

initialState = {
    allIds : [],
    byIds : {},
}

export default function (state=initialState, action) {
    switch (action.type){
        case ADD_TASK :
            const { category_id } = action.payload
            return { 
                ...state, 
                byIds : { 
                    ... state.byIds, 
                    [category_id] : {
                        ... state.byIds[category_id],
                        tasks : [
                             ... state.byIds[category_id].tasks, 
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
        default:
            return state
    }
}