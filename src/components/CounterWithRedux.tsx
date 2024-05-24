import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from "./Button";
import { Input } from "./Input";
import s from "./Counter.module.css"
import { useDispatch, useSelector } from "react-redux";
import { ActionsType, setCurrentValueAC, setErrorAC, setMaxValueAC, setMinValueAC } from "../redux/actions";
import { RootReducerType } from "../redux/store";

export const CounterWithRedux = () => {

    // Redux states
    let maxValue = useSelector((state: RootReducerType) => state.counter.maxValue)
    let minValue = useSelector((state: RootReducerType) => state.counter.minValue)
    let currentValue = useSelector((state: RootReducerType) => state.counter.currentValue)
    let error = useSelector((state: RootReducerType) => state.counter.error)

    const dispatch = useDispatch()

    // ---------------------------------------------

    // Input handlers
    const maxValueHandler = (value: string) => {
        let maxHandlerValue = parseInt(value);
        if (!isNaN(maxHandlerValue)) {
            dispatch(setMaxValueAC(maxHandlerValue));
            if (maxHandlerValue < 0 || maxHandlerValue < minValue || minValue < 0) {
                dispatch(setErrorAC("Incorrect value!"));
            } else {
                dispatch(setErrorAC(null));
            }
        }
    };

    const minValueHandler = (value: string) => {
        const minHandlerValue = parseInt(value);
        if (!isNaN(minHandlerValue)) {
            dispatch(setMinValueAC(minHandlerValue));
            if (minHandlerValue < 0 || minHandlerValue > maxValue) {
                dispatch(setErrorAC("Incorrect value!"));
            } else {
                dispatch(setErrorAC(null));
            }
        }
    }
    // ---------------------------------------------

    // Buttons handler
    const setHandler = () => {
        dispatch(setCurrentValueAC(minValue));
    };
    const increment = () => {
        if (currentValue < maxValue) {
            dispatch(setCurrentValueAC(++currentValue));
        }
    };
    const reset = () => {
        dispatch(setCurrentValueAC(minValue));
    };
    // ---------------------------------------------

    // Disabled handlers
    const incDisabledHandler = () => maxValue === currentValue || error ? true : false
    const resetDisabledHandler = () => error ? true : false
    const setDisabledHandler = () => maxValue && minValue === currentValue || error ? true : false
    // ---------------------------------------------

    // LocalStorage
    useEffect(() => {
        let valueAsString = localStorage.getItem("currentCounterValue")
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            dispatch(setCurrentValueAC(newValue))
        }
    }, [])
    useEffect(() => {
        let valueAsString = localStorage.getItem("currentMinValue")
        if (valueAsString) {
            let newMinValue = JSON.parse(valueAsString)
            dispatch(setMinValueAC(newMinValue))
        }
    }, [])
    useEffect(() => {
        let valueAsString = localStorage.getItem("currentMaxValue")
        if (valueAsString) {
            let newMaxValue = JSON.parse(valueAsString)
            dispatch(setMaxValueAC(newMaxValue))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("currentCounterValue", JSON.stringify(currentValue))
    }, [currentValue])
    useEffect(() => {
        localStorage.setItem("currentMinValue", JSON.stringify(minValue))
    }, [minValue])
    useEffect(() => {
        localStorage.setItem("currentMaxValue", JSON.stringify(maxValue))
    }, [maxValue])
    // ---------------------------------------------

    // Layout
    return (
        <div className={s.mainDiv}>
            <div className={s.container}>
                <div className={s.valueAndIncButton}>
                    <div className={s.titleValue}>
                        {error ? <h1>{error}</h1> : <h1>{currentValue}</h1>}
                    </div>
                    <Button buttonName={"inc"} buttonCallback={increment} disabled={incDisabledHandler()} />
                </div>
                <div className={s.inputsAndTextAndButtons}>
                    <div className={s.text}>
                        <span>Max value:</span>
                        <span>Min value:</span>
                        <Button buttonName={"reset"} buttonCallback={reset} disabled={resetDisabledHandler()} />
                    </div>
                    <div className={s.inputsFromSettings}>
                        <Input type={"number"} value={maxValue} onChange={maxValueHandler} />
                        <Input type={"number"} value={minValue} onChange={minValueHandler} />
                        <Button buttonName={"set"} buttonCallback={setHandler} disabled={setDisabledHandler()} />
                    </div>
                </div>
            </div>
        </div>
    );
};
