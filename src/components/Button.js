import React from 'react'

const variantClasses = {
  gray: 'bg-gray-100 text-gray-500 hover:text-white hover:bg-gray-500 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-300 dark:text-white',
  indigo:
    'bg-indigo-100 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-white dark:focus:ring-indigo-300',
  red: 'bg-red-100 text-red-500 hover:text-red-700 hover:bg-red-200 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white dark:focus:ring-red-300',
}

function Button({
  variant = 'gray',
  extraClassName = '',
  children,
  type,
  ...rest
}) {
  const className = variantClasses[variant]

  return (
    <button
      // className={`px-5 py-2.5 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-medium text-base outline-none focus:outline-none focus:ring-4 focus:ring-opacity-70 transition-all duration-300 ${className} ${extraClassName}`}
      className={`btn ${className} ${extraClassName}`}
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
