import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Order from './Pages/Order'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer/>
      <Order/>
    </>
  )
}

export default App
