import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ rol }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const item = (path, label) => (
        <div
            onClick={() => navigate(path)}
            style={{ ...baseItem, ...(isActive(path) ? activeStyle : inactiveStyle) }}
        >
            {label}
        </div>
    );

    return (
        <aside style={{ width: "240px", padding: "16px", borderRight: "1px solid #E2E8F0", background: "#FFFFFF", height: "100%" }}>

            {rol === "dueno" && (
                <>
                    {item("/estadisticas", "Inicio")}
                    {item("/empleados", "Empleados")}
                    {item("/categorias", "Categorías")}
                    <hr style={{ margin: "16px 0", borderColor: "#E2E8F0" }} />
                </>
            )}

            {rol === "empleado" && (
                <>
                    {item("/inicio-empleado", "Inicio")}
                    <hr style={{ margin: "16px 0", borderColor: "#E2E8F0" }} />
                </>
            )}

            {item("/ventas", "Ventas")}
            {item("/productos", "Productos")}
            {item("/clientes", "Clientes")}
        </aside>
    );
}

const baseItem = { padding: "10px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 500, marginBottom: "8px", border: "1px solid transparent" };
const activeStyle = { background: "#4F46E5", color: "white" };
const inactiveStyle = { background: "#F8FAFC", color: "#0F172A" };