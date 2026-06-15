export default function VentaModal({ venta, onClose }) {

  if (!venta) return null;

  const format = (n) => Number(n || 0).toFixed(2);

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
        width: "720px",
        background: "#fff",
        borderRadius: "14px",
        padding: "18px",
        border: "1px solid #E2E8F0"
      }}>

        {/* HEADER */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontWeight: 800, fontSize: "16px" }}>
            Venta #{venta.id}
          </h3>

          <p style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
            Total: <b style={{ color: "#0F172A" }}>${format(venta.total)}</b> ·{" "}
            Estado: {venta.cancelada ? "Cancelada" : "Activa"}
          </p>
        </div>

        {/* TABLA DETALLES */}
        <div style={{
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          overflow: "hidden"
        }}>

          <table style={{
            width: "100%",
            fontSize: "13px"
          }}>

            <thead style={{ background: "#F1F5F9" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "12px" }}>
                  Producto
                </th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th style={{ textAlign: "right", padding: "12px" }}>
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {venta.detalles?.map((d, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: "1px solid #E2E8F0"
                  }}
                >
                  <td style={{ padding: "12px", fontWeight: 600 }}>
                    {d.producto_id}
                  </td>

                  <td>
                    {d.cantidad}
                  </td>

                  <td>
                    ${format(d.precio_unitario)}
                  </td>

                  <td style={{
                    textAlign: "right",
                    padding: "12px",
                    fontWeight: 600
                  }}>
                    ${format(d.precio_unitario * d.cantidad)}
                  </td>
                </tr>
              ))}

              {/* TOTAL */}
              <tr style={{ background: "#F8FAFC" }}>
                <td colSpan="3" style={{
                  padding: "12px",
                  textAlign: "right",
                  fontWeight: 800
                }}>
                  Total
                </td>

                <td style={{
                  padding: "12px",
                  textAlign: "right",
                  fontWeight: 800
                }}>
                  ${format(venta.total)}
                </td>
              </tr>

            </tbody>

          </table>
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <button
            onClick={onClose}
            style={{
              background: "#4F46E5",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            Cerrar
          </button>
        </div>

      </div>

    </div>
  );
}