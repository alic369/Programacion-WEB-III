export default function ListaClientes({
    clientes,
    editarCliente,
    eliminarCliente
}) {

    return (
        <>
            <h2>Clientes</h2>

            {
                clientes.map(cliente => (

                    <div key={cliente.id}>

                        <b>{cliente.nombre}</b>

                        <br />

                        {cliente.email}

                        <br />

                        {cliente.telefono}

                        <br /><br />

                        <button
                            onClick={() => editarCliente(cliente)}
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => eliminarCliente(cliente.id)}
                        >
                            Eliminar
                        </button>

                        <hr />

                    </div>

                ))
            }
        </>
    );
}