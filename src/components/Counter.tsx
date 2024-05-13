import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from "./Button";
import { Input } from "./Input";
import s from "./Counter.module.css"

export const Counter = () => {

    // States
    let [maxValue, setMaxValue] = useState(5);
    let [minValue, setMinValue] = useState(0);
    let [currentValue, setCurrentValue] = useState(0);
    const [error, setError] = useState<string | null>(null);
    // ---------------------------------------------

    // Input handlers
    const maxValueHandler = (value: string) => {
        let maxHandlerValue = parseInt(value);
        if (!isNaN(maxHandlerValue)) {
            setMaxValue(maxHandlerValue);
            if (maxHandlerValue < 0 || maxHandlerValue < minValue || minValue < 0) {
                setError("Incorrect value!");
            } else {
                setError(null);
            }
        }
    };

    const minValueHandler = (value: string) => {
        const minHandlerValue = parseInt(value);
        if (!isNaN(minHandlerValue)) {
            setMinValue(minHandlerValue);
            if (minHandlerValue < 0 || minHandlerValue > maxValue) {
                setError("Incorrect value!");
            } else {
                setError(null);
            }
        }
    }
    // ---------------------------------------------

    // Buttons handler
    const setHandler = () => {
        setCurrentValue(minValue);
    };
    const increment = () => {
        if (currentValue < maxValue) {
            setCurrentValue(++currentValue);
        }
    };
    const reset = () => {
        setCurrentValue(minValue);
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
            setCurrentValue(newValue)
        }
    }, [])
    useEffect(() => {
        let valueAsString = localStorage.getItem("currentMinValue")
        if (valueAsString) {
            let newMinValue = JSON.parse(valueAsString)
            setMinValue(newMinValue)
        }
    }, [])
    useEffect(() => {
        let valueAsString = localStorage.getItem("currentMaxValue")
        if (valueAsString) {
            let newMaxValue = JSON.parse(valueAsString)
            setMaxValue(newMaxValue)
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
