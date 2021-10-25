import React from 'react'
import { Link } from 'react-router-dom'
import Google from 'components/google';




const datos = (event) =>{
    console.log(event.target.value);
};

const Login = () => {
    return (
        <div className='flex min-h-screen'>
            
            <div className='flex bg-gray-200 w-1/2'>

                <div className='container mt-20 mr-15 ml-15 mb-20'>

                <div className= 'text-4xl font-extrabold text-center mb-10'>
                    <h1>Login</h1>
                </div>
                    
                    <form className='' > 
                        <div className='flex flex-col '>
                            <div className='flex justify-center mb-2 '>
                                <label htmlFor="usuario" className='text-left'>Correo: <br/> 
                                <input  className="w-80 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none" type="email" placeholder='Username' required/>
                                </label>
                            </div>

                            <div className='flex justify-center mb-2'>
                                <label htmlFor="contraseña" className='text-left'>Contraseña: <br/> 
                                <input onChange={datos} className="w-80 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none" type="password" placeholder='Password' required/>
                                </label>
                            </div>
                        </div>
                        

                        <div className='flex flex-row justify-center'>
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

                        <div className='flex justify-center mt-2 p-2'>
                            <div className='px-2'>
                                <Link to='/admin'>
                                <button className='border-none font-bold bg-gray-500 rounded-full py-2 px-5 text-white hover:bg-white hover:text-blue-700' type='submit'>Iniciar sesion</button>
                                </Link>
                            </div>
                        </div>
                        
                        
                        <div className='flex justify-center p-2'>Inicia sesion con Google</div>
                        <Google/> 
                        

                        
                    </form>
                </div>
            </div>

            <div className='flex bg-red-200 w-1/2'>
                <div className='container mt-20 mr-15 ml-15 mb-20'>
                    <div className='flex justify-center p-2 mt-40 text-4xl font-extrabold text-center'>Create Account</div>
                        <div className='flex justify-center p-2'>
                            <Link to='/Registro'>
                            <button className='border-none font-bold bg-gray-600 rounded-full py-2 px-10  text-white hover:bg-white hover:text-red-600'>Signup</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;