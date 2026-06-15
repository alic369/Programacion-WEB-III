import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../componentes/layout";

import {
    Package,
    Users,
    ShoppingCart,
    DollarSign,
    AlertTriangle
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function Estadisticas() {

    const [data, setData] = useState({
        productos: 0,
        clientes: 0,
        ventas: 0,
        ingresos: 0
    });

    const [ventas, setVentas] = useState([]);
    const [productosBajoStock, setProductosBajoStock] = useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const [p, c, v] = await Promise.all([
            api.get("/productos"),
            api.get("/clientes"),
            api.get("/ventas")
        ]);

        const productos = p.data || [];
        const clientes = c.data || [];
        const ventasData = v.data || [];

        setVentas(ventasData);

        const ingresos = ventasData.reduce(
            (acc, v) => acc + Number(v.total || 0),
            0
        );

        setData({
            productos: productos.length,
            clientes: clientes.length,
            ventas: ventasData.length,
            ingresos
        });

        setProductosBajoStock(
            productos.filter(p => p.stock <= 5)
        );
    };

    // gráfico simple ventas
    const chartData = ventas.map(v => ({
        fecha: v.fecha?.slice(0, 10),
        total: Number(v.total || 0)
    }));

    return (
        <Layout>

            <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800 }}>
                    Dashboard general
                </h1>
                <p style={{ fontSize: 13, color: "#64748B" }}>
                    Resumen de rendimiento del sistema
                </p>
            </div>

            {/* CARDS KPI */}
            <div style={grid}>
                <Card icon={<Package size={16} />} label="Productos" value={data.productos} />
                <Card icon={<Users size={16} />} label="Clientes" value={data.clientes} />
                <Card icon={<ShoppingCart size={16} />} label="Ventas" value={data.ventas} />
                <Card icon={<DollarSign size={16} />} label="Ingresos" value={`Bs. ${data.ingresos}`} />
            </div>

            {/* GRAFICO */}
            <div style={panel}>
                <h3 style={title}>Ventas (últimos registros)</h3>

                <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <XAxis dataKey="fecha" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="total" stroke="#4F46E5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* STOCK BAJO */}
            <div style={panel}>
                <h3 style={title}>Alerta de stock bajo</h3>

                {productosBajoStock.map(p => (
                    <div key={p.id} style={row}>
                        <AlertTriangle size={14} />
                        <div>
                            <div style={{ fontWeight: 700 }}>{p.nombre}</div>
                            <div style={sub}>Stock: {p.stock}</div>
                        </div>
                    </div>
                ))}
            </div>

        </Layout>
    );
}

/* COMPONENTE CARD */
function Card({ icon, label, value }) {
    return (
        <div style={card}>
            {icon}
            <div>
                <p style={labelStyle}>{label}</p>
                <p style={valueStyle}>{value}</p>
            </div>
        </div>
    );
}

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12
};

const card = {
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    padding: 14,
    display: "flex",
    gap: 10,
    alignItems: "center"
};

const panel = {
    marginTop: 16,
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    padding: 16
};

const title = {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10
};

const labelStyle = { fontSize: 12, color: "#64748B", margin: 0 };
const valueStyle = { fontSize: 16, fontWeight: 800, margin: 0 };

const row = {
    display: "flex",
    gap: 10,
    padding: "8px 0",
    borderBottom: "1px solid #F1F5F9"
};

const sub = {
    fontSize: 11,
    color: "#94A3B8"
};