// import React from "react";

// type InputPropsType = {
//     type: string
//     value: number
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

// export const Input = (props: InputPropsType) => {

//     const onChangeCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
//         props.onChange(event)
//     }

//     return (
//         <input type={props.type} value={props.value} onChange={onChangeCallback}/>
//     )
// }


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