import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reducers";
import firebase from '../firebase'
import { fetchCategories } from "./actions";

import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

const fromStore = (state, db) => {
  db.ref('/tasks-rn').set(state);
}

store.subscribe(() => fromStore(store.getState(), firebase.database()))