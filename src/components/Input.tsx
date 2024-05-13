import React, { ChangeEvent } from "react";

type InputPropsType = {
    type: string
    value: number
    onChange: (value: string) => void
}

export const Input = (props: InputPropsType) => {

    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value)
    }

    return (
        <input type={props.type} value={props.value} onChange={onChangeCallback}/>
    )
}