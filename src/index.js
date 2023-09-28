import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import BodyClasses from './components/BodyClasses'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './styles/tailwind.css'
import './styles/styles.scss'
import { store } from './app/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <BodyClasses />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
