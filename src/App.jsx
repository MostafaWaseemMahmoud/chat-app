import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IoReturnUpBack } from 'react-icons/io5'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
