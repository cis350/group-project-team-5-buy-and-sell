import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <AnimatePresence>
      <Routes>
      <Route path ='/' element={<Home />}/>
   </Routes>
      </AnimatePresence>
  ) 
}

export default App;
