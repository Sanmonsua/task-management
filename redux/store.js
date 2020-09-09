import { createStore } from "redux";
import rootReducer from "./reducers";
import { addCategory, addTask } from "./actions";

const store = createStore(rootReducer);

store.dispatch(
    addCategory({
        name: "Work",
        color: "#a362ea",
        tasks : [],
        id: 1,
    })
);

export default store