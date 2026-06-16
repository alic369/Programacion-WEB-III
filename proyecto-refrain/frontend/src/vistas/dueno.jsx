import { useEffect, useState } from "react";
import api from "../services/api.js";
import Layout from "../componentes/layout.jsx";
import FormEmpleado from "../componentes/usuarios/formEmpleado.jsx";
import ListaEmpleados from "../componentes/usuarios/listaEmpleados.jsx";
import { extraerErrores } from "../services/errores.js";

export default function Dueno() {
    const [empleados, setEmpleados] = useState([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pwdu, setPwdu] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [errores, setErrores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");

    const limpiarMensajes = () => { setErrores([]); setMensajeExito(""); };

    const mostrarExito = (msg) => {
        setMensajeExito(msg);
        setTimeout(() => setMensajeExito(""), 3000);
    };

    const cargarEmpleados = async () => {
        try {
            const { data } = await api.get("/usuarios/empleados");
            setEmpleados(data);
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    useEffect(() => { cargarEmpleados(); }, []);

    const abrirModalNuevo = () => {
        limpiarMensajes();
        setEditando(false);
        setIdEditar(null);
        setNombre(""); setEmail(""); setPwdu("");
        setOpenModal(true);
    };

    const cerrarModal = () => {
        limpiarMensajes();
        setOpenModal(false);
        setEditando(false);
        setIdEditar(null);
        setNombre(""); setEmail(""); setPwdu("");
    };

    const registrarEmpleado = async () => {
        limpiarMensajes();
        try {
            await api.post("/usuarios/empleado", { nombre, email, pwdu });
            cerrarModal();
            mostrarExito("Empleado registrado correctamente");
            cargarEmpleados();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const editarEmpleado = (empleado) => {
        limpiarMensajes();
        setEditando(true);
        setIdEditar(empleado.id);
        setNombre(empleado.nombre);
        setEmail(empleado.email);
        setPwdu("");
        setOpenModal(true);
    };

    const guardarEdicion = async () => {
        limpiarMensajes();
        try {
            await api.patch(`/usuarios/${idEditar}`, { nombre, email });
            cerrarModal();
            mostrarExito("Empleado actualizado correctamente");
            cargarEmpleados();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const activarEmpleado = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/usuarios/${id}/activar`);
            mostrarExito("Empleado activado");
            cargarEmpleados();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const desactivarEmpleado = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/usuarios/${id}/desactivar`);
            mostrarExito("Empleado desactivado");
            cargarEmpleados();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const empleadosActivos = empleados.filter(e => e.activo).length;

    return (
        <Layout>
            <div style={estiloHeader}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
                        Empleados
                    </h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Gestión de usuarios
                    </p>
                </div>
                <button onClick={abrirModalNuevo} style={btnPrimary}>
                    + Nuevo empleado
                </button>
            </div>

            {mensajeExito && <div style={estiloExito}>{mensajeExito}</div>}
            {errores.length > 0 && (
                <div style={estiloError}>
                    {errores.map((e, i) => <div key={i}>• {e}</div>)}
                </div>
            )}

            <div style={estiloGrid}>
                <div style={estiloCard}>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>Total</div>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A" }}>{empleados.length}</div>
                </div>
                <div style={estiloCard}>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>Activos</div>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#16A34A" }}>{empleadosActivos}</div>
                </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px" }}>
                <ListaEmpleados
                    empleados={empleados}
                    editarEmpleado={editarEmpleado}
                    activarEmpleado={activarEmpleado}
                    desactivarEmpleado={desactivarEmpleado}
                />
            </div>

            {openModal && (
                <div style={estiloOverlay}>
                    <div style={estiloModal}>
                        {errores.length > 0 && (
                            <div style={{ ...estiloError, marginBottom: "12px" }}>
                                {errores.map((e, i) => <div key={i}>• {e}</div>)}
                            </div>
                        )}
                        <FormEmpleado
                            nombre={nombre} setNombre={setNombre}
                            email={email} setEmail={setEmail}
                            pwdu={pwdu} setPwdu={setPwdu}
                            registrarEmpleado={registrarEmpleado}
                            editando={editando}
                            guardarEdicion={guardarEdicion}
                            cancelarEdicion={cerrarModal}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}

const estiloHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" };
const estiloGrid = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" };
const estiloCard = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px" };
const estiloOverlay = { position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 };
const estiloModal = { width: "420px", background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8F0" };
const estiloExito = { background: "#ECFDF5", border: "1px solid #6EE7B7", color: "#047857", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px" };
const estiloError = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", display: "flex", flexDirection: "column", gap: "4px" };
const btnPrimary = { background: "#4F46E5", color: "white", border: "none", padding: "8px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, cursor: "pointer" };