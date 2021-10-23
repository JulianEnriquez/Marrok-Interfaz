import React from 'react'

function TarjetasProuctos({imagen, nombreProducto}) {
    return (
        <li>
            <div className='border border-gray-900'>
                <div className='w-72'>
                    <img src={imagen} alt={nombreProducto} />    
                </div>
                <div className='bg-gray-200 text-left p-2 text-lg'>
                    <h5 className='font-semibold'>Botas en Cuero</h5>
                    <p>Botas hechas en piel de caiman</p>
                </div>
            </div>
        </li>
    )
}

export default TarjetasProuctos
