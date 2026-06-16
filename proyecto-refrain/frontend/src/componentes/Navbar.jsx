import {
    LogOut,
    UserRound,
    Shield,
    BadgeCheck,
    Shirt
} from "lucide-react";

export default function Navbar({ user, cerrarSesion }) {

    const rolIcon =
        user?.rol === "dueno"
            ? <Shield size={14} />
            : <BadgeCheck size={14} />;

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

            {/* LEFT */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "0.5px"
            }}>
                <Shirt size={18} color="#4F46E5" />
                REFRÁIN
            </div>

            {/* RIGHT */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px"
            }}>

                {/* USER INFO */}
                <div style={{ textAlign: "right" }}>
                    <p style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0F172A"
                    }}>
                        {user?.nombre}
                    </p>

                    <p style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "#64748B",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "4px"
                    }}>
                        {rolIcon}
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
                        border: "1px solid #C7D2FE"
                    }}
                >
                    {user?.nombre?.charAt(0)?.toUpperCase()}
                </div>

                {/* DIVIDER */}
                <div style={{
                    width: "1px",
                    height: "24px",
                    background: "#E2E8F0"
                }} />

                {/* LOGOUT */}
                <button
                    onClick={cerrarSesion}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#F8FAFC",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "#0F172A"
                    }}
                >
                    <LogOut size={14} />
                    Salir
                </button>

            </div>
        </header>
    );
}