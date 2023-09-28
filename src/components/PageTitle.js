import React from 'react'
import style from '../styles/modules/title.module.scss'

function PageTitle({ children, ...rest }) {
  return (
    <h1
      className='text-5xl lg:text-6xl font-bold text-center mt-8 mb-6 text-slate-800 dark:text-slate-200'
      {...rest}>
      {children}
    </h1>
  )
}

export default PageTitle
