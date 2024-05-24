import { combineReducers, createStore } from "redux";
import { counterReducer } from "./reducers";


const rootReducer = combineReducers({
    counter: counterReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)