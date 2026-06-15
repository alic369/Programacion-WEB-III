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

    const cargarCategorias = async () => {
        try {
            const res = await api.get("/categorias");
            const data = res?.data;

            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            console.table(error?.response?.data?.mensaje);
            setCategorias([]);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const registrarCategoria = async () => {
        try {
            await api.post("/categorias", {
                nombre,
                descripcion
            });

            setNombre("");
            setDescripcion("");
            cargarCategorias();

        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    const editarCategoria = (categoria) => {
        setEditando(true);
        setIdEditar(categoria.id);
        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion);
    };

    const guardarEdicion = async () => {
        try {
            await api.patch(`/categorias/${idEditar}`, {
                nombre,
                descripcion
            });

            cancelarEdicion();
            cargarCategorias();

        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setIdEditar(null);
        setNombre("");
        setDescripcion("");
    };

    const activarCategoria = async (id) => {
        await api.patch(`/categorias/${id}/activar`);
        cargarCategorias();
    };

    const desactivarCategoria = async (id) => {
        await api.patch(`/categorias/${id}/desactivar`);
        cargarCategorias();
    };

    const eliminarCategoria = async (id) => {
        if (!window.confirm("¿Eliminar categoría?")) return;

        try {
            await api.delete(`/categorias/${id}`);
            cargarCategorias();
        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    return (
        <Layout>

            {/* HEADER */}
            <div style={{
                marginBottom: "16px",
                paddingBottom: "10px",
                borderBottom: "1px solid #E2E8F0"
            }}>
                <h1 style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    margin: 0,
                    color: "#0F172A"
                }}>
                    Categorías
                </h1>

                <p style={{
                    fontSize: "12px",
                    color: "#64748B",
                    marginTop: "4px",
                    marginBottom: 0
                }}>
                    Gestión de categorías de productos
                </p>
            </div>

            {/* FORM */}
            <div style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "14px",
                marginBottom: "16px"
            }}>
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

            {/* LISTA */}
            <div style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "14px"
            }}>
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