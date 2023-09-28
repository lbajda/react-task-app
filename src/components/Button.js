import React from 'react'

function Button({ className, children, type, ...rest }) {
  return (
    <button
      className={`px-5 py-2.5 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-medium outline-none focus:outline-none focus:ring-2 ring-offset-white focus:ring-offset-2 transition-all duration-300 text-md ${className}`}
      type={type === 'submit' ? 'submit' : 'button'}
      {...rest}>
      {children}
    </button>
  )
}

function SelectButton({ children, ...rest }) {
  return <select {...rest}>{children}</select>
}

export { SelectButton }

export default Button
