import React, { useEffect } from 'react'

function BodyClasses() {
  useEffect(() => {
    document.body.classList.add('bg-white', 'dark:bg-slate-900')
    return () => {
      document.body.classList.remove('bg-white', 'dark:bg-slate-900')
    }
  }, [])

  return null
}

export default BodyClasses
