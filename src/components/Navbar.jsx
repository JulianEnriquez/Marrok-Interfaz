import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className=' bg-gray-900'>
            <ul className='flex w-full justify-end m-2'>
                <li className='text-white px-4'>
                    <button onClick={() => loginWithRedirect()} className='p-2 rounded-lg border-2 border-white hover:border-green-500 hover:text-green-500'>Iniciar Sesion</button>
                </li>
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
