import { useEffect, useState } from "react";

import api from "../services/api";

import Layout from "../componentes/layout";

import FormCliente from "../componentes/clientes/formCliente";
import ListaClientes from "../componentes/clientes/listaClientes";

export default function Clientes() {

    const [clientes, setClientes] = useState([]);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const cargarClientes = async () => {
        try {
            const { data } = await api.get("/cliente");
            setClientes(data);
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const registrarCliente = async () => {
        try {
            await api.post("/cliente", {
                nombre,
                email,
                telefono
            });
            setNombre("");
            setEmail("");
            setTelefono("");

            cargarClientes();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const editarCliente = (cliente) => {
        setEditando(true);
        setIdEditar(cliente.id);
        setNombre(cliente.nombre);
        setEmail(cliente.email);
        setTelefono(cliente.telefono);
    };

    const guardarEdicion = async () => {
        try {
            await api.patch(`/cliente/${idEditar}`, {
                nombre,
                email,
                telefono
            });

            cancelarEdicion();
            cargarClientes();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setIdEditar(null);

        setNombre("");
        setEmail("");
        setTelefono("");
    };

    const eliminarCliente = async (id) => {
        if (!window.confirm("¿Eliminar cliente?"))
            return;

        try {
            await api.delete(`/cliente/${id}`);
            cargarClientes();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    return (

        <Layout>

            <h1>Clientes</h1>

            <FormCliente
                nombre={nombre}
                setNombre={setNombre}

                email={email}
                setEmail={setEmail}

                telefono={telefono}
                setTelefono={setTelefono}

                registrarCliente={registrarCliente}

                editando={editando}
                guardarEdicion={guardarEdicion}
                cancelarEdicion={cancelarEdicion}
            />

            <hr />

            <ListaClientes
                clientes={clientes}

                editarCliente={editarCliente}
                eliminarCliente={eliminarCliente}
            />

        </Layout>

    );

}