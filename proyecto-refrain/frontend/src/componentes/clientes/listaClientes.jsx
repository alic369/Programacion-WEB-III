export default function ListaClientes({
    clientes,
    editarCliente,
    eliminarCliente
}) {
    return (
        <div style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "16px"
        }}>

            <h2 style={{
                fontSize: "14px",
                fontWeight: 800,
                marginBottom: "12px"
            }}>
                Clientes
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>

                {clientes.map(cliente => (
                    <div
                        key={cliente.id}
                        style={{
                            border: "1px solid #F1F5F9",
                            borderRadius: "10px",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >

                        <div>
                            <div style={{
                                fontWeight: 700,
                                fontSize: "13px"
                            }}>
                                {cliente.nombre}
                            </div>

                            <div style={{
                                fontSize: "12px",
                                color: "#64748B"
                            }}>
                                {cliente.email}
                            </div>

                            <div style={{
                                fontSize: "12px",
                                color: "#64748B"
                            }}>
                                {cliente.telefono}
                            </div>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        }}>

                            <button
                                onClick={() => editarCliente(cliente)}
                                style={btnPrimary}
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => eliminarCliente(cliente.id)}
                                style={btnDanger}
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

const btnPrimary = {
    background: "#4F46E5",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer"
};

const btnDanger = {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#B91C1C",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer"
};