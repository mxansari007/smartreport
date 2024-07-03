// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Button } from './components/ui/button'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Suspense } from 'react';
import React from 'react';
import LoadingPage from './components/LoadingPage.jsx';

const Report = React.lazy(() => import('./pages/Report.jsx'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TestPage = React.lazy(() => import('./pages/TestPage.jsx'));
const DisplayTest = React.lazy(() => import('./pages/DisplayTest.jsx'));
import Navbar from './components/Navbar.jsx';


const ManagerLogin = React.lazy(() => import('./pages/Manager/Login.jsx'));
const ManagerDashboard = React.lazy(() => import('./pages/Manager/Dashboard.jsx'));
const CreateTest = React.lazy(() => import('./pages/Manager/Test.jsx'));
const ManagerLab = React.lazy(() => import('./pages/Manager/Lab.jsx'));
const ManagerAdmin  = React.lazy(() => import('./pages/Manager/ManageAdmin.jsx'));
const LandingPage = React.lazy(() => import('./pages/Common/LandingPage.jsx'));


function App() {
  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        
        <Route path='/' element={<Suspense 
          fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>} />
        
        <Route path="/report" element={<Suspense fallback={<LoadingPage />}>
          <Report />
        </Suspense>} />

        <Route path="/dashboard" element={<Suspense fallback={<LoadingPage />}>
          <Dashboard />
        </Suspense>} />
        
        <Route path="/test" element={<Suspense fallback={<LoadingPage/>}>
          <TestPage />
        </Suspense>} />

        <Route path="/disTest" element={<Suspense fallback={<LoadingPage />}>
          <DisplayTest />
        </Suspense>} />

        <Route path="/manager" element={<Suspense fallback={<LoadingPage/>}>
          <ManagerLogin />
        </Suspense>} />

        <Route path="/manager/dashboard" element={<Suspense fallback={<LoadingPage />}>
          <ManagerDashboard />
        </Suspense>} />

        <Route path="/manager/tests" element={<Suspense fallback={<LoadingPage />}>
          <CreateTest />
        </Suspense>} />
      
        <Route path="/manager/labs" element={<Suspense fallback={<LoadingPage />}>
          <ManagerLab />
        </Suspense>} />


          <Route path="/manager/labadmin" element={<Suspense fallback={<LoadingPage />}>
          <ManagerAdmin />
        </Suspense>} /> 
        
        <Route path="/landing" element={<Suspense fallback={<LoadingPage />}>
          <LandingPage />
        </Suspense>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
