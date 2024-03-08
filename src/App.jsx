import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Temp from './pages/Temp.jsx'
import Report from './pages/Report.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Temp />} />
          <Route path='/Report' element={<Report />} />
        <Route path="/" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
