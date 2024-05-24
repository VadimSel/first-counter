import { ActionsType } from "./actions";

const initialState = {
    maxValue: 5,
    minValue: 0,
    currentValue: 0,
    error: null,
}

export const counterReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-MAX-VALUE":
            return {...state, maxValue: action.payload}
        case "SET-MIN-VALUE":
            return {...state, minValue: action.payload}
        case "SET-CURRENT-VALUE":
            return {...state, currentValue: action.payload}
        case "SET-ERROR":
            return {...state, error: action.payload}
        default:
            return state
    }
}