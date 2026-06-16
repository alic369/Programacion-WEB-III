export default function ListaEmpleados({ empleados, editarEmpleado, activarEmpleado, desactivarEmpleado }) {
    const lista = Array.isArray(empleados) ? empleados : [];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "6px", color: "#0F172A" }}>
                Empleados registrados
            </h2>

            {lista.length === 0 && (
                <div style={{ fontSize: "12px", color: "#64748B" }}>No hay empleados registrados</div>
            )}

            {lista.map(e => (
                <div key={e.id} style={{ border: "1px solid #E2E8F0", padding: "12px", borderRadius: "12px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A" }}>{e.nombre}</div>
                        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "3px" }}>{e.email}</div>
                        <div style={{ fontSize: "11px", marginTop: "6px", fontWeight: 700, color: e.activo ? "#16A34A" : "#DC2626" }}>
                            {e.activo ? "Activo" : "Inactivo"}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button onClick={() => editarEmpleado(e)} style={btnPrimary}>Editar</button>
                        {e.activo
                            ? <button onClick={() => desactivarEmpleado(e.id)} style={btnDanger}>Desactivar</button>
                            : <button onClick={() => activarEmpleado(e.id)} style={btnSuccess}>Activar</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

const btnPrimary = { background: "#4F46E5", color: "white", border: "none", padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" };
const btnDanger = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" };
const btnSuccess = { background: "#ECFDF5", border: "1px solid #6EE7B7", color: "#047857", padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" };