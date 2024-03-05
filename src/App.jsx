import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Temp from './pages/Temp.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Temp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
