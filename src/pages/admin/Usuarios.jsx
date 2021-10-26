import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import {Tooltip , Dialog} from '@material-ui/core';



const Usuarios = () => {
    const[mostrarTabla, setMostarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Agregar Nuevo Usuario');
    const [colorBoton, setColorBoton] = useState('indigo');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    const obtenerUsuarios = async () => {
        const options = {method: 'GET', url: 'https://arcane-tundra-28953.herokuapp.com/usuarios/'}
        await axios
        .request(options)
        .then(function (response){
            setUsuarios(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
        setEjecutarConsulta(false);
    };

    useEffect(() => {
        console.log('consulta',ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerUsuarios();
            setEjecutarConsulta(false);
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de usuarios desde el back
        if (mostrarTabla){
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);
    
    useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Agregar Nuevo Usuario');
          setColorBoton('indigo');
        } else {
          setTextoBoton('Mostrar Todos los Usuarios');
          setColorBoton('green');
        }
      }, [mostrarTabla]);
    
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-5xl font-extrabol text-yellow-600 text-center italic'>
                    Administracion de Usuarios
                </h2>
                <button onClick={() => {
                    setMostarTabla(!mostrarTabla);
                }}
                className ={`text-white bg-${colorBoton}-500 p-2 rounded-2xl m-6  self-end`}
                >
                   {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
                <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/>
            ): (
                <FormularioAgregarUsuario 
                setMostarTabla={setMostarTabla}
                listaUsuarios={usuarios}
                setUsuarios ={setUsuarios}/>
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
            />

        </div>
    );
};

const TablaUsuarios = ({listaUsuarios, setEjecutarConsulta}) => {
    //filtro de busqueda
    const[busqueda,setBusqueda] = useState('');
    const[usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

    useEffect(()=>{
        setUsuariosFiltrados(
            listaUsuarios.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
                //busqueda general por medio de id, categoria, estilo, fecha, precio...
                
            })
        );
    },[busqueda, listaUsuarios])

    //----------------- Termina Busqueda ----------------
    return (
        <div className= 'flex flex-col items-center justify-center w-full'>
            <input
                value = {busqueda}
                onChange = {(e) => setBusqueda(e.target.value)} 
                placeholder='Buscar usuarios' 
                className='border-2 border-gray-800 rounded-md px-2 py-1 self-start focus:outline-none focus:border-blue-500' 
            />
            <h2> Todos los Usuarios</h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario)=>{
                            return(
                                <FilaUsuarios key={nanoid()} usuario={usuario} setEjecutarConsulta ={setEjecutarConsulta}/>
                            );
                        })}
                    </tbody>
                </table>
            
        </div>
    );
};

