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
            const { data } = await api.get("/categorias");
            setCategorias(data);
        } catch (error) {
            console.table(error.response.data.mensaje);
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
            console.table(error.response.data.mensaje);
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
            console.table(error.response.data.mensaje);
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
        if (!window.confirm("¿Eliminar categoría?"))
            return;

        try {
            await api.delete(`/categorias/${id}`);
            cargarCategorias();
        } catch (error) {
            console.table(error.response.data.mensaje);
        }
    };

    

    return (
        <Layout>
            <h1> Categorías </h1>

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

            <hr />

            <ListaCategorias
                categorias={categorias}
                editarCategoria={editarCategoria}
                eliminarCategoria={eliminarCategoria}
                activarCategoria={activarCategoria}
                desactivarCategoria={desactivarCategoria}
            />
        </Layout>
    );
}