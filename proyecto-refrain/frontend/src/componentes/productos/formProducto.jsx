export default function FormProducto({
    nombre,
    setNombre,
    precio,
    setPrecio,
    stock,
    setStock,
    categoria_id,
    setCategoria_id,
    categorias,

    registrarProducto,
    editando,
    guardarEdicion,
    cancelarEdicion
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
                {editando ? "Editar producto" : "Registrar producto"}
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>

                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={inputStyle}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                    />
                </div>

                <select
                    value={categoria_id}
                    onChange={(e) => setCategoria_id(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">
                        Seleccione categoría
                    </option>

                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>

                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    {editando ? (
                        <>
                            <button style={btnPrimary} onClick={guardarEdicion}>
                                Guardar
                            </button>

                            <button style={btnSecondary} onClick={cancelarEdicion}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button style={btnPrimary} onClick={registrarProducto}>
                            Registrar
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

const inputStyle = {
    padding: "10px",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    fontSize: "13px"
};

const btnPrimary = {
    background: "#4F46E5",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer"
};

const btnSecondary = {
    background: "#F1F5F9",
    border: "1px solid #E2E8F0",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer"
};