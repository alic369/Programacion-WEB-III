import { useEffect, useState } from "react";

import api from "../services/api.js";

import Layout from "../componentes/layout.jsx";

import FormEmpleado from "../componentes/usuarios/formEmpleado.jsx";
import ListaEmpleados from "../componentes/usuarios/listaEmpleados.jsx";

export default function Dueno() {

    const [empleados, setEmpleados] = useState([]);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pwdu, setPwdu] = useState("");

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const cargarEmpleados = async () => {

        try {
            const { data } = await api.get("/usuarios/empleados");
            setEmpleados(data);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const registrarEmpleado = async () => {

        try {
            await api.post("/usuarios/empleado", {
                nombre,
                email,
                pwdu
            });

            setNombre("");
            setEmail("");
            setPwdu("");

            cargarEmpleados();

        } catch (error) {

            alert("Error");

        }

    };

    const editarEmpleado = (empleado) => {
        setEditando(true);
        setIdEditar(empleado.id);
        setNombre(empleado.nombre);
        setEmail(empleado.email);
    };

    const guardarEdicion = async () => {
        await api.patch(`/usuarios/${idEditar}`, {
            nombre,
            email
        });

        cancelarEdicion();

        cargarEmpleados();
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setIdEditar(null);

        setNombre("");
        setEmail("");
        setPwdu("");
    };

    const eliminarEmpleado = async (id) => {
        if (!window.confirm("¿Eliminar empleado?"))
            return;

        await api.delete(`/usuarios/${id}`);
        cargarEmpleados();
    };

    const activarEmpleado = async (id) => {
        await api.patch(`/usuarios/${id}/activar`);
        cargarEmpleados();
    };

    const desactivarEmpleado = async (id) => {
        await api.patch(`/usuarios/${id}/desactivar`);
        cargarEmpleados();
    };

    return (

        <Layout>

            <h1>Administración de empleados</h1>

            <FormEmpleado
                nombre={nombre}
                setNombre={setNombre}

                email={email}
                setEmail={setEmail}

                pwdu={pwdu}
                setPwdu={setPwdu}

                registrarEmpleado={registrarEmpleado}

                editando={editando}
                guardarEdicion={guardarEdicion}
                cancelarEdicion={cancelarEdicion}
            />

            <hr />

            <ListaEmpleados
                empleados={empleados}
                editarEmpleado={editarEmpleado}
                eliminarEmpleado={eliminarEmpleado}
                activarEmpleado={activarEmpleado}
                desactivarEmpleado={desactivarEmpleado}
            />
            
        </Layout>

    );

}