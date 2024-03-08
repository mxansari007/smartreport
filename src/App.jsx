import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Temp from './pages/Temp.jsx'
import Report from './pages/Report.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Temp />} />
          <Route path='/Report' element={<Report />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
