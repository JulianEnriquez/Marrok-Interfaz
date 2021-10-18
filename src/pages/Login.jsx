import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='flex'>
            <div className='h-screen bg-gray-200 w-1/2 '>
                <div className= 'text-5xl font-extrabold text-center mt-60'>
                    <h1>Iniciar sesion con tu cuenta</h1>
                </div>
                <div className='flex justify-center mt-16'>
                    <form > 
                        <div className='flex flex-col '>
                            <div className='flex justify-center mb-2'>
                                <label htmlFor="usuario" className='text-left'>Correo: <br/> 
                                <input className='w-72 p-2' type="email" placeholder='ejemplo@gmail.com' required/>
                                </label>
                            </div>

                            <div className='flex justify-center mb-2'>
                                <label htmlFor="contraseña" className='text-left'>Contraseña: <br/> 
                                <input className='w-72 p-2' type="password" placeholder='contraseña' required/>
                                </label>
                            </div>
                        </div>

                        <div className='flex flex-row'>
                            <div className='px-3 '>
                                <label htmlFor="recuerdame">
                                <input type="checkbox" name='recuerdame'/>
                                Recuerdame
                                </label>
                            </div>
                            <div className='px-3'>
                                <Link to='/'>¿Olvidaste tu contraseña?</Link>    
                            </div>
                        </div>

                        <div className='flex justify-center mt-3 p-3'>
                            <div className='px-3'>
                                <Link to='/admin'>
                                <button className='font-bold bg-blue-600 rounded-full py-3 px-6 text-white border-2 border-gray-900 hover:bg-white hover:text-blue-700' type='submit'>Iniciar sesion</button>
                                </Link>
                            </div>
                        </div>
                        
                        <div className='flex justify-center p-3 '>Inicia sesion con Google</div>
                       
                        <div className='flex justify-center p-3'>
                            <Link to='/'>
                            <button className='font-bold bg-red-600 rounded-full py-3 px-12 border-2 border-gray-900 text-white hover:bg-white hover:text-red-600'>Google</button>
                            </Link>
                        </div>

                        
                    </form>
                </div>
            </div>

            <div className='flex bg-red-200 w-1/2'>
                <div className='bg-green-300 container sm:mx-40 sm:my-40'>
                    <h1 className='text-center'>Hola</h1>
                    <p>Bienvenido a Marrok King. 
                        Si aun no tienes una cuenta puedes 
                        crearla aqui o inicia sesion con Goolge.
                        No se escribo algo
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
