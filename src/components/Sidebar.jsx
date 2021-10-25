import React from 'react'
import { Link, } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'
import useSelectoresActivos from 'hooks/useSelectoresActivos';
import { useAuth0 } from "@auth0/auth0-react";




const Sidebar = () => {
    const { logout } = useAuth0();
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
            <button onClick={() => logout({ returnTo: window.location.origin })} className='p-2 mt-20 w-full flex items-center bg-gray-700 text-white rounded-xl hover:bg-yellow-500'><i className='fas fa-door-open px-2'/>Cerrar Sesión</button>
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