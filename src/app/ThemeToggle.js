// ThemeToggle.js

import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const preference = window.localStorage.getItem('theme')
    if (preference) {
      return preference === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      window.localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className='flex items-center justify-end mt-8'>
      <span className='mr-3 text-sm font-medium text-gray-800 dark:text-gray-100'>
        Dark Mode
      </span>
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={`${
          darkMode
            ? 'bg-indigo-200 focus:ring-indigo-300 hover:bg-indigo-300'
            : 'bg-indigo-500 focus:ring-indigo-300 hover:bg-indigo-700'
        } relative inline-flex items-center h-6 rounded-full w-11 outline-none focus:outline-none focus:ring-4 focus:!ring-opacity-70 transition-all duration-300`}>
        <span className='sr-only'>Toggle Dark Mode</span>
        <span
          className={`${
            darkMode
              ? 'translate-x-6 bg-indigo-700 hover:bg-indigo-900'
              : 'translate-x-1 bg-white'
          } inline-block w-4 h-4 transform rounded-full`}
        />
      </Switch>
    </div>
  )
}

export default ThemeToggle
