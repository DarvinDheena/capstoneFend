import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
    // put reducers here
    user: userReducer,
    posts: postReducer,
});

export default rootReducer;