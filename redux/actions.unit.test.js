import * as actions from './actions'
import * as actionsTypes from './actionTypes'
import { mockCategory, mockUser, mockTask } from '../mockData'

// SignIn action
describe('signIn returns actions', () => {
	it('handles user uid input', () => {
		expect(actions.signIn(mockUser)).toMatchSnapshot()
	})

	it('handles user uid empty', () => {
		expect(actions.signIn({ uid: '' })).toEqual({
			type: actionsTypes.SIGN_IN,
			payload: { uid: '' },
		})
	})
})

// Tasks actions
describe('tasks actions', () => {
	it('handles addTask', () => {
		expect(actions.addTask(mockTask)).toMatchSnapshot({
			payload: {
				id: expect.any(String),
			},
		})
	})

	it('handles editTask', () => {
		expect(actions.editTask(mockTask)).toMatchSnapshot()
	})

	it('handles toggleTask', () => {
		expect(actions.toggleTask(mockTask)).toMatchSnapshot()
	})

	it('handles deleteTask', () => {
		expect(actions.deleteTask(mockTask)).toMatchSnapshot()
	})
})

// Categories actions
describe('categories actions', () => {
	it('handles addCategory action', () => {
		expect(actions.addCategory(mockCategory)).toMatchSnapshot({
			payload: {
				id: expect.any(String),
			},
		})
	})

	it('handles editCategory action', () => {
		expect(actions.editCategory(mockCategory)).toMatchSnapshot()
	})

	it('handles deleteCategory action', () => {
		expect(actions.deleteCategory(mockCategory)).toMatchSnapshot()
	})

	it('handles selectCategory action', () => {
		expect(actions.selectCategory(mockCategory)).toMatchSnapshot()
	})
})

describe('fetch categories action cases', () => {
	const firebaseTest = jest.genMockFromModule('firebase')

	const snapshot = {
		val: () => mockCategory,
		exportVal: () => mockCategory,
		exists: jest.fn(() => true),
	}

	firebaseTest.database = jest.fn().mockReturnValue({
		ref: jest.fn().mockReturnThis(),
		on: jest.fn((eventType, callback) => callback(snapshot)),
		update: jest.fn(() => Promise.resolve(snapshot)),
		remove: jest.fn(() => Promise.resolve()),
		once: jest.fn(() => Promise.resolve(snapshot)),
	})

	it('handles valid user', () => {
		const mockDispatch = jest.fn()
		actions.fetchCategories(mockUser, firebaseTest)(mockDispatch)

		expect(mockDispatch.mock.calls[0][0]).toEqual({
			type: actionsTypes.FETCH_CATEGORIES,
			payload: {
				categories: mockCategory,
			},
		})
	})
})
