import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Registro = () => {

        const form = useRef(null);
    
        const submitForm = async(e) =>{
            e.preventDefault();
            const fd = new FormData(form.current);
            const nuevoUsuario = {};
            fd.forEach((value, key) =>{
                nuevoUsuario[key] = value;
            });
    
            const options = {
                 method: 'POST',
                 url: 'http://localhost:5050/usuario/nuevo',
                 headers: { 'Content-Type': 'application/json' },
                 data: {documento: nuevoUsuario.documento, numero:nuevoUsuario.numero, nombre:nuevoUsuario.nombre,
                     apellido:nuevoUsuario.apellido},
                };
    
            await axios
            .request(options)
            .then(function (response) {
               console.log(response.data);
               toast.success('Vehículo agregado con éxito');
            })
            .catch(function (error) {
               console.error(error);
               toast.error('Error creando un vehículo');
            });
            // setProductos([...listaProductos, nuevoUsuario]);
            // toast.success('Exito');
        };
    return (
        <div className='flex min-h-screen'>
            
            <div className='flex bg-red-200 w-1/2'>
                <div className='container mt-20 mr-15 ml-15 mb-20'>
                    <div className='flex justify-center p-2 mt-40 text-4xl font-extrabold text-center'>Have an Account</div>
                        <div className='flex justify-center p-2'>
                            <Link to='/Login'>
                            <button className='border-none font-bold bg-gray-600 rounded-full py-2 px-10  text-white hover:bg-white hover:text-red-600'>Login</button>
                            </Link>
                        </div>
                </div>
            </div>

            <div className='flex bg-gray-200 w-1/2'>

                <div className='container mt-20  mb-20'>

                <div className= 'text-4xl font-extrabold text-center mb-10'>
                    <h1>Signup</h1>
                </div>
                    
                    <form ref={form} onSubmit={submitForm} className='' > 
                        <div className='flex flex-col '>


                            
                            <div className='flex justify-center mb-4 mr-15 ml-15'>
                            <select name='documento' className="w-80 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none  "required>
                                <option value="value1">Tarjeta de identidad</option>
                                <option value="value2" selected>Cedula de ciudadania</option>
                                <option value="value3">Pasaporte</option>
                            </select>
                            </div>

                            <div className='flex justify-center mb-4'>
                            <input name='numero' type="text" placeholder="Number" className="w-80 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none  "required/>
                            </div>

                            <div className="flex justify-center mb-4">
                                <input name='nombre' type="text" placeholder="FirstName" className="w-21 px-2 py-2 mr-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none  "required/>
                                <input name='apellido' type="text" placeholder="LastName" className="w-21 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm border-none shadow outline-none  "required/>
                            </div>

                            <div className='flex justify-center mb-4'>
                                <input name='correo' className="w-80 px-2 py-2  placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none  " type="email" placeholder='E-mail' required/>
                            </div>

                            <div className='flex justify-center mb-4'>
                                <input name='contrasena' className="w-80 px-2 py-2 placeholder-blueGray-300 text-blueGray-600  bg-white  rounded text-sm border-none shadow outline-none  " type="password" placeholder='Password' required/>
                            </div>
                        </div>
    
                        <div className='flex justify-center mt-2 p-2'>
                            <div className='px-2'>
                                
                                <button className='border-none font-bold bg-gray-500 rounded-full py-2 px-5 text-white hover:bg-white hover:text-blue-700' type='submit'>Register</button>
                              
                            </div>
                        </div>
                        

                        
                    </form>
                </div>
            </div>

            
        </div>
    );
};

export default Registro;
