export default function ListaProductos({
    productos,
    eliminarProducto,
    editarProducto,
    mostrarEliminados
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
                Productos
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>

                {productos.map((producto) => (
                    <div
                        key={producto.id}
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
                            <div style={{ fontWeight: 700, fontSize: "13px" }}>
                                {producto.nombre}
                            </div>

                            <div style={{ fontSize: "12px", color: "#64748B" }}>
                                Precio: Bs. {producto.precio}
                            </div>

                            <div style={{ fontSize: "12px", color: "#64748B" }}>
                                Stock: {producto.stock}
                            </div>

                            <div style={{ fontSize: "12px", color: "#64748B" }}>
                                Categoría: {producto.categoria}
                            </div>

                            {mostrarEliminados && (
                                <div
                                    style={{
                                        fontSize: "11px",
                                        marginTop: "4px",
                                        color: "#B91C1C",
                                        fontWeight: 600
                                    }}
                                >
                                    Eliminado el{" "}
                                    {new Date(producto.fecha_eliminacion).toLocaleDateString()}
                                </div>
                            )}
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        }}>

                            {!mostrarEliminados && (
                                <>
                                    <button
                                        onClick={() => editarProducto(producto)}
                                        style={btnPrimary}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() =>eliminarProducto(producto.id)}
                                        style={btnDanger}
                                    >
                                        Eliminar
                                    </button>
                                </>
                            )}

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

const btnSuccess = {
    background: "#ECFDF5",
    border: "1px solid #6EE7B7",
    color: "#047857",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer"
};