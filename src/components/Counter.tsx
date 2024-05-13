import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from "./Button";
import { Input } from "./Input";

export const Counter = () => {

    // States
    let [maxValue, setMaxValue] = useState(5);
    let [minValue, setMinValue] = useState(0);
    let [currentValue, setCurrentValue] = useState(0);
    const [error, setError] = useState<string | null>(null);
    // ---------------------------------------------

    // Input handlers
    // const maxValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     let maxHandlerValue = parseInt(event.currentTarget.value);
    //     setMaxValue(maxHandlerValue);
    //     if (maxHandlerValue < 0 || maxHandlerValue < minValue || minValue < 0) {
    //         setError("Incorrect value!");
    //     } else {
    //         setError(null);
    //     }
    // };

    // const minValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     const minHandlerValue = parseInt(event.currentTarget.value);
    //     if (!isNaN(minHandlerValue)) {
    //         setMinValue(minHandlerValue);
    //         if (minHandlerValue < 0 || minHandlerValue > maxValue) {
    //             setError("Incorrect value!");
    //         } else {
    //             setError(null);
    //         }
    //     }
    // }
    
    const maxValueHandler = (value: string) => {
        let maxHandlerValue = parseInt(value);
        setMaxValue(maxHandlerValue);
        if (maxHandlerValue < 0 || maxHandlerValue < minValue || minValue < 0) {
            setError("Incorrect value!");
        } else {
            setError(null);
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
        <div>
            {error ? <h1>{error}</h1> : <div><h1>{currentValue}</h1></div>}
            {/* <input type={"number"} value={maxValue} onChange={maxValueHandler} placeholder={"Max value"} /> */}
            {/* <input type={"number"} value={minValue} onChange={minValueHandler} placeholder={"Min value"} /> */}
            <Input type={"number"} value={maxValue} onChange={maxValueHandler} />
            <Input type={"number"} value={minValue} onChange={minValueHandler} />
            <Button buttonName={"inc"} buttonCallback={increment} disabled={incDisabledHandler()} />
            <Button buttonName={"reset"} buttonCallback={reset} disabled={resetDisabledHandler()} />
            <Button buttonName={"set"} buttonCallback={setHandler} disabled={setDisabledHandler()} />
        </div>
    );
};
