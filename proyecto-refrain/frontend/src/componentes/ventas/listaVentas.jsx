import { Eye, XCircle } from "lucide-react";

export default function ListaVentas({ ventas, onView, onCancel }) {

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E2E8F0",
      borderRadius: "12px",
      overflow: "hidden"
    }}>

      <table style={{ width: "100%", fontSize: "13px" }}>
        <thead style={{ background: "#F1F5F9" }}>
          <tr>
            <th style={{ textAlign: "left", padding: "12px" }}>ID</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th style={{ textAlign: "right", padding: "12px" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map(v => (
            <tr
              key={v.id}
              style={{
                borderTop: "1px solid #E2E8F0",
                background: v.cancelada ? "#FAFAFA" : "#fff"
              }}
            >

              <td style={{ padding: "12px", fontWeight: 600 }}>
                #{v.id}
              </td>

              <td style={{ color: "#0F172A", fontWeight: 600 }}>
                ${v.total}
              </td>

              <td>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  background: v.cancelada ? "#FEE2E2" : "#DCFCE7",
                  color: v.cancelada ? "#B91C1C" : "#166534"
                }}>
                  {v.cancelada ? "Cancelada" : "Activa"}
                </span>
              </td>

              <td style={{ color: "#64748B" }}>
                {new Date(v.fecha).toLocaleDateString()}
              </td>

              <td style={{ textAlign: "right", padding: "12px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px"
                }}>

                  <button
                    onClick={() => onView(v)}
                    style={{
                      border: "1px solid #E2E8F0",
                      background: "#F8FAFC",
                      padding: "7px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    <Eye size={16} color="#334155" />
                  </button>

                  {!v.cancelada && (
                    <button
                      onClick={() => onCancel(v.id)}
                      style={{
                        border: "1px solid #FCA5A5",
                        background: "#FEF2F2",
                        padding: "7px",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      <XCircle size={16} color="#B91C1C" />
                    </button>
                  )}

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}