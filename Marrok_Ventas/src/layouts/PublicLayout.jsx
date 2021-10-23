import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React from 'react'

const PublicLayout = ({children}) => {
    const styleButton = 'font-semibold hover:bg-gray-400 p-4';
    return (
        <div className='overflow-x-hidden flex flex-col justify-between h-screen'>
            <h1 className={'text-center text-6xl font-extrabold m-4'}>Marrok King</h1>
            <Navbar/>
            <nav className='bg-gray-300'>
                <ul className='flex justify-center border-b border-gray-700'>
                    <li className='px-1 '>
                        <button className={styleButton}>Novedades</button>
                    </li>
                    <li className='px-1'>
                        <button className={styleButton}>Hombres</button>
                    </li>
                    <li className='px-1'>
                        <button className='font-semibold hover:bg-gray-400 p-4'>Mujeres</button>
                    </li>
                    <li className='px-1'>
                        <button className='font-semibold hover:bg-gray-400 p-4'>Niños</button>
                    </li>
                    <li className='px-1'>
                        <button className='font-semibold hover:bg-gray-400 p-4'>Ofertas</button>
                    </li>
                </ul>
            </nav>
            <main className='h-full overflow-y-scroll bg-white'>{children}</main>
            <Footer/>

        </div>
    )
}

export default PublicLayout;
