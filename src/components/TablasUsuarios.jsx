import React, {useState} from 'react'
import Table, { AvatarCell,  StatusPill } from './Table'  // new
//SelectColumnFilter
import EditarUsuario from './EditarUsuario'
import MensajeGuardaOK from './MensajeGuardaOK'

const getData = () => {
  const data = [
    {
      name: 'Andrea Rojas',
      email: 'andrea.rojas@example.com',
      Documento: '1093627160',
      status: 'Autorizado',
      role: 'Administrador',
      date: '14-10-2021',
      imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Julian Enriquez',
      email: 'Julian.enriquez@example.com',
      Documento: '1023678178',
      status: 'No autorizado',
      date: '14-10-2021',
      role: 'Vendedor',
      imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Andrea Ñustez',
      email: 'andrea.ñustez@example.com',
      Documento: '1029816151',
      status: 'Pendiente',
      role: 'Administrador',
      date: '14-10-2021',
      imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Jorge Novoa',
      email: 'jorge.novoa@example.com',
      Documento: '1909281710',
      status: 'Autorizado',
      role: 'Vendedor',
      date: '14-10-2021',
      imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Fabian Coronel',
      email: 'Fabian.coronel@example.com',
      Documento: '1098272517',
      status: 'Pendiente',
      role: 'Administrador',
      date: '14-10-2021',
      imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Sofia Coronel',
      email: 'sofia.coronel@example.com',
      Documento: '1082972625',
      status: 'Pendiente',
      role: 'Vendedor',
      date: '14-10-2021',
      imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]
  return [...data]
}

const arrayVacio= {
    Documento: "1093627160",
    date: "14-10-2021",
    email: "andrea.rojas@example.com",
    imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    name: "Andrea Rojas",
    role: "Administrador",
    status: "Autorizado",
}

function TablasUsuarios() {
    
  const columns = React.useMemo(() => [
    {
      Header: "Nombre",
      accessor: 'name',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Documento",
      accessor: 'Documento',
    },
    {
      Header: "Estado",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Rol",
      accessor: 'role'
    },
    {
      Header: "Fecha de creación",
      accessor: 'date'
    }
  ], [])
    var guardarUsuario = function() {
        setOpen(false)
        setOpenMjs(true)
    };
    var openEdit = function(user) {
        setOpen(true)
        setUser(user)
    };
  const data = React.useMemo(() => getData(), [])
  const [open, setOpen] = useState(false)
  const [openMjs, setOpenMjs] = useState(false)
  const [user, setUser] = useState(arrayVacio)
  return (
    <div  className="max-h-screen max-w-screen-2xl bg-gray-100 text-gray-900">
        <main className="max-w-5lx mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div>
            <div>
                <h1 className="text-xl font-semibold">Administracion de Usuarios</h1>
            </div>
        </div>
        <div class="grid justify-items-end">
            <div >
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Nuevo usuario</button>
            </div>
        </div>
        <div className="max-w-screen-2xl mt-6">
          <Table columns={columns} openEdit={openEdit} data={data} />
        </div>
        <EditarUsuario  open={open} setOpen={setOpen} user={user} guardarUsuario={guardarUsuario}/>
        <MensajeGuardaOK open={openMjs} setOpen={setOpenMjs}/>
      </main>
    </div>
  );
}

export default TablasUsuarios;
