export default function ListaCategorias({
    categorias = [],
    editarCategoria,
    eliminarCategoria,
    activarCategoria,
    desactivarCategoria
}) {

    const lista = Array.isArray(categorias) ? categorias : [];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>

            <h2 style={{
                fontSize: "14px",
                fontWeight: 800,
                marginBottom: "6px",
                color: "#0F172A"
            }}>
                Categorías registradas
            </h2>

            {lista.length === 0 && (
                <div style={{
                    fontSize: "12px",
                    color: "#64748B"
                }}>
                    No hay categorías registradas
                </div>
            )}

            {lista.map((categoria) => (
                <div key={categoria.id} style={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#fff"
                }}>

                    {/* INFO */}
                    <div>
                        <div style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#0F172A"
                        }}>
                            {categoria.nombre}
                        </div>

                        <div style={{
                            fontSize: "12px",
                            color: "#64748B",
                            marginTop: "3px"
                        }}>
                            {categoria.descripcion}
                        </div>

                        <div style={{
                            fontSize: "11px",
                            marginTop: "6px",
                            fontWeight: 700,
                            color: categoria.activo ? "#16A34A" : "#DC2626"
                        }}>
                            {categoria.activo ? "Activa" : "Inactiva"}
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                    }}>

                        <button onClick={() => editarCategoria(categoria)} style={btnPrimary}>
                            Editar
                        </button>

                        <button onClick={() => eliminarCategoria(categoria.id)} style={btnDanger}>
                            Eliminar
                        </button>

                        {categoria.activo ? (
                            <button onClick={() => desactivarCategoria(categoria.id)} style={btnDanger}>
                                Desactivar
                            </button>
                        ) : (
                            <button onClick={() => activarCategoria(categoria.id)} style={btnSuccess}>
                                Activar
                            </button>
                        )}

                    </div>

                </div>
            ))}
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
    fontWeight: 700,
    cursor: "pointer"
};

const btnDanger = {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#B91C1C",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer"
};

const btnSuccess = {
    background: "#ECFDF5",
    border: "1px solid #6EE7B7",
    color: "#047857",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer"
};