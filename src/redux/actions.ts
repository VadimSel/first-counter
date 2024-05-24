

type SetMaxValueActionType = {
    type: "SET-MAX-VALUE"
    payload: number
}

type SetMinValueActionType = {
    type: "SET-MIN-VALUE"
    payload: number
}

type SetCurrentValueType = {
    type: "SET-CURRENT-VALUE"
    payload: number
}

type SetErrorType = {
    type: "SET-ERROR"
    payload: string | null
}

export type ActionsType = SetMaxValueActionType | SetMinValueActionType | SetCurrentValueType | SetErrorType

export const setMaxValueAC = (value: number): SetMaxValueActionType => ({
    type: "SET-MAX-VALUE",
    payload: value,
})

export const setMinValueAC = (value: number): SetMinValueActionType => ({
    type: "SET-MIN-VALUE",
    payload: value
})

export const setCurrentValueAC = (value: number): SetCurrentValueType => ({
    type: "SET-CURRENT-VALUE",
    payload: value
})

export const setErrorAC = (error: string | null): SetErrorType => ({
    type: "SET-ERROR",
    payload: error
})