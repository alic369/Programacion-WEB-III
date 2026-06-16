import { useState } from "react";

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

    const [nivelPw, setNivelPw] = useState("");

    const evaluarPassword = (value) => {
        let score = 0;

        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (score <= 1) return "Débil";
        if (score <= 3) return "Media";
        return "Fuerte";
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <h2 style={{
                fontSize: "14px",
                fontWeight: 800,
                marginBottom: "6px",
                color: "#0F172A"
            }}>
                {editando ? "Editar empleado" : "Registrar empleado"}
            </h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                style={inputStyle}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
            />

            {!editando && (
                <>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={pwdu}
                        onChange={e => {
                            const value = e.target.value;
                            setPwdu(value);
                            setNivelPw(evaluarPassword(value));
                        }}
                        style={inputStyle}
                    />

                    {pwdu && (
                        <div style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color:
                                nivelPw === "Débil" ? "#DC2626" :
                                nivelPw === "Media" ? "#D97706" :
                                "#16A34A"
                        }}>
                            Seguridad: {nivelPw}
                        </div>
                    )}
                </>
            )}

            <div style={{
                display: "flex",
                gap: "8px",
                marginTop: "4px"
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
                    <button onClick={registrarEmpleado} style={btnPrimary}>
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