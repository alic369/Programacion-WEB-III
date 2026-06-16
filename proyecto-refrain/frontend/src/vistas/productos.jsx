import { useEffect, useState } from "react";
import api from "../services/api.js";
import Layout from "../componentes/layout.jsx";
import FormProducto from "../componentes/productos/formProducto";
import ListaProductos from "../componentes/productos/listaProductos";
import { extraerErrores } from "../services/errores.js";

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria_id, setCategoria_id] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [errores, setErrores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");

    const limpiarMensajes = () => { setErrores([]); setMensajeExito(""); };

    const mostrarExito = (msg) => {
        setMensajeExito(msg);
        setTimeout(() => setMensajeExito(""), 3000);
    };

    const cargarProductos = async () => {
        try {
            const { data } = await api.get("/productos");
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const cargarCategorias = async () => {
        try {
            const { data } = await api.get("/categorias/activos");
            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const registrarProducto = async () => {
        limpiarMensajes();
        try {
            await api.post("/productos", { nombre, precio, stock, categoria_id });
            setNombre(""); setPrecio(""); setStock(""); setCategoria_id("");
            mostrarExito("Producto registrado correctamente");
            cargarProductos();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const editarProducto = (producto) => {
        limpiarMensajes();
        setEditando(true);
        setIdEditar(producto.id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setCategoria_id(producto.categoria_id);
    };

    const guardarEdicion = async () => {
        limpiarMensajes();
        try {
            await api.patch(`/productos/${idEditar}`, { nombre, precio, stock, categoria_id });
            cancelarEdicion();
            mostrarExito("Producto actualizado correctamente");
            cargarProductos();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const cancelarEdicion = () => {
        limpiarMensajes();
        setEditando(false);
        setIdEditar(null);
        setNombre(""); setPrecio(""); setStock(""); setCategoria_id("");
    };

    const activarProducto = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/productos/${id}/activar`);
            mostrarExito("Producto activado");
            cargarProductos();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const desactivarProducto = async (id) => {
        limpiarMensajes();
        try {
            await api.patch(`/productos/${id}/desactivar`);
            mostrarExito("Producto desactivado");
            cargarProductos();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Eliminar producto?")) return;
        limpiarMensajes();
        try {
            await api.delete(`/productos/${id}`);
            mostrarExito("Producto eliminado");
            cargarProductos();
        } catch (error) {
            setErrores(extraerErrores(error));
        }
    };

    return (
        <Layout>
            <div style={estiloHeader}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
                        Productos
                    </h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Gestión de productos
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
                <FormProducto
                    nombre={nombre} setNombre={setNombre}
                    precio={precio} setPrecio={setPrecio}
                    stock={stock} setStock={setStock}
                    categoria_id={categoria_id} setCategoria_id={setCategoria_id}
                    categorias={categorias}
                    registrarProducto={registrarProducto}
                    editando={editando}
                    guardarEdicion={guardarEdicion}
                    cancelarEdicion={cancelarEdicion}
                />
            </div>

            <ListaProductos
                productos={productos}
                editarProducto={editarProducto}
                eliminarProducto={eliminarProducto}
                activarProducto={activarProducto}
                desactivarProducto={desactivarProducto}
            />
        </Layout>
    );
}

const estiloHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid #E2E8F0" };
const estiloExito = { background: "#ECFDF5", border: "1px solid #6EE7B7", color: "#047857", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px" };
const estiloError = { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" };