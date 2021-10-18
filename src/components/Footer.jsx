import React from 'react'

const Footer = () => {
    return (
        <nav className='text-white bg-gray-900 border-t border-gray-700'>
            <ul className='flex justify-center border-b border-gray-700'>
                <li className='font-semibold p-4'>Siguenos en:</li>
                <li><button className='font-semibold hover:text-blue-700 p-4'>Facebook</button></li>
                <li><button className='font-semibold hover:text-pink-600 p-4'>Instagram</button></li>
                <li><button className='font-semibold hover:text-blue-400 p-4'>Twitter</button></li>
            </ul>
        </nav>
    )
}

export default Footer
