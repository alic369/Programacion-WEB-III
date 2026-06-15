export default function FormCategoria({
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    registrarCategoria,
    editando,
    guardarEdicion,
    cancelarEdicion
}) {
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
                {editando ? "Editar categoría" : "Registrar categoría"}
            </h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={inputStyle}
            />

            <input
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                style={inputStyle}
            />

            <div style={{
                display: "flex",
                gap: "8px",
                marginTop: "6px"
            }}>

                {editando ? (
                    <>
                        <button onClick={guardarEdicion} style={btnPrimary}>
                            Guardar
                        </button>

                        <button onClick={cancelarEdicion} style={btnSecondary}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button onClick={registrarCategoria} style={btnPrimary}>
                        Registrar
                    </button>
                )}

            </div>
        </div>
    );
}

const inputStyle = {
    padding: "10px",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none"
};

const btnPrimary = {
    background: "#4F46E5",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer"
};

const btnSecondary = {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    color: "#0F172A",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer"
};