import React from 'react'
import { Toaster } from 'react-hot-toast'
import AppContent from './components/AppContent'
import AppHeader from './components/AppHeader'
import PageTitle from './components/PageTitle'
import styles from './styles/modules/app.module.scss'
import ThemeToggle from './app/ThemeToggle'

function App() {
  return (
    <>
      <div className='container px-4 lg:px-8 mx-auto '>
        <ThemeToggle />
        <PageTitle>TODO List</PageTitle>
        <div className='w-full mx-auto'>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  )
}

export default App
