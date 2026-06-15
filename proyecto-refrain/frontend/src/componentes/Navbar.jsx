import { useNavigate } from "react-router-dom";

export default function Navbar({ user, cerrarSesion }) {

    const navigate = useNavigate();

    return (
        <header
            style={{
                height: "64px",
                background: "#FFFFFF",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50
            }}
        >

            {/* LEFT: TITULO SISTEMA */}
            <div
                style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#0F172A",
                    letterSpacing: "0.5px"
                }}
            >
                REFRÁIN
            </div>

            {/* RIGHT: USER */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px"
                }}
            >

                {/* USER INFO */}
                <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: 700 }}>
                        {user?.nombre}
                    </p>

                    <p style={{ margin: 0, fontSize: "11px", color: "#64748B" }}>
                        {user?.rol}
                    </p>
                </div>

                {/* AVATAR */}
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "#4F46E5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "default"
                    }}
                >
                    {user?.nombre?.charAt(0)?.toUpperCase()}
                </div>

                {/* LOGOUT */}
                <button
                    onClick={cerrarSesion}
                    style={{
                        marginLeft: "10px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#F8FAFC",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "#0F172A"
                    }}
                >
                    Salir
                </button>

            </div>
        </header>
    );
}