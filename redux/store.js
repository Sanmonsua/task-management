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

store.dispatch(
    addTask({
        id : 1,
        name: 'Make changes to the new site design',
        date : '15 sept 2020',
        done : true,
        categoryId : 1,
    })
)

export default store