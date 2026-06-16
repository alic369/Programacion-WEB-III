import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../componentes/layout";
import FormCliente from "../componentes/clientes/formCliente";
import ListaClientes from "../componentes/clientes/listaClientes";
import { extraerErrores } from "../services/errores.js";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [errores, setErrores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");

    const limpiarMensajes = () => { setErrores([]); setMensajeExito(""); };

    const mostrarExito = (msg) => {
        setMensajeExito(msg);
        setTimeout(() => setMensajeExito(""), 3000);
    };

    const cargarClientes = async () => {
        try {
            const { data } = await api.get("/clientes");
            setClientes(Array.isArray(data) ? data : []);
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    useEffect(() => { cargarClientes(); }, []);

    const registrarCliente = async () => {
        limpiarMensajes();
        try {
            await api.post("/clientes", { nombre, email, telefono });
            setNombre(""); setEmail(""); setTelefono("");
            mostrarExito("Cliente registrado correctamente");
            cargarClientes();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const editarCliente = (cliente) => {
        limpiarMensajes();
        setEditando(true);
        setIdEditar(cliente.id);
        setNombre(cliente.nombre);
        setEmail(cliente.email);
        setTelefono(cliente.telefono);
    };

    const guardarEdicion = async () => {
        limpiarMensajes();
        try {
            await api.patch(`/clientes/${idEditar}`, { nombre, email, telefono });
            cancelarEdicion();
            mostrarExito("Cliente actualizado correctamente");
            cargarClientes();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const cancelarEdicion = () => {
        limpiarMensajes();
        setEditando(false);
        setIdEditar(null);
        setNombre(""); setEmail(""); setTelefono("");
    };

    const eliminarCliente = async (id) => {
        if (!window.confirm("¿Eliminar cliente?")) return;
        limpiarMensajes();
        try {
            await api.delete(`/clientes/${id}`);
            mostrarExito("Cliente eliminado");
            cargarClientes();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    return (
        <Layout>
            <div style={estiloHeader}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
                        Clientes
                    </h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Gestión de clientes
                    </p>
                </div>
            </div>

            {mensajeExito && <div style={estiloExito}>{mensajeExito}</div>}
            {errores.length > 0 && (
                <div style={estiloError}>
                    {errores.map((e, i) => <div key={i}>• {e}</div>)}
                </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
                <FormCliente
                    nombre={nombre} setNombre={setNombre}
                    email={email} setEmail={setEmail}
                    telefono={telefono} setTelefono={setTelefono}
                    registrarCliente={registrarCliente}
                    editando={editando}
                    guardarEdicion={guardarEdicion}
                    cancelarEdicion={cancelarEdicion}
                />
            </div>

            <ListaClientes
                clientes={clientes}
                editarCliente={editarCliente}
                eliminarCliente={eliminarCliente}
            />
        </Layout>
    );
}

const estiloHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" };
const estiloExito = { background: "#ECFDF5", border: "1px solid #6EE7B7", color: "#047857", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px" };
const estiloError = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" };