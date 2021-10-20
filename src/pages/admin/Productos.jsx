//import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

const productosBackend = [{
    id: "12345",
    category: "calzado",
    estilo: "Deportivo",
    existencias: 10,
    costoProduccion: 900,
    valorVenta: 1800,
    fechaIngreso: "2012-01-01",
},
{id: "12345",
    category: "calzado",
    estilo: "Deportivo",
    existencias: 10,
    costoProduccion: 900,
    valorVenta: 1800,
    fechaIngreso: "2012-01-01",
}
]



const Productos = () => {
    const[mostrarTabla, setMostarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Agregar Nuevo Producto');
    const [colorBoton, setColorBoton] = useState('indigo');

    useEffect(() => {
        //obtener lista de vehículos desde el backend
        setProductos(productosBackend);
      }, []);
    
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
                <TablaPrductos listaProductos={productos}/>
            ): (
                <FormularioAgregarProducto 
                setMostarTabla={setMostarTabla}
                listaProductos={productos}
                setProductos ={setProductos}/>
            )}

            <ToastContainer
                position="top-right"
                autoClose={1000}
            />

        </div>
    );
};



const TablaPrductos = ({listaProductos}) => {
    useEffect(()=>{
        console.log('este es el listado de productos', listaProductos);
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
                            <FilaProducto key={nanoid()} producto={producto}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const FilaProducto =({producto}) =>{
    const [edit, setEdit] = useState(false);
    return(
        <tr>
            {edit ?
                <>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.id} />
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.category} />
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.estilo} /> 
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.existencias}/> 
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.costoProduccion} />
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.valorVenta}/> 
                    </td>
                    <td><input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg'
                     type="text" defaultValue={producto.fechaIngreso}/> 
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
                        <i onClick={()=> setEdit(!edit)}
                        className='fas fa-check text-yellow-700 hover:text-yellow-400'
                        />   
                    ) : (
                        <i onClick={() => setEdit(!edit)} 
                        className='fas fa-pencil-alt text-green-900 hover:text-green-400'
                        />)
                    }
                    <i className= 'fas fa-trash-alt text-red-900 hover:text-red-400' ></i>
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

        // const options = {
        //     method: 'POST',
        //     url: 'https://vast-waters-45728.herokuapp.com/vehicle/create',
        //     headers: { 'Content-Type': 'application/json' },
        //     data: { id: nuevoProducto.idProducto, category: nuevoProducto.categoria },
        //   };

        // await axios
        // .request(options)
        // .then(function (response) {
        //   console.log(response.data);
        //   toast.success('Vehículo agregado con éxito');
        // })
        // .catch(function (error) {
        //   console.error(error);
        //   toast.error('Error creando un vehículo');
        // });

        setMostarTabla(true);
        setProductos([...listaProductos, nuevoProducto]);
        toast.success('Exito');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2>Agregar nuevo producto</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor="idProducto">
                    Id Producto
                    <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg' name='id' type="number" placeholder='id' min={0} required />
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
                    <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg' name='existencias' type="number" placeholder='0' required/>
                </label>
                <label className='flex flex-col' htmlFor="costoProduccion">
                    Costo de Produccion
                    <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg' name='costoProduccion' type="number" placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="valorVenta">
                    Valor de Venta
                    <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg' name='valorVenta' type="number" placeholder='0 $' required/>
                </label>
                <label className='flex flex-col' htmlFor="fechaIngreso">
                    Fecha de Ingreso
                    <input className='bg-blue-400 border-gray-900 w-full py-2 rounded-lg' name='fechaIngreso' type="date" required/>
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
