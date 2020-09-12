import { createStore } from "redux";
import rootReducer from "./reducers";
import { addCategory } from "./actions";

const store = createStore(rootReducer);

store.dispatch(
    addCategory({
        name: "Work",
        color: "#a362ea",
    })
);

export default store