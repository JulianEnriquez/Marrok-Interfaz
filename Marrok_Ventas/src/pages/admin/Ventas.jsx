//import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })


const ventasBackend = [{
    fechaVenta: "02/10/2021",
    noFactura: "0001",
    vendedor: "Andrea Rojas",
    idVendedor: "V01",
    nombreCliente: "Armando Echeverri",
    idCliente: 10001,
    descripcionProducto: "Zapatos casuales",
    unidades: 2,
    precioUnitario: (formatterPeso.format(120000)),
    totalVenta: (formatterPeso.format(240000)),
},
    {fechaVenta: "03/10/2021",
    noFactura: "0002",
    vendedor: "Jorge Henriquez",
    idVendedor: "V02",
    nombreCliente: "Francy Hernandez",
    idCliente: 10002,
    descripcionProducto: "Baletas niñas",
    unidades: 2,
    precioUnitario: (formatterPeso.format(60000)),
    totalVenta: (formatterPeso.format(120000)),
},
    {fechaVenta: "03/10/2021",
    noFactura: "0003",
    vendedor: "Andrea Nustes",
    idVendedor: "V03",
    nombreCliente: "Alejandra Sanchez",
    idCliente: 10003,
    descripcionProducto: "Bota Brahma",
    unidades: 1,
    precioUnitario: (formatterPeso.format(250000)),
    totalVenta: (formatterPeso.format(250000)),
},
    {fechaVenta: "04/10/2021",
    noFactura: "0004",
    vendedor: "Julian Enriquez",
    idVendedor: "V04",
    nombreCliente: "Francisco Guerrero",
    idCliente: 10004,
    descripcionProducto: "Tenis deportivo",
    unidades: 2,
    precioUnitario: (formatterPeso.format(120000)),
    totalVenta: (formatterPeso.format(120000)),
},
    {fechaVenta: "05/10/2021",
    noFactura: "0005",
    vendedor: "Rosario Maldonado",
    idVendedor: "V05",
    nombreCliente: "Alejandro Fonseca",
    idCliente: 10005,
    descripcionProducto: "Sandalia de niño",
    unidades: 2,
    precioUnitario: (formatterPeso.format(50000)),
    totalVenta: (formatterPeso.format(50000)),
},
    {fechaVenta: "05/10/2021",
    noFactura: "0006",
    vendedor: "Jorge Henriquez",
    idVendedor: "V02",
    nombreCliente: "Valentina Marquez",
    idCliente: 10006,
    descripcionProducto: "Mocasines",
    unidades: 1,
    precioUnitario: (formatterPeso.format(90000)),
    totalVenta: (formatterPeso.format(90000)),
},
    {fechaVenta: "06/10/2021",
    noFactura: "0007",
    vendedor: "Andrea Rojas",
    idVendedor: "V01",
    nombreCliente: "Clemencia Gonzalez",
    idCliente: 10007,
    descripcionProducto: "Zapato de niño",
    unidades: 1,
    precioUnitario: (formatterPeso.format(75000)),
    totalVenta: (formatterPeso.format(75000)),
},
    {fechaVenta: "07/10/2021",
    noFactura: "0008",
    vendedor: "Julian Enriquez",
    idVendedor: "V04",
    nombreCliente: "Francisco Manrique",
    idCliente: 10008,
    descripcionProducto: "Guayos",
    unidades: 1,
    precioUnitario: (formatterPeso.format(125000)),
    totalVenta: (formatterPeso.format(125000)),
},
    {fechaVenta: "09/10/2021",
    noFactura: "0009",
    vendedor: "Andrea Nustes",
    idVendedor: "V03",
    nombreCliente: "Guillermo Cárdenas",
    idCliente: 10009,
    descripcionProducto: "Zapatos con cordón",
    unidades: 2,
    precioUnitario: (formatterPeso.format(115000)),
    totalVenta: (formatterPeso.format(230000)),
},
    {fechaVenta: "09/10/2021",
    noFactura: "0010",
    vendedor: "Rosario Maldonado",
    idVendedor: "V05",
    nombreCliente: "Jennifer Balaguera",
    idCliente: 10010,
    descripcionProducto: "Bubble Gummers",
    unidades: 1,
    precioUnitario: (formatterPeso.format(56900)),
    totalVenta: (formatterPeso.format(56900)),
},
    {fechaVenta: "10/10/2021",
    noFactura: "0011",
    vendedor: "Jorge Henriquez",
    idVendedor: "V02",
    nombreCliente: "Magda Albarracin",
    idCliente: 10011,
    descripcionProducto: "Sandalia tacon",
    unidades: 1,
    precioUnitario: (formatterPeso.format(130000)),
    totalVenta: (formatterPeso.format(130000)),
},
    {fechaVenta: "11/10/2021",
    noFactura: "0012",
    vendedor: "Andrea Rojas",
    idVendedor: "V01",
    nombreCliente: "Santiago Peñaranda",
    idCliente: 10012,
    descripcionProducto: "Bota River Creek",
    unidades: 1,
    precioUnitario: (formatterPeso.format(115000)),
    totalVenta: (formatterPeso.format(115000)),
},
]


