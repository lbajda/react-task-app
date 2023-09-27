import React, { useEffect } from 'react'

function BodyClasses() {
    useEffect(() => {
        document.body.classList.add('bg-white', 'dark:bg-gray-800')
        return () => {
            document.body.classList.remove('bg-white', 'dark:bg-gray-800')
        }
    }, [])

    return null
}

export default BodyClasses
