import { useEffect, useState } from "react";

import api from "../services/api.js";

import Layout from "../componentes/layout.jsx";

import FormProducto from "../componentes/productos/formProducto";
import ListaProductos from "../componentes/productos/listaProductos";

export default function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria_id, setCategoria_id] = useState("");

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const cargarProductos = async () => {
        try {
            const { data } = await api.get("/productos");
            setProductos(data);
        } catch (error) {
            console.table(error.response.data.mensaje);
        }
    };

    const cargarCategorias = async () => {
        try {
            const { data } = await api.get("/categorias/activos");
            setCategorias(data);
        } catch (error) {
            console.table(error.response.data.mensaje);
        }
    };

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const registrarProducto = async () => {
        try {
            await api.post("/productos", {
                nombre,
                precio,
                stock,
                categoria_id
            });

            setNombre("");
            setPrecio("");
            setStock("");
            setCategoria_id("");
            cargarProductos();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const editarProducto = (producto) => {
        setEditando(true);
        setIdEditar(producto.id);

        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setCategoria_id(producto.categoria_id);
    };

    const guardarEdicion = async () => {
        try {
            await api.patch(`/productos/${idEditar}`, {
                nombre,
                precio,
                stock,
                categoria_id
            });

            cancelarEdicion();
            cargarProductos();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setIdEditar(null);

        setNombre("");
        setPrecio("");
        setStock("");
        setCategoria_id("");
    };

    const activarProducto = async (id) => {
        try {
            await api.patch(`/productos/${id}/activar`);
            cargarProductos();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const desactivarProducto = async (id) => {
        try {
            await api.patch(`/productos/${id}/desactivar`);
            cargarProductos();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Eliminar producto?"))
            return;

        try {
            await api.delete(`/productos/${id}`);
            cargarProductos();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    return (
        <Layout>
            <h1>Productos</h1>

            <FormProducto
                nombre={nombre}
                setNombre={setNombre}

                precio={precio}
                setPrecio={setPrecio}

                stock={stock}
                setStock={setStock}

                categoria_id={categoria_id}
                setCategoria_id={setCategoria_id}

                categorias={categorias}

                registrarProducto={registrarProducto}

                editando={editando}
                guardarEdicion={guardarEdicion}
                cancelarEdicion={cancelarEdicion}
            />

            <hr />

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