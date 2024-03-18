// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Button } from './components/ui/button'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Temp from './pages/Temp.jsx'
import Report from './pages/Report.jsx'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TestPage from './pages/TestPage.jsx'
import DisplayTest from './pages/DisplayTest.jsx';
import Navbar from './components/Navbar.jsx';
// import Cart from './pages/cart.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/Report' element={<Report />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Test" element={<TestPage/>} />
        <Route path="/DisTest" element={<DisplayTest/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
