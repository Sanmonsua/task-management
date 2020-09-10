import { createStore } from "redux";
import rootReducer from "./reducers";
import { addCategory, addTask } from "./actions";

const store = createStore(rootReducer);

store.dispatch(
    addCategory({
        name: "Work",
        color: "#a362ea",
        tasks : [],
    })
);

store.dispatch(
    addCategory({
        name: "Family",
        color: "#f5a921",
        tasks : [],
    })
);

store.dispatch(
    addCategory({
        name: "Software Design",
        color: "#43c8dd",
        tasks : [],
    })
);

export default store