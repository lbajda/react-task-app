import { motion, useMotionValue, useTransform } from 'framer-motion'
import React from 'react'
import styles from '../styles/modules/todoItem.module.scss'

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
}

const boxVariants = {
  checked: {
    background: '#4f46e5',
    transition: { duration: 0.1 },
  },
  unchecked: { background: '#e2e8f0', transition: { duration: 0.1 } },
}

function CheckButton({ checked, handleCheck }) {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className='rounded-md w-6 h-6 flex items-center justify-center cursor-pointer p-[5px] transition-colors outline-none !bg-slate-200 aria-checked:!bg-indigo-600 dark:!bg-slate-400 dark:aria-checked:!bg-indigo-600 focus:ring-4 focus:ring-slate-300 aria-checked:focus:ring-indigo-300 focus:ring-opacity-75 focus:outline-none'
      variants={boxVariants}
      role='checkbox'
      aria-checked={checked}
      tabIndex='0'
      onClick={() => handleCheck()}>
      <motion.svg
        className='w-full h-full stroke-white flex items-center justify-center'
        viewBox='0 0 53 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill='none'
          strokeMiterlimit='10'
          strokeWidth='6'
          d='M1.5 22L16 36.5L51.5 1'
          strokeLinejoin='round'
          strokeLinecap='round'
        />
      </motion.svg>
    </motion.div>
  )
}

export default CheckButton
