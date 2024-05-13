import React from "react";

type ButtonPropsType = {
    buttonName: string
    buttonCallback: () => void
    disabled: boolean
}

export const Button = (props: ButtonPropsType) => {

    const buttonCallback = () => {
        props.buttonCallback()
    }

    return (
        <button onClick={buttonCallback} disabled={props.disabled ? true : false}>{props.buttonName}</button>
    )
}