import React from 'react'
import {Link} from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri';
function Header() {
  return (
    <header className='sticky top-0 min-h-8 w-full mx-auto flex justify-between items-center overflow-hidden p-2'>
      <div>
        <h1 >
          <Link to="/" className='logo'>
            Book Test
          </Link>
        </h1>
      </div>
      <div className="header_links">
        <ul>
          <li>
            <Link to='/cart'> <RiShoppingCartLine size='3em' onClick={()=>setShow(false)}/> <span className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full'>0</span> </Link>
           </li>
        </ul>
      </div>
    </header>
  )
}

export default Header