const Ventas = () => {
    const[mostrarTabla, setMostarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Agregar Nueva Venta');
    const [colorBoton, setColorBoton] = useState('indigo');

    useEffect(() => {
        //obtener lista de ventas desde el backend
        setVentas(ventasBackend);
      }, []);
    
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
                    Administración de Ventas
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
                <TablaPrductos listaVentas={ventas}/>
            ): (
                <FormularioAgregarVentas 
                setMostarTabla={setMostarTabla}
                listaVentas={ventas}
                setVentas ={setVentas}/>
            )}

            <ToastContainer
                position="top-right"
                autoClose={1000}
            />

        </div>
    );
};



const TablaPrductos = ({listaVentas}) => {
    useEffect(()=>{
        console.log('este es el listado de ventas', listaVentas);
    },[listaVentas]);
    return (
        <div className= 'flex flex-col items-center justify-center w-full'>
            <h2 className='text-3xl font-extrabol text-blue arial'>
            Todas las Ventas
            </h2>
            
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Fecha Venta</th>
                        <th>No. Factura</th>
                        <th>Vendedor</th>
                        <th>Id Vendedor</th>
                        <th>Nombre del Cliente</th>
                        <th>Id Cliente</th>
                        <th>Descripción Producto</th>
                        <th>Unidades</th>
                        <th>Precio Unitario</th>
                        <th>Total Venta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVentas.map((ventas)=>{
                        return(
                            <tr key={nanoid()}>
                                <td>{ventas.fechaVenta}</td>
                                <td>{ventas.noFactura}</td>
                                <td>{ventas.vendedor}</td>
                                <td>{ventas.idVendedor}</td>
                                <td>{ventas.nombreCliente}</td>
                                <td>{ventas.idCliente}</td>
                                <td>{ventas.descripcionProducto}</td>
                                <td>{ventas.unidades}</td>
                                <td>{ventas.precioUnitario}</td>
                                <td>{ventas.totalVenta}</td>
                                <td>{ventas.acciones}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const FormularioAgregarVentas = ({setMostarTabla, listaVentas ,setVentas}) => {
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
        setVentas([...listaVentas, nuevoProducto]);
        toast.success('Exito');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-4xl font-extrabol text-indigo-900 text-center sniglet'>
            Agregar nueva venta
            </h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>

                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="fechaVenta">
                    Fecha Venta
                    <input name='fechaVenta' type="date" required />
                </label>


                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="noFactura">
                    No. Factura
                    <select name="noFactura text-center" required defaultValue={0}>
                        <option disabled value={0}>Seleccione No. Factura</option>
                        <option>0001</option>
                        <option>0002</option>
                        <option>0003</option>
                        <option>0004</option>
                        <option>0005</option>
                        <option>0006</option>
                        <option>0007</option>
                        <option>0008</option>
                        <option>0009</option>
                        <option>0010</option>
                        <option>0011</option>
                        <option>0012</option>
                    </select>
                </label>
                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="vendedor">
                    Vendedor
                    <select name="vendedor" defaultValue={0} required>
                        <option disabled value={0}>Seleccione Vendedor</option>
                        <option>Andrea Rojas</option>
                        <option>Jorge Henriquez</option>
                        <option>Andrea Ñustes</option>
                        <option>Julian Enriquez</option>
                        <option>Rosario Maldonado</option>
                    </select>
                </label>
                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="idVendedor">
                    Id Vendedor
                    <select name="idVendedor text-center" defaultValue={0} required>
                        <option disabled value={0}>Seleccione Id Vendedor</option>
                        <option>V01</option>
                        <option>V02</option>
                        <option>V03</option>
                        <option>V04</option>
                        <option>V05</option>
                        <option>V06</option>
                        <option>V07</option>
                    </select>
                </label>

                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="nombreCliente">
                    Nombre Cliente
                    <input name='nombreCliente' type="string" placeholder='Nombre Cliente' required/>
                </label>
                
                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="idCliente">
                    Id Cliente
                    <input name='idCliente' type="number" placeholder='0' required/>
                </label>

                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="descripcionProducto">
                    Descripción Producto
                    <select name="descripcionProducto" defaultValue={0} required>
                        <option disabled value={0}>Seleccione Producto</option>
                        <option>Bota Brahma</option>
                        <option>Tenis deportivo</option>
                        <option>Sandalia de niño</option>
                        <option>Mocasines</option>
                        <option>Zapato de niño</option>
                        <option>Guayos</option>
                        <option>Zapatos con cordón</option>
                        <option>Bubble Gummers</option>
                        <option>Sandalia tacon</option>
                        <option>Bota River Creek</option>
                    </select>
                </label>

                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="unidades">
                    Unidades
                    <input name='unidades' type="number" placeholder='0' required/>
                </label>


                <label className='flex flex-col text-center bg-gray-400 text-xl'htmlFor="precioUnitario">
                   Precio Unitario
                    <input name='precioUnitario' type="number" placeholder='0 $' required/>
                </label>


                <label className='flex flex-col text-center bg-gray-400 text-xl' htmlFor="valorVenta">
                    Valor Total Venta
                    <input name='valorVenta' type="number" placeholder='0 $' required/>
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
