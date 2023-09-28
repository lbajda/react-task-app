import React from 'react'

function PageTitle({ children, ...rest }) {
  return (
    <h1
      className='text-5xl lg:text-6xl font-bold text-center mt-8 mb-6 text-gray-800 dark:text-gray-100'
      {...rest}>
      {children}
    </h1>
  )
}

export default PageTitle
