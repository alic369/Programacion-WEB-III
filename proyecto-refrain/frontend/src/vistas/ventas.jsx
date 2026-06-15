import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../componentes/layout";

import ListaVentas from "../componentes/ventas/listaVentas";
import FormVenta from "../componentes/ventas/formVenta";
import VentaModal from "../componentes/ventas/ventaModal";

import { ShoppingCart } from "lucide-react";

export default function Ventas() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [ventaView, setVentaView] = useState(null);

  const [kpis, setKpis] = useState({
    totalVendido: 0,
    maxVentaMes: 0,
    mesTop: ""
  });

  const cargar = async () => {
    const [v, p, c] = await Promise.all([
      api.get("/ventas"),
      api.get("/productos"),
      api.get("/clientes")
    ]);

    let ventasData = v.data || [];

    // FILTRO POR ROL (regla de negocio)
    if (user?.rol === "empleado") {
      ventasData = ventasData.filter(v => v.usuario_id === user.id);
    }

    setVentas(ventasData);
    setProductos(p.data);
    setClientes(c.data);

    calcularKPIs(ventasData);
  };

  const calcularKPIs = (data) => {

    const totalVendido = data.reduce((a, v) => a + Number(v.total || 0), 0);

    let maxVenta = 0;
    let mesCount = {};

    data.forEach(v => {
      const total = Number(v.total || 0);
      if (total > maxVenta) maxVenta = total;

      const mes = new Date(v.fecha).getMonth();
      mesCount[mes] = (mesCount[mes] || 0) + total;
    });

    const mesTop = Object.entries(mesCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    setKpis({
      totalVendido,
      maxVentaMes: maxVenta,
      mesTop: mesTop || "-"
    });
  };

  useEffect(() => {
    cargar();
  }, []);

  const verVenta = async (venta) => {
    const res = await api.get(`/ventas/${venta.id}`);
    setVentaView(res.data);
    setOpenView(true);
  };

  const crearVenta = async (payload) => {
    await api.post("/ventas", {
      ...payload,
      usuario_id: user.id
    });

    setOpenForm(false);
    cargar();
  };

  const cancelarVenta = async (id) => {
    await api.patch(`/ventas/${id}/cancelar`);
    cargar();
  };

  return (
    <Layout>

      <h1>Ventas</h1>

      {/* KPIS REALES */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "10px",
        marginBottom: "16px"
      }}>

        <div style={card}>
          Total vendido<br />
          <b>Bs {kpis.totalVendido}</b>
        </div>

        <div style={card}>
          Mayor venta<br />
          <b>Bs {kpis.maxVentaMes}</b>
        </div>

        <div style={card}>
          Mes top<br />
          <b>{kpis.mesTop}</b>
        </div>

      </div>

      {/* BOTÓN */}
      <button
        onClick={() => setOpenForm(true)}
        style={btn}
      >
        <ShoppingCart size={16} />
        Registrar venta
      </button>

      {/* LISTA */}
      <ListaVentas
        ventas={ventas}
        onView={verVenta}
        onCancel={cancelarVenta}
      />

      {openForm && (
        <FormVenta
          productos={productos}
          clientes={clientes}
          onClose={() => setOpenForm(false)}
          onSave={crearVenta}
        />
      )}

      {openView && (
        <VentaModal
          venta={ventaView}
          onClose={() => setOpenView(false)}
        />
      )}

    </Layout>
  );
}

const card = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "13px"
};

const btn = {
  marginBottom: "12px",
  padding: "10px 12px",
  border: "1px solid #E2E8F0",
  borderRadius: "10px",
  background: "#4F46E5",
  color: "white",
  cursor: "pointer"
};