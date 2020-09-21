import * as actions from '../../redux/actions'
import * as actionsTypes from '../../redux/actionTypes'

import { mockCategory, mockUser } from '../../mockData'

// SignIn action
describe('signIn returns actions', () => {
    it('handles user uid input', () => {
        expect(actions.signIn(mockUser)).toMatchSnapshot()
    })

    it('handles user uid empty', () => {
        expect(actions.signIn({ uid : '' })).toEqual({ 
            type: actionsTypes.SIGN_IN, 
            payload: { uid : '' } 
        })
    })
})

// AddCategory action
describe('addCategory returns actions', () => {
    
    it('handles new category', () => {
        expect(actions.addCategory(mockCategory)).toMatchSnapshot({
            payload : {
                id : expect.any(String)
            }
        })
    })
})

describe('editCategory returns action', () => {

    it('handles valid category', () => {
        expect(actions.editCategory(mockCategory)).toMatchSnapshot()
    })

})