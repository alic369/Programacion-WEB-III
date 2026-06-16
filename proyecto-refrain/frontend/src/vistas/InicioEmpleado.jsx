import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../componentes/layout";
import { extraerErrores } from "../services/errores.js";
import { ShoppingCart, DollarSign, Calendar, AlertTriangle } from "lucide-react";

export default function InicioEmpleado() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [errores, setErrores] = useState([]);
    const [productosBajoStock, setProductosBajoStock] = useState([]);
    const [kpis, setKpis] = useState({ ventasHoy: 0, ventasMes: 0, totalVendido: 0 });

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const [v, p] = await Promise.all([
                api.get("/ventas"),
                api.get("/productos")
            ]);

            const ventas = (Array.isArray(v.data) ? v.data : [])
                .filter(v => v.usuario_id === user?.id && !v.cancelada);

            const productos = Array.isArray(p.data) ? p.data : [];

            const hoy = new Date().toISOString().slice(0, 10);
            const mesActual = new Date().getMonth();
            const anioActual = new Date().getFullYear();

            const ventasHoy = ventas.filter(v => v.fecha?.slice(0, 10) === hoy).length;

            const ventasMes = ventas.filter(v => {
                const d = new Date(v.fecha);
                return d.getMonth() === mesActual && d.getFullYear() === anioActual;
            }).length;

            const totalVendido = ventas.reduce((a, v) => a + Number(v.total || 0), 0);

            setKpis({ ventasHoy, ventasMes, totalVendido });
            setProductosBajoStock(productos.filter(p => p.stock <= 5));
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    return (
        <Layout>
            <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    Bienvenido, {user?.nombre}
                </h1>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
                    Resumen de tu actividad
                </p>
            </div>

            {errores.length > 0 && (
                <div style={estiloError}>
                    {errores.map((e, i) => <div key={i}>• {e}</div>)}
                </div>
            )}

            <div style={grid}>
                <Card icon={<Calendar size={16} />} label="Ventas hoy" value={kpis.ventasHoy} />
                <Card icon={<ShoppingCart size={16} />} label="Ventas este mes" value={kpis.ventasMes} />
                <Card icon={<DollarSign size={16} />} label="Total vendido" value={`Bs. ${kpis.totalVendido.toFixed(2)}`} />
            </div>

            <div style={panel}>
                <h3 style={title}>Alerta de stock bajo</h3>
                {productosBajoStock.length === 0 && (
                    <p style={{ fontSize: 12, color: "#64748B" }}>Sin productos en stock bajo</p>
                )}
                {productosBajoStock.map(p => (
                    <div key={p.id} style={row}>
                        <AlertTriangle size={14} color="#F59E0B" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13 }}>{p.nombre}</div>
                            <div style={{ fontSize: 11, color: "#94A3B8" }}>Stock: {p.stock}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

function Card({ icon, label, value }) {
    return (
        <div style={card}>
            {icon}
            <div>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{label}</p>
                <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#0F172A" }}>{value}</p>
            </div>
        </div>
    );
}

const grid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 0 };
const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, display: "flex", gap: 10, alignItems: "center" };
const panel = { marginTop: 16, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16 };
const title = { fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#0F172A" };
const row = { display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #F1F5F9", alignItems: "center" };
const estiloError = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" };