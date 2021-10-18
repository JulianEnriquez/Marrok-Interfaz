import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className=' bg-gray-900'>
            <ul className='flex w-full justify-end m-2'>
                <Link to='/login'>
                    <li className='text-white px-4'>
                        <button className='p-2 rounded-lg border-2 border-white hover:border-green-500 hover:text-green-500'>Iniciar Sesion</button>
                    </li>
                </Link>
                <li className='text-white px-4'>
                    <button className='p-2 rounded-lg border-2 border-white hover:border-green-500 hover:text-green-500'>Nosotros</button>
                </li>
                <li className='text-white px-4'>
                    <button className='p-2 rounded-lg border-2 border-white hover:border-green-500 hover:text-green-500'>Ayuda</button>
                </li>
            </ul>
        </nav>  
    )
}

export default Navbar