const FilaUsuarios =({usuario , setEjecutarConsulta}) =>{
    console.log('usuario', usuario._id);
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] =useState(false);
    const [infoNuevoUsuario, setInfoNuevaVenta] = useState({
        nombre: usuario.nombre,
        idUsuario: usuario.idUsuario,
        rol: usuario.rol,
        estado: usuario.estado,
        fechaCreacion: usuario.fechaCreacion
        
    });

    const actualizarUsuario = async () => {
        console.log(infoNuevoUsuario);
        //enviar la info al backend
        const options = {
          method: 'PATCH',
          url: `https://arcane-tundra-28953.herokuapp.com/usuarios/${usuario._id}/`,
          headers: { 'Content-Type': 'application/json' },
          data: { ...infoNuevoUsuario},
        };
    
        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Usuario modificado con éxito');
            setEdit(false);
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            toast.error('Error modificando al usuario');
            console.error(error);
          });
    };

    const eliminarUsuario = async()=>{
        const options = {
            method: 'DELETE',
            url: 'https://arcane-tundra-28953.herokuapp.com/usuarios/:id/',
            headers: {'Content-Type': 'application/json'},
            data: {id :usuario._id}
          };
          
          await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('usuario eliminada exitosamente')
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            console.error(error);
            toast.error('error eliminando usuario')
          });
    }

    return(
        <tr>
            {edit ?
                <>
                    <td> {usuario.idUsuario}
                    </td>
                    <td>{usuario.nombre}</td>
                    {/* <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevoUsuario.nombre}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevoUsuario, nombre: e.target.value})}/>
                    </td> */}
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevoUsuario.rol}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevoUsuario, rol: e.target.value})} /> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevoUsuario.estado}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevoUsuario, estado: e.target.value})}/> 
                    </td>
                    <td>{usuario.fechaCreacion}</td>
                    {/* <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="date" value={infoNuevoUsuario.fechaCreacion}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevoUsuario, fechaCreacion: e.target.value})}/>
                    </td> */}
                </>
                :
                <>
                    <td>{usuario.idUsuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.estado}</td>
                    <td>{usuario.fechaCreacion}</td>

                </>
            }
            <td>
                <div className='flex w-full justify-around' >
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar actualización'arrow>
                                <i onClick={()=> actualizarUsuario()}
                                className='fas fa-check text-green-700 hover:text-green-400'
                                />   
                            </Tooltip>
                            <Tooltip title='Cancelar'arrow>
                                <i onClick={()=> setEdit(!edit)}
                                className='fas fa-times-circle text-red-900 hover:text-red-600'
                                />   
                            </Tooltip>
                            
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar Usuario' arrow>
                                <i onClick={() => setEdit(!edit)} 
                                className='fas fa-pencil-alt text-yellow-900 hover:text-yellow-400'
                                />

                            </Tooltip>
                            <Tooltip title='Eliminar Usuario' arrow>
                                <i  onClick ={()=> setOpenDialog(true)} 
                                className= 'fas fa-trash-alt hover:text-red-600' />

                            </Tooltip>
                        </>
                    )}
                </div>
                    <div>
                        <Dialog open={openDialog}>
                            <div className='p-10 rounded-sm bg-gray-800 text-white flex flex-col'>
                                <div className ='pb-4'>
                                    <h1 className='font-semibold'>¿Quieres eliminar este usuario?</h1>
                                </div>

                                <div className='absolute bottom-2 right-2'>
                                    <button className='px-8 py-1 mr-1 bg-gray-800 rounded-sm hover:bg-green-500 hover:bg-opacity-25' 
                                    onClick={()=> eliminarUsuario()}>
                                        Si      
                                    </button>
                                    <button className='px-8 py-1 ml-1 bg-gray-800 rounded-sm hover:bg-red-500 hover:bg-opacity-25' 
                                    onClick={()=> setOpenDialog(false)}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </Dialog>
                    </div>
            </td>
        </tr>
    );
};

const FormularioAgregarUsuario = ({setMostarTabla, listaUsuarios ,setProductos}) => {
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
             url: 'https://arcane-tundra-28953.herokuapp.com/usuarios',
             headers: { 'Content-Type': 'application/json' },
             data: {...nuevoUsuario, idUsuario: nuevoUsuario.idUsuario},
            };

        await axios
        .request(options)
        .then(function (response) {
           console.log(response.data);
           toast.success('Usuario agregado con éxito');
        })
        .catch(function (error) {
           console.error(error);
           toast.error('Error creando un usuario');
        });

        setMostarTabla(true);
        // setProductos([...listaUsuarios, nuevoUsuario]);
        // toast.success('Exito');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='p-4 font-sans text-3xl'>Agregar nuevo usuario</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor="idUsuario">
                    Documento
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='idUsuario' type="number" placeholder='Documento' min={0} required />
                </label>
                <label className='flex flex-col' htmlFor="nombre">
                    Nombre
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='nombre' type="text" placeholder='Nombre' min={0} required />
                </label>
                <label className='flex flex-col'htmlFor="rol">
                    Rol
                    <select name="rol" required defaultValue={0}>
                        <option disabled value={0}>Selecciona un rol</option>
                        <option >Administrador</option>
                        <option >Vendedor</option>
                    </select>
                </label>
                <label className='flex flex-col'htmlFor="estado">
                    Estado
                    <select name="estado" required defaultValue={0}>
                        <option disabled value={0}>Selecciona un estado</option>
                        <option >Activo</option>
                        <option >Inactivo</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor="fechaCreacion">
                    Fecha de Creación
                    <input className=' border-gray-900 w-full p-1 rounded-lg' name='fechaCreacion' type="date" required />
                </label>
                

                <button 
                type='submit' 
                className='mt-10 col-span-2 bg-green-500 p-2 rounded-lg shadow-md hover:bg-green-900 text-white'
                > 
                    Crear Usuario
                </button>
            </form>
        </div>
    );
};

export default Usuarios;
