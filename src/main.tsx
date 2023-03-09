import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import './index.css'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App /> } /> 
        </Routes>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
