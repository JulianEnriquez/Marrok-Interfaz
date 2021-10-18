import TarjetasProuctos from 'components/TarjetasProuctos'
import React from 'react'
import zapatos from 'media/zapatos.jpg'
import zapatos1 from 'media/zapatos1.jpg'
import zapatos4 from 'media/zapatos4.jpg'
import zapatos6 from 'media/zapatos6.jpg'

const Index = () => {
    return (
        <div>
            <ul className='flex justify-between m-10'>
                <TarjetasProuctos imagen={zapatos} nombreProducto='zapatos'/>
                <TarjetasProuctos imagen={zapatos1} nombreProducto='zapatos1'/>
                <TarjetasProuctos imagen={zapatos4} nombreProducto='zapatos2'/>
                <TarjetasProuctos imagen={zapatos6} nombreProducto='zapatos3'/>
            </ul>
            <ul className='flex justify-between m-10'>
                <TarjetasProuctos imagen={zapatos} nombreProducto='zapatos'/>
                <TarjetasProuctos imagen={zapatos1} nombreProducto='zapatos1'/>
                <TarjetasProuctos imagen={zapatos4} nombreProducto='zapatos2'/>
                <TarjetasProuctos imagen={zapatos6} nombreProducto='zapatos3'/>
            </ul>
            <ul className='flex justify-between m-10'>
                <TarjetasProuctos imagen={zapatos} nombreProducto='zapatos'/>
                <TarjetasProuctos imagen={zapatos1} nombreProducto='zapatos1'/>
                <TarjetasProuctos imagen={zapatos4} nombreProducto='zapatos2'/>
                <TarjetasProuctos imagen={zapatos6} nombreProducto='zapatos3'/>
            </ul>
        </div>
    )
}

export default Index
