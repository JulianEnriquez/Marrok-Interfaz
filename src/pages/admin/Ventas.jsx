import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import {Tooltip , Dialog} from '@material-ui/core';



const Ventas = () => {
    const[mostrarTabla, setMostarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Agregar Nueva Venta');
    const [colorBoton, setColorBoton] = useState('indigo');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    const obtenerProductos = async () => {
        const options = {method: 'GET', url: 'http://localhost:5050/ventas'}
        await axios
        .request(options)
        .then(function (response){
            setVentas(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
        setEjecutarConsulta(false);
    };

    useEffect(() => {
        console.log('consulta',ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProductos();
            setEjecutarConsulta(false);
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de ventas desde el back
        if (mostrarTabla){
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);
    
    useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Agregar Nueva Venta');
          setColorBoton('indigo');
        } else {
          setTextoBoton('Mostrar Todas las Ventas');
          setColorBoton('green');
        }
      }, [mostrarTabla]);
    
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-5xl font-extrabol text-yellow-600 text-center italic'>
                    Administracion de Ventas
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
                <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta}/>
            ): (
                <FormularioAgregarProducto 
                setMostarTabla={setMostarTabla}
                listaVentas={ventas}
                setVentas ={setVentas}/>
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
            />

        </div>
    );
};

const TablaVentas = ({listaVentas, setEjecutarConsulta}) => {
    //filtro de busqueda
    const[busqueda,setBusqueda] = useState('');
    const[ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

    useEffect(()=>{
        setVentasFiltradas(
            listaVentas.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
                //busqueda general por medio de id, categoria, estilo, fecha, precio...
                
            })
        );
    },[busqueda, listaVentas])

    //----------------- Termina Busqueda ----------------
    // useEffect(()=>{
    //     //console.log('este es el listado de ventas', listaVentas);
    // },[listaVentas]);

    return (
        <div className= 'flex flex-col items-center justify-center w-full'>
            <input
                value = {busqueda}
                onChange = {(e) => setBusqueda(e.target.value)} 
                placeholder='Buscar ventas' 
                className='border-2 border-gray-800 rounded-md px-2 py-1 self-start focus:outline-none focus:border-blue-500' 
            />
            <h2> Todas las ventas</h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Fecha Venta</th>
                        <th>No. Factura</th>
                        <th>Vendedor</th>
                        <th>Id Vendedor</th>
                        <th>Nombre del Cliente</th>
                        <th>Documento Cliente</th>
                        <th>Descripción Producto</th>
                        <th>Unidades</th>
                        <th>Precio Unitario</th>
                        <th>Total Venta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    <tbody>
                        {ventasFiltradas.map((venta)=>{
                            return(
                                <FilaVentas key={nanoid()} venta={venta} setEjecutarConsulta ={setEjecutarConsulta}/>
                            );
                        })}
                    </tbody>
                </table>
            
        </div>
    );
};

const FilaVentas =({venta , setEjecutarConsulta}) =>{
    console.log('venta', venta._id);
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] =useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        noFactura: venta.noFactura,
        fechaVenta : venta.fechaVenta,
        vendedor: venta.vendedor,
        idVendedor: venta.idVendedor,
        nombreCliente: venta.nombreCliente,
        idCliente: venta.idCliente,
        descripcionProducto: venta.desProducto,
        unidades: venta.unidades,
        precioUnitario: venta.precioUnitario,
        totalVenta: venta.totalVenta,
        
    });

    const actualizarVenta = async () => {
        console.log(infoNuevaVenta);
        //enviar la info al backend
        const options = {
          method: 'PATCH',
          url: `http://localhost:5050/ventas/${venta._id}/`,
          headers: { 'Content-Type': 'application/json' },
          data: { ...infoNuevaVenta},
        };
    
        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Producto modificado con éxito');
            setEdit(false);
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            toast.error('Error modificando la venta');
            console.error(error);
          });
    };

    const eliminarVenta = async()=>{
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5050/ventas/:id',
            headers: {'Content-Type': 'application/json'},
            data: {id :venta._id}
          };
          
          await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('venta eliminada exitosamente')
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            console.error(error);
            toast.error('error eliminando venta')
          });
    }

    return(
        <tr>
            {edit ?
                <>
                    <td> {venta.noFactura}
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="date" value={infoNuevaVenta.fechaVenta}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, fechaVenta: e.target.value})}/>
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevaVenta.vendedor}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, vendedor: e.target.value})} /> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="number" value={infoNuevaVenta.idVendedor}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, idVendedor: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevaVenta.nombreCliente}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, nombreCliente: e.target.value})}/>
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="number" value={infoNuevaVenta.idCliente}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, idCliente: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="text" value={infoNuevaVenta.descripcionProducto}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, descripcionProducto: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="number" value={infoNuevaVenta.unidades}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, unidades: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="number" value={infoNuevaVenta.precioUnitario}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, precioUnitario: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full p-1 rounded-lg focus:outline-none'
                     type="number" value={infoNuevaVenta.totalVenta}
                     onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, totalVenta: e.target.value})}/> 
                    </td>
                </>
                :
                <>
                    <td>{venta.noFactura}</td>
                    <td>{venta.fechaVenta}</td>
                    <td>{venta.vendedor}</td>
                    <td>{venta.idVendedor}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.idCliente}</td>
                    <td>{venta.desProducto}</td>
                    <td>{venta.unidades}</td>
                    <td>{venta.precioUnitario}</td>
                    <td>{venta.totalVenta}</td>

                </>
            }
            <td>
                <div className='flex w-full justify-around' >
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar actualización'arrow>
                                <i onClick={()=> actualizarVenta()}
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
                            <Tooltip title='Editar venta' arrow>
                                <i onClick={() => setEdit(!edit)} 
                                className='fas fa-pencil-alt text-yellow-900 hover:text-yellow-400'
                                />

                            </Tooltip>
                            <Tooltip title='Eliminar venta' arrow>
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
                                    <h1 className='font-semibold'>¿Quieres eliminar este venta?</h1>
                                </div>

                                <div className='absolute bottom-2 right-2'>
                                    <button className='px-8 py-1 mr-1 bg-gray-800 rounded-sm hover:bg-green-500 hover:bg-opacity-25' 
                                    onClick={()=> eliminarVenta()}>
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

