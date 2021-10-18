import React from 'react'
import { Link, } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'
import useSelectoresActivos from 'hooks/useSelectoresActivos';




const Sidebar = () => {
    return (
        <nav className='w-72 border border-black h-full flex flex-col bg-gray-200 p-4'>
            <Link to='/admin'>
                <ImagenLogo/>
            </Link>
            <div className='my-4'>
                <Boton icono='fas fa-file-invoice' ruta='/admin/ventas' nombre='Ventas' />
                <Boton icono='fas fa-cubes' ruta='/admin/productos' nombre= 'Productos' />
                <Boton icono='fas fa-user-tie' ruta= '/admin/usuarios' nombre = 'Usuarios'/>
            </div>
            <Boton icono='fas fa-door-closed' ruta= '/index' nombre = 'Salir'/>
        </nav>
    );
};
const Boton = ({ icono, ruta, nombre}) =>{

    // este variable Muestra el boton como activo
    const isActive = useSelectoresActivos(ruta);
    
    return(
        <Link to={ruta}>
            
            <button 
            className={`p-2 my-2 w-full 
            flex items-center hover:bg-yellow-500 text-white rounded-xl
            bg-${isActive ? 'yellow' : 'gray'}-700  `}>


            <i class={`${icono} w-10 pr-1` }/>
                {nombre}
            </button>
        </Link>
    )
} 

export default Sidebar