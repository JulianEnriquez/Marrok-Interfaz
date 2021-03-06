import Sidebar from 'components/Sidebar'
import React from 'react'

const PrivateLayout = ({children}) => {
    return (

        <div className='flex w-screen h-screen'>
            <Sidebar/>
            <main className = 'flex w-full bg-gray-50 overflow-y-scroll' >{children}</main>
        </div>
    )
}

export default PrivateLayout
