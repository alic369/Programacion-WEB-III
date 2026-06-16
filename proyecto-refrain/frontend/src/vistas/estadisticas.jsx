import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../componentes/layout";
import { extraerErrores } from "../services/errores.js";
import { Package, Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const COLORES = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Estadisticas() {
    const [data, setData] = useState({ productos: 0, clientes: 0, ventas: 0, ingresos: 0 });
    const [ventas, setVentas] = useState([]);
    const [productosBajoStock, setProductosBajoStock] = useState([]);
    const [errores, setErrores] = useState([]);

    // calculados en front
    const [topProductos, setTopProductos] = useState([]);
    const [ventasPorEmpleado, setVentasPorEmpleado] = useState([]);
    const [clientesFrecuentes, setClientesFrecuentes] = useState([]);
    const [ventasPorCategoria, setVentasPorCategoria] = useState([]);

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const [p, c, v] = await Promise.all([
                api.get("/productos"),
                api.get("/clientes"),
                api.get("/ventas")
            ]);

            const productos = Array.isArray(p.data) ? p.data : [];
            const clientes = Array.isArray(c.data) ? c.data : [];
            const ventasData = Array.isArray(v.data) ? v.data : [];

            setVentas(ventasData);

            const ingresos = ventasData.reduce((acc, v) => acc + Number(v.total || 0), 0);
            setData({ productos: productos.length, clientes: clientes.length, ventas: ventasData.length, ingresos });
            setProductosBajoStock(productos.filter(p => p.stock <= 5));

            // ventas por empleado
            const porEmpleado = {};
            ventasData.forEach(v => {
                const key = v.usuario_nombre || `Usuario #${v.usuario_id}`;
                porEmpleado[key] = (porEmpleado[key] || 0) + Number(v.total || 0);
            });
            setVentasPorEmpleado(
                Object.entries(porEmpleado)
                    .map(([nombre, total]) => ({ nombre, total }))
                    .sort((a, b) => b.total - a.total)
            );

            // clientes frecuentes
            const porCliente = {};
            ventasData.forEach(v => {
                if (!v.cliente_id) return;
                const key = v.cliente_nombre || `Cliente #${v.cliente_id}`;
                porCliente[key] = (porCliente[key] || 0) + 1;
            });
            setClientesFrecuentes(
                Object.entries(porCliente)
                    .map(([nombre, compras]) => ({ nombre, compras }))
                    .sort((a, b) => b.compras - a.compras)
                    .slice(0, 5)
            );

            // ventas por categoría — desde productos
            const porCategoria = {};
            productos.forEach(p => {
                const cat = p.categoria || "Sin categoría";
                porCategoria[cat] = (porCategoria[cat] || 0) + 1;
            });
            setVentasPorCategoria(
                Object.entries(porCategoria).map(([name, value]) => ({ name, value }))
            );

            // top productos por stock vendido (inverso: menor stock = más vendido)
            setTopProductos(
                [...productos]
                    .sort((a, b) => a.stock - b.stock)
                    .slice(0, 5)
                    .map(p => ({ nombre: p.nombre, stock: p.stock }))
            );

        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const chartData = ventas.map(v => ({
        fecha: v.fecha?.slice(0, 10),
        total: Number(v.total || 0)
    }));

    return (
        <Layout>
            <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0 }}>Dashboard</h1>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Resumen de rendimiento del sistema</p>
            </div>

            {errores.length > 0 && (
                <div style={estiloError}>
                    {errores.map((e, i) => <div key={i}>• {e}</div>)}
                </div>
            )}

            <div style={grid4}>
                <Card icon={<Package size={16} />} label="Productos" value={data.productos} />
                <Card icon={<Users size={16} />} label="Clientes" value={data.clientes} />
                <Card icon={<ShoppingCart size={16} />} label="Ventas" value={data.ventas} />
                <Card icon={<DollarSign size={16} />} label="Ingresos" value={`Bs. ${data.ingresos.toFixed(2)}`} />
            </div>

            {/* GRÁFICO LÍNEA */}
            <div style={panel}>
                <h3 style={title}>Ventas (últimos registros)</h3>
                <div style={{ width: "100%", height: 240 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="total" stroke="#4F46E5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* FILA: ventas por empleado + clientes frecuentes */}
            <div style={grid2}>
                <div style={panel}>
                    <h3 style={title}>Ventas por empleado</h3>
                    {ventasPorEmpleado.length === 0
                        ? <p style={vacio}>Sin datos</p>
                        : <div style={{ width: "100%", height: 200 }}>
                            <ResponsiveContainer>
                                <BarChart data={ventasPorEmpleado} layout="vertical">
                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                    <YAxis dataKey="nombre" type="category" tick={{ fontSize: 11 }} width={90} />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#4F46E5" radius={[0, 6, 6, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    }
                </div>

                <div style={panel}>
                    <h3 style={title}>Clientes frecuentes</h3>
                    {clientesFrecuentes.length === 0
                        ? <p style={vacio}>Sin clientes registrados en ventas</p>
                        : clientesFrecuentes.map((c, i) => (
                            <div key={i} style={row}>
                                <div style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{c.nombre}</div>
                                <div style={{ fontSize: 12, color: "#64748B" }}>{c.compras} compra{c.compras !== 1 ? "s" : ""}</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* FILA: top productos + ventas por categoría */}
            <div style={grid2}>
                <div style={panel}>
                    <h3 style={title}>Top productos (menor stock)</h3>
                    {topProductos.length === 0
                        ? <p style={vacio}>Sin datos</p>
                        : topProductos.map((p, i) => (
                            <div key={i} style={row}>
                                <div style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{p.nombre}</div>
                                <div style={{ fontSize: 12, color: p.stock <= 5 ? "#EF4444" : "#64748B" }}>
                                    Stock: {p.stock}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div style={panel}>
                    <h3 style={title}>Productos por categoría</h3>
                    {ventasPorCategoria.length === 0
                        ? <p style={vacio}>Sin datos</p>
                        : <div style={{ width: "100%", height: 200 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={ventasPorCategoria} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name }) => name}>
                                        {ventasPorCategoria.map((_, i) => (
                                            <Cell key={i} fill={COLORES[i % COLORES.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    }
                </div>
            </div>

            {/* STOCK BAJO */}
            <div style={panel}>
                <h3 style={title}>Alerta de stock bajo</h3>
                {productosBajoStock.length === 0 && <p style={vacio}>Sin productos en stock bajo</p>}
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

const grid4 = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 0 };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 16 };
const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, display: "flex", gap: 10, alignItems: "center" };
const panel = { marginTop: 16, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16 };
const title = { fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#0F172A" };
const row = { display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #F1F5F9", alignItems: "center" };
const vacio = { fontSize: 12, color: "#64748B", margin: 0 };
const estiloError = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" };