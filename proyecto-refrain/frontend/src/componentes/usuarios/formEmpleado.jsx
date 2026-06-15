export default function FormEmpleado({
    nombre,
    setNombre,
    email,
    setEmail,
    pwdu,
    setPwdu,

    registrarEmpleado,
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
                {editando ? "Editar empleado" : "Registrar empleado"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={inputStyle}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                {!editando && (
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={pwdu}
                        onChange={(e) => setPwdu(e.target.value)}
                        style={inputStyle}
                    />
                )}

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
                        <button style={btnPrimary} onClick={registrarEmpleado}>
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