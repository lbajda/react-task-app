import { motion, useMotionValue, useTransform } from 'framer-motion'
import React from 'react'

const checkVariants = {
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
}

function CheckButton({ checked, handleCheck }) {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className='rounded-lg w-6 h-6 flex items-center justify-center cursor-pointer p-[5px] transition-all outline-none !bg-white ring-2 hover:ring-3 ring-gray-600 hover:ring-gray-700  focus:outline-none aria-checked:!bg-indigo-500 aria-checked:ring-2 aria-checked:hover:ring-3 aria-checked:ring-indigo-500 dark:!bg-gray-200 dark:aria-checked:!bg-indigo-200 focus:ring-4 focus:ring-gray-300 aria-checked:focus:ring-4 aria-checked:focus:ring-indigo-300 dark:ring-gray-300 duration-200 shrink-0'
      role='checkbox'
      aria-checked={checked}
      tabIndex='0'
      onClick={handleCheck}>
      <motion.svg
        className='w-full h-full stroke-white dark:stroke-indigo-700 flex items-center justify-center'
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
