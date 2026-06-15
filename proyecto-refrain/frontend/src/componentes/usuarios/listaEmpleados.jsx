export default function ListaEmpleados({
    empleados,
    eliminarEmpleado,
    activarEmpleado,
    desactivarEmpleado,
    editarEmpleado
}) {

    return (
        <>
            <h2>Empleados</h2>
            {
                empleados.map((empleado) => (

                    <div key={empleado.id}>

                        <b>{empleado.nombre}</b>

                        <br />

                        {empleado.email}

                        <br />

                        Activo: {empleado.activo ? "Si" : "No"}

                        <br />

                        {/*
                        <button
                            onClick={() => eliminarEmpleado(empleado.id)}
                        >
                            Eliminar
                        </button>
                        */}

                        <button
                            onClick={() => editarEmpleado(empleado)}
                        >
                            Editar
                        </button>                        

                        <br />                        

                        {
                            empleado.activo
                            ?
                            <button
                                onClick={() => desactivarEmpleado(empleado.id)}
                            >
                                Desactivar
                            </button>
                            
                            :

                            <button
                                onClick={() => activarEmpleado(empleado.id)}
                            >
                                Activar
                            </button>
                        }

                        <hr />

                    </div>
                ))
            }
        </>
    );
}