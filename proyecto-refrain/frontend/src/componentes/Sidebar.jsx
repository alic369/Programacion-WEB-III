import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ rol }) {
    const navigate = useNavigate();
    const location = useLocation();

    const go = (path) => navigate(path);

    const isActive = (path) => location.pathname === path;

    const baseItem = {
        padding: "10px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 500,
        marginBottom: "8px",
        border: "1px solid transparent",
    };

    const activeStyle = {
        background: "#4F46E5",
        color: "white",
    };

    const inactiveStyle = {
        background: "#F8FAFC",
        color: "#0F172A",
    };

    return (
        <aside style={{
            width: "240px",
            padding: "16px",
            borderRight: "1px solid #E2E8F0",
            background: "#FFFFFF",
            height: "100%",
        }}>

            {/* DUENO */}
            {rol === "dueno" && (
                <>
                    {/* Inicio = ESTADISTICAS */}
                    <div
                        onClick={() => go("/estadisticas")}
                        style={{
                            ...baseItem,
                            ...(isActive("/estadisticas") ? activeStyle : inactiveStyle)
                        }}
                    >
                        Inicio (Estadísticas)
                    </div>

                    {/* Empleados = ADMINISTRACION */}
                    <div
                        onClick={() => go("/dueno")}
                        style={{
                            ...baseItem,
                            ...(isActive("/dueno") ? activeStyle : inactiveStyle)
                        }}
                    >
                        Empleados
                    </div>

                    <div
                        onClick={() => go("/categorias")}
                        style={{
                            ...baseItem,
                            ...(isActive("/categorias") ? activeStyle : inactiveStyle)
                        }}
                    >
                        Categorías
                    </div>
                </>
            )}

            {/* EMPLEADO */}
            {rol === "empleado" && (
                <div
                    onClick={() => go("/estadisticas")}
                    style={{
                        ...baseItem,
                        ...(isActive("/estadisticas") ? activeStyle : inactiveStyle)
                    }}
                >
                    Inicio (Estadísticas)
                </div>
            )}

            <hr style={{ margin: "16px 0", borderColor: "#E2E8F0" }} />

            {/* COMUNES */}
            <div
                onClick={() => go("/ventas")}
                style={{
                    ...baseItem,
                    ...(isActive("/ventas") ? activeStyle : inactiveStyle)
                }}
            >
                Ventas
            </div>

            <div
                onClick={() => go("/productos")}
                style={{
                    ...baseItem,
                    ...(isActive("/productos") ? activeStyle : inactiveStyle)
                }}
            >
                Productos
            </div>

            <div
                onClick={() => go("/clientes")}
                style={{
                    ...baseItem,
                    ...(isActive("/clientes") ? activeStyle : inactiveStyle)
                }}
            >
                Clientes
            </div>

        </aside>
    );
}