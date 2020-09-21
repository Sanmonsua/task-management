import reducer from './index'
import * as actions from '../actions'
import { mockUser, mockCategories, mockTask, mockCategory } from '../../mockData'


const DEFAULT_STATE = {
	user : {},
	categories : {
		allIds : ['1267494525246'],
		byIds : mockCategories,
		selectedId : null, 
	}
}


describe('User reducer', () => {
	it('signIn action', () => {
		expect(reducer(DEFAULT_STATE, actions.signIn(mockUser))).toMatchSnapshot()
	})
})

describe('Categories reducer', () => {

    Date.now = jest.fn(() => 1482363367071)

	it('fetchCategories action', () => {
		const firebaseTest = jest.genMockFromModule('firebase')

		const snapshot = { 
			val: () => mockCategories, 
			exportVal: () => mockCategories, 
			exists: jest.fn(() => true) 
		}

		firebaseTest.database = jest.fn().mockReturnValue({
			ref: jest.fn().mockReturnThis(),
			on: jest.fn((eventType, callback) => callback(snapshot)),
			update: jest.fn(() => Promise.resolve(snapshot)),
			remove: jest.fn(() => Promise.resolve()),
			once: jest.fn(() => Promise.resolve(snapshot)),
		})
        
		const mockDispatch = jest.fn()
		actions.fetchCategories(mockUser, firebaseTest)(mockDispatch)

		expect(reducer(DEFAULT_STATE, mockDispatch.mock.calls[0][0])).toMatchSnapshot()
	})

	it('AddCategory action', () => {
		expect(reducer(DEFAULT_STATE, actions.addCategory(mockCategory))).toMatchSnapshot()
	})

	it('AddTask action', () => {
		expect(reducer(DEFAULT_STATE, actions.addTask(mockTask))).toMatchSnapshot()
    })
    
	it('Edit category action', () =>{
		expect(reducer(DEFAULT_STATE, actions.editCategory(mockCategory))).toMatchSnapshot()	
	})


})
