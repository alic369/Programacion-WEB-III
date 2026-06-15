export default function ListaEmpleados({
    empleados,
    eliminarEmpleado,
    activarEmpleado,
    desactivarEmpleado,
    editarEmpleado
}) {
    return (
        <div style={{ display: "grid", gap: "10px" }}>

            {empleados.map(e => (
                <div key={e.id} style={{
                    border: "1px solid #E2E8F0",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "space-between"
                }}>

                    <div>
                        <b>{e.nombre}</b>
                        <div style={{ fontSize: "12px", color: "#64748B" }}>
                            {e.email}
                        </div>
                        <div style={{ fontSize: "12px" }}>
                            {e.activo ? "Activo" : "Inactivo"}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => editarEmpleado(e)}>Editar</button>

                        {e.activo ? (
                            <button onClick={() => desactivarEmpleado(e.id)}>
                                Desactivar
                            </button>
                        ) : (
                            <button onClick={() => activarEmpleado(e.id)}>
                                Activar
                            </button>
                        )}
                    </div>

                </div>
            ))}

        </div>
    );
}