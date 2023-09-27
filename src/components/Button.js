import React, { Children } from 'react'
import styles from '../styles/modules/button.module.scss'
import { getClasses } from '../utils/getClasses'

const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary',
}

function Button({ children, type, ...rest }) {
    return (
        // <button
        //   className={getClasses([
        //     styles.button,
        //     styles[`button--${buttonTypes[variant]}`],
        //   ])}
        //   type={type === 'submit' ? 'submit' : 'button'}
        //   {...rest}
        // >
        //   {children}
        // </button>
        <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            type={type === 'submit' ? 'submit' : 'button'}
            {...rest}>
            {children}
        </button>
    )
}

function SelectButton({ children, ...rest }) {
    return (
        <select
            className='getClasses([styles.button, styles.button__select])'
            {...rest}>
            {children}
        </select>
    )
}

export { SelectButton }

export default Button