const FormularioAgregarProducto = ({setMostarTabla, listaVentas ,setProductos}) => {
    const form = useRef(null);
    
    const submitForm = async(e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevaVenta = {};
        fd.forEach((value, key) =>{
            nuevaVenta[key] = value;
        });

        const options = {
             method: 'POST',
             url: 'http://localhost:5050/ventas',
             headers: { 'Content-Type': 'application/json' },
             data: {...nuevaVenta, noFactura: nuevaVenta.noFactura},
            };

        await axios
        .request(options)
        .then(function (response) {
           console.log(response.data);
           toast.success('Venta agregada con éxito');
        })
        .catch(function (error) {
           console.error(error);
           toast.error('Error creando una venta');
        });

        setMostarTabla(true);
        // setProductos([...listaVentas, nuevaVenta]);
        // toast.success('Exito');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2>Agregar nueva venta</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor="noFactura">
                    Numero de Factura
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='noFactura' type="number" placeholder='id' min={0} required />
                </label>
                <label className='flex flex-col' htmlFor="vendedor">
                    Vendedor
                    <select name="vendedor" required defaultValue={0}>
                        <option disabled value={0}>Seleccione el vendedor</option>
                        <option>Andres C</option>
                        <option>Carlos M</option>
                        <option>Carol G</option>
                        <option>Tatiana H</option>
                    </select>
                </label>
                <label className='flex flex-col'htmlFor="idVendedor">
                    Id Vendedor
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='idVendedor' placeholder='id vendedor' type="number" required/>
                </label>
                <label className='flex flex-col' htmlFor="cliente">
                    Nombre Cliente
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='nombreCliente' placeholder='nombre cliente' type="text" required/>
                </label>
                <label className='flex flex-col' htmlFor="existencias">
                    Documento del Cliente
                    <input className=' border-gray-900 w-full p-1 rounded-lg' name='idCliente' type="number" min='0' placeholder='0' required/>
                </label>
                <label className='flex flex-col' htmlFor="productos">
                    Descripcion Producto
                    <select name="desProducto" required defaultValue={0}>
                        <option disabled value={0}>Seleccione un producto</option>
                        <option>Accesorios</option>
                        <option>Calzado</option>
                        <option>Ropa Mujer</option>
                        <option>Ropa Hombre</option>
                        <option>Niño</option>
                    </select>

                </label>
                <label className='flex flex-col' htmlFor="cantidad">
                    Cantidad
                    <input className='border-gray-900 w-full p-1 rounded-lg' name='unidades' type="number" min='0' placeholder='0' required/>
                </label>
                <label className='flex flex-col' htmlFor="valorUnitario">
                    Precio Unitario
                    <input className=' border-gray-900 w-full p-1 rounded-lg' name='precioUnitario' type="number" min='0' placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="valorTotal">
                    Total de la Venta
                    <input className=' border-gray-900 w-full p-1 rounded-lg' name='totalVenta' type="number" min='0' placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="fechaIngresoVenta">
                    Fecha de la Venta
                    <input className=' border-gray-900 w-full p-1 rounded-lg' name='fechaVenta' type="date" required/>
                </label>
                

                <button 
                type='submit' 
                className='mt-10 col-span-2 bg-green-500 p-2 rounded-lg shadow-md hover:bg-green-900 text-white'
                > 
                    Guardar Venta
                </button>
            </form>
        </div>
    );
};

export default Ventas;
