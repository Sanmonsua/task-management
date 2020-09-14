import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from "redux";
import rootReducer from "./reducers";
import { addCategory } from "./actions";

import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

store.dispatch(
    addCategory({
        name: "Work",
        color: "#a362ea",
    })
);

