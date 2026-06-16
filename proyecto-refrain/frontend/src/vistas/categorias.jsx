import { useEffect, useState } from "react";
import api from "../services/api.js";
import Layout from "../componentes/layout.jsx";
import FormCategoria from "../componentes/categorias/formCategoria";
import ListaCategorias from "../componentes/categorias/listaCategorias";

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [errores, setErrores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");

    const limpiarMensajes = () => {
        setErrores([]);
        setMensajeExito("");
    };

    const mostrarExito = (msg) => {
        setMensajeExito(msg);
        setTimeout(() => setMensajeExito(""), 3000);
    };

    // convierte la respuesta del back en array de strings legibles
    const extraerErrores = (error) => {
        const data = error?.response?.data;
        if (data?.errores) return data.errores.map(e => e.msg);
        if (data?.error) return [data.error];
        return ["Ocurrió un error inesperado"];
    };

    const cargarCategorias = async () => {
        try {
            const res = await api.get("/categorias");
            setCategorias(Array.isArray(res?.data) ? res.data : []);
        } catch (error) {
            setErrores(extraerErrores(error));
            setCategorias([]);
        }
    };

    useEffect(() => { cargarCategorias(); }, []);

    const registrarCategoria = async () => {
        limpiarMensajes();
        try {
            await api.post("/categorias", { nombre, descripcion });
            setNombre("");
            setDescripcion("");
            mostrarExito("Categoría registrada correctamente");
            cargarCategorias();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const editarCategoria = (categoria) => {
        limpiarMensajes();
        setEditando(true);
        setIdEditar(categoria.id);
        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion);
    };

    const guardarEdicion = async () => {
        limpiarMensajes();
        try {
            await api.patch(`/categorias/${idEditar}`, { nombre, descripcion });
            cancelarEdicion();
            mostrarExito("Categoría actualizada correctamente");
            cargarCategorias();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const cancelarEdicion = () => {
        limpiarMensajes();
        setEditando(false);
        setIdEditar(null);
        setNombre("");
        setDescripcion("");
    };

    const activarCategoria = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/categorias/${id}/activar`);
            mostrarExito("Categoría activada");
            cargarCategorias();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const desactivarCategoria = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/categorias/${id}/desactivar`);
            mostrarExito("Categoría desactivada");
            cargarCategorias();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const eliminarCategoria = async (id) => {
        if (!window.confirm("¿Eliminar categoría?")) return;
        limpiarMensajes();
        try {
            await api.delete(`/categorias/${id}`);
            mostrarExito("Categoría eliminada");
            cargarCategorias();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    return (
        <Layout>
            <div style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" }}>
                <h1 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                    Categorías
                </h1>
                <p style={{ fontSize: "12px", color: "#64748B", marginTop: "4px", marginBottom: 0 }}>
                    Gestión de categorías de productos
                </p>
            </div>

            {/* MENSAJES GLOBALES */}
            {mensajeExito && (
                <div style={estiloExito}>{mensajeExito}</div>
            )}
            {errores.length > 0 && (
                <div style={estiloError}>
                    {errores.map((e, i) => <div key={i}>• {e}</div>)}
                </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
                <FormCategoria
                    nombre={nombre}
                    setNombre={setNombre}
                    descripcion={descripcion}
                    setDescripcion={setDescripcion}
                    registrarCategoria={registrarCategoria}
                    editando={editando}
                    guardarEdicion={guardarEdicion}
                    cancelarEdicion={cancelarEdicion}
                />
            </div>

            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px" }}>
                <ListaCategorias
                    categorias={categorias}
                    editarCategoria={editarCategoria}
                    eliminarCategoria={eliminarCategoria}
                    activarCategoria={activarCategoria}
                    desactivarCategoria={desactivarCategoria}
                />
            </div>
        </Layout>
    );
}

const estiloExito = {
    background: "#ECFDF5",
    border: "1px solid #6EE7B7",
    color: "#047857",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "12px"
};

const estiloError = {
    background: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#B91C1C",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
};