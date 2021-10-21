import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';


const Productos = () => {
    const[mostrarTabla, setMostarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Agregar Nuevo Producto');
    const [colorBoton, setColorBoton] = useState('indigo');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    const obtenerProductos = async () => {
        const options = {method: 'GET', url: 'http://localhost:5050/productos'}
        await axios
        .request(options)
        .then(function (response){
            setProductos(response.data);
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
        //obtener lista de productos desde el back
        if (mostrarTabla){
            setEjecutarConsulta(true);
        }
      }, [mostrarTabla]);
    
    useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Agregar Nuevo Producto');
          setColorBoton('indigo');
        } else {
          setTextoBoton('Mostrar Todos los productos');
          setColorBoton('green');
        }
      }, [mostrarTabla]);
    
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-5xl font-extrabol text-gray-900'>
                    Administracion de Productos
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
                <TablaPrductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta}/>
            ): (
                <FormularioAgregarProducto 
                setMostarTabla={setMostarTabla}
                listaProductos={productos}
                setProductos ={setProductos}/>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </div>
    );
};



const TablaPrductos = ({listaProductos, setEjecutarConsulta}) => {
    useEffect(()=>{
        //console.log('este es el listado de productos', listaProductos);
    },[listaProductos]);


    return (
        <div className= 'flex flex-col items-center justify-center w-full'>
            <h2> Todos los producto</h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Id Producto</th>
                            <th>Categoria</th>
                            <th>Estilo</th>
                            <th>Existencias</th>
                            <th>Costo de produccion</th>
                            <th>Valor de venta</th>
                            <th>Fecha Ingreso</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.map((producto)=>{
                            return(
                                <FilaProducto key={nanoid()} producto={producto} setEjecutarConsulta ={setEjecutarConsulta}/>
                            );
                        })}
                    </tbody>
                </table>
            
        </div>
    );
};

const FilaProducto =({producto , setEjecutarConsulta}) =>{
    console.log('producto', producto._id)
    const [edit, setEdit] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    
        category : producto.category,
        estilo: producto.estilo,
        existencias : producto.existencias,
        costoProduccion: producto.costoProduccion,
        valorVenta : producto.valorVenta,
        fechaIngreso: producto.fechaIngreso
    });

    const actualizarProducto = async () => {
        console.log(infoNuevoProducto);
        //enviar la info al backend
        const options = {
          method: 'PATCH',
          url: 'http://localhost:5050/productos/editar',
          headers: { 'Content-Type': 'application/json' },
          data: { ...infoNuevoProducto, id: producto._id },
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
            toast.error('Error modificando el producto');
            console.error(error);
          });
    };

    const eliminarProdcuto = async()=>{
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5050/productos/eliminar',
            headers: {'Content-Type': 'application/json'},
            data: {id :producto._id}
          };
          
          await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('producto eliminado exitosamente')
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            console.error(error);
            toast.error('error eliminando producto')
          });
    }

    return(
        <tr>
            {edit ?
                <>
                    <td> {producto.id}
                        {/* <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" value={infoNuevoProducto.id}
                    onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, id: e.target.value})} 
                    />
                    */}
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="text" value={infoNuevoProducto.category}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, category: e.target.value})}/>
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="text" value={infoNuevoProducto.estilo}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, estilo: e.target.value})} /> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="number" value={infoNuevoProducto.existencias}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, existencias: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="number" value={infoNuevoProducto.costoProduccion}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, costoProduccion: e.target.value})}/>
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="number" value={infoNuevoProducto.valorVenta}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, valorVenta: e.target.value})}/> 
                    </td>
                    <td><input className='border-2 border-gray-900 w-full py-2 rounded-lg'
                     type="date" value={infoNuevoProducto.fechaIngreso}
                     onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, fechaIngreso: e.target.value})}/> 
                    </td>
                </>
                :
                <>
                <td>{producto.id}</td>
                <td>{producto.category}</td>
                <td>{producto.estilo}</td>
                <td>{producto.existencias}</td>
                <td>{producto.costoProduccion}</td>
                <td>{producto.valorVenta}</td>
                <td>{producto.fechaIngreso}</td>
                </>
            }
            <td>
                <div className='flex w-full justify-around'>
                    {edit ? (
                        <i onClick={()=> actualizarProducto()}
                        className='fas fa-check text-yellow-700 hover:text-yellow-400'
                        />   
                    ) : (
                        <i onClick={() => setEdit(!edit)} 
                        className='fas fa-pencil-alt text-green-900 hover:text-green-400'
                        />)
                    }
                    <i onClick ={()=> eliminarProdcuto()} 
                    className= 'fas fa-trash-alt text-red-900 hover:text-red-400' />
                </div>
            </td>
        </tr>
    );
};

const FormularioAgregarProducto = ({setMostarTabla, listaProductos ,setProductos}) => {
    const form = useRef(null);
    
    const submitForm = async(e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) =>{
            nuevoProducto[key] = value;
        });

        const options = {
             method: 'POST',
             url: 'http://localhost:5050/productos/nuevo',
             headers: { 'Content-Type': 'application/json' },
             data: {...nuevoProducto, id: nuevoProducto.id},
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

        setMostarTabla(true);
        // setProductos([...listaProductos, nuevoProducto]);
        // toast.success('Exito');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2>Agregar nuevo producto</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor="idProducto">
                    Id Producto
                    <input className='border-gray-900 w-full py-2 rounded-lg' name='id' type="number" placeholder='id' min={0} required />
                </label>
                <label className='flex flex-col' htmlFor="categoria">
                    Categoria
                    <select name="category" required defaultValue={0}>
                        <option disabled value={0}>Seleccione la categoria</option>
                        <option>Calzado</option>
                        <option>Accesorios</option>
                        <option>Ropa Hombre</option>
                        <option>Ropa Mujer</option>
                        <option>Niños</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor="estilo">
                    Estilo
                    <select name="estilo" defaultValue={0} required>
                        <option disabled value={0}>Seleccione un estilo</option>
                        <option>Formal</option>
                        <option>Informal</option>
                        <option>Deportivo</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor="existencias">
                    Existencias
                    <input className=' border-gray-900 w-full py-2 rounded-lg' name='existencias' type="number" min='0' placeholder='0' required/>
                </label>
                <label className='flex flex-col' htmlFor="costoProduccion">
                    Costo de Produccion
                    <input className='border-gray-900 w-full py-2 rounded-lg' name='costoProduccion' type="number" min='0' placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="valorVenta">
                    Valor de Venta
                    <input className=' border-gray-900 w-full py-2 rounded-lg' name='valorVenta' type="number" min='0' placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="fechaIngreso">
                    Fecha de Ingreso
                    <input className=' border-gray-900 w-full py-2 rounded-lg' name='fechaIngreso' type="date" required/>
                </label>

                <button 
                type='submit' 
                className='mt-10 col-span-2 bg-green-500 p-2 rounded-lg shadow-md hover:bg-green-900 text-white'
                > 
                    Guardar Producto
                </button>
            </form>
        </div>
    );
};


export default Productos;
