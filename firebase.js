import * as firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyD25r7YkCoejqZvOj9gwMPVN62JG9lRchw',
	authDomain: 'tasks-rn.firebaseapp.com',
	databaseURL: 'https://tasks-rn.firebaseio.com',
	projectId: 'tasks-rn',
	storageBucket: 'tasks-rn.appspot.com',
	messagingSenderId: '948857622296',
	appId: '1:948857622296:web:5183e364a46bac0b8a586d',
	measurementId: 'G-WS25SFDW2T'
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)