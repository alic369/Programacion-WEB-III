import { useState } from "react";

export default function FormVenta({ productos, clientes, onClose, onSave }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [clienteId, setClienteId] = useState("");
  const [items, setItems] = useState([]);

  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);

  // STOCK DISPONIBLE
  const getStockDisponible = (producto) => {
    const existente = items.find(i => i.producto_id === producto.id);
    const usado = existente ? existente.cantidad : 0;
    return producto.stock - usado;
  };

  const agregar = () => {
    const prod = productos.find(p => p.id === Number(productoId));
    if (!prod) return;

    const cant = Number(cantidad);
    if (cant <= 0) return;

    const existente = items.find(i => i.producto_id === prod.id);

    const stockDisponible = getStockDisponible(prod);

    if (cant > stockDisponible) {
      alert(`Stock insuficiente. Disponible: ${stockDisponible}`);
      return;
    }

    if (existente) {
      setItems(items.map(i =>
        i.producto_id === prod.id
          ? { ...i, cantidad: i.cantidad + cant }
          : i
      ));
    } else {
      setItems([
        ...items,
        {
          producto_id: prod.id,
          cantidad: cant,
          precio_unitario: prod.precio
        }
      ]);
    }

    setProductoId("");
    setCantidad(1);
  };

  const eliminar = (id) => {
    setItems(items.filter(i => i.producto_id !== id));
  };

  const total = items.reduce(
    (a, i) => a + i.cantidad * i.precio_unitario,
    0
  );

  const getNombreProducto = (id) => {
    return productos.find(p => p.id === Number(id))?.nombre || `Producto #${id}`;
  };

  const enviar = () => {
  if (!items.length) return;

  onSave({
    cliente_id: clienteId || null,
    usuario_id: user?.id || null,
    detalles: items
  });
};

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15, 23, 42, 0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>

      <div style={{
        width: "680px",
        background: "#fff",
        borderRadius: "14px",
        padding: "18px",
        border: "1px solid #E2E8F0"
      }}>

        <h3 style={{
          fontSize: "15px",
          fontWeight: 800,
          marginBottom: "12px"
        }}>
          Registrar venta
        </h3>

        {/* CLIENTE */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#64748B" }}>
            Cliente (opcional)
          </label>

          <select
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #E2E8F0",
              borderRadius: "10px",
              marginTop: "4px"
            }}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Sin cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCTO */}
        <div style={{
          display: "flex",
          gap: "10px",
          alignItems: "end",
          marginBottom: "12px"
        }}>

          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#64748B" }}>
              Producto
            </label>

            <select
              value={productoId}
              onChange={(e) => setProductoId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginTop: "4px"
              }}
            >
              <option value="">
                Seleccionar producto (stock disponible)
              </option>

              {productos
                .filter(p => getStockDisponible(p) > 0)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} — Stock: {getStockDisponible(p)}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ width: "90px" }}>
            <label style={{ fontSize: "12px", color: "#64748B" }}>
              Cant.
            </label>

            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginTop: "4px"
              }}
            />
          </div>

          <button
            onClick={agregar}
            style={{
              background: "#4F46E5",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            +
          </button>

        </div>

        {/* ITEMS */}
        <div style={{
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "10px",
          maxHeight: "180px",
          overflowY: "auto"
        }}>

          {items.length === 0 && (
            <p style={{ fontSize: "12px", color: "#94A3B8" }}>
              Sin productos agregados
            </p>
          )}

          {items.map(i => (
            <div
              key={i.producto_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 10px",
                borderBottom: "1px solid #F1F5F9",
                fontSize: "13px"
              }}
            >

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 600, color: "#0F172A" }}>
                  {getNombreProducto(i.producto_id)}
                </span>

                <span style={{ fontSize: "11px", color: "#64748B" }}>
                  Cantidad: {i.cantidad} · Precio: ${i.precio_unitario}
                </span>
              </div>

              <button
                onClick={() => eliminar(i.producto_id)}
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#B91C1C",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Eliminar"
              >
                ✕
              </button>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ fontWeight: 800 }}>
            Total: ${total}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={onClose}>
              Cancelar
            </button>

            <button
              onClick={enviar}
              style={{
                background: "#4F46E5",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "10px"
              }}
            >
              Registrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}