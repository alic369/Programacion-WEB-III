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

    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState("");

    const cargarEmpleados = async () => {
        try {
            const { data } = await api.get("/usuarios/empleados");
            setEmpleados(data);
        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const abrirModalNuevo = () => {
        setEditando(false);
        setIdEditar(null);
        setNombre("");
        setEmail("");
        setPwdu("");
        setError("");
        setOpenModal(true);
    };

    const cerrarModal = () => {
        setOpenModal(false);
        setEditando(false);
        setIdEditar(null);
        setNombre("");
        setEmail("");
        setPwdu("");
        setError("");
    };

    const registrarEmpleado = async () => {
        try {
            setError("");

            await api.post("/usuarios/empleado", {
                nombre,
                email,
                pwdu
            });

            cerrarModal();
            cargarEmpleados();

        } catch (error) {
            setError(error?.response?.data?.mensaje || "Error al registrar");
        }
    };

    const editarEmpleado = (empleado) => {
        setEditando(true);
        setIdEditar(empleado.id);
        setNombre(empleado.nombre);
        setEmail(empleado.email);
        setPwdu("");
        setOpenModal(true);
    };

    const guardarEdicion = async () => {
        try {
            setError("");

            await api.patch(`/usuarios/${idEditar}`, {
                nombre,
                email
            });

            cerrarModal();
            cargarEmpleados();

        } catch (error) {
            setError(error?.response?.data?.mensaje || "Error al editar");
        }
    };

    const empleadosActivos = empleados.filter(e => e.activo).length;

    return (
        <Layout>

            {/* HEADER */}
            <div style={header}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
                        Empleados
                    </h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Gestión de usuarios
                    </p>
                </div>

                <button onClick={abrirModalNuevo} style={btn}>
                    + Nuevo empleado
                </button>
            </div>

            {/* CARDS */}
            <div style={grid}>
                <div style={card}>Total: {empleados.length}</div>
                <div style={card}>Activos: {empleadosActivos}</div>
            </div>

            <ListaEmpleados
                empleados={empleados}
                editarEmpleado={editarEmpleado}
                eliminarEmpleado={() => {}}
                activarEmpleado={() => {}}
                desactivarEmpleado={() => {}}
            />

            {openModal && (
                <div style={overlay}>
                    <div style={modal}>
                        {error && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "8px" }}>
                                {error}
                            </div>
                        )}

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
                            cancelarEdicion={cerrarModal}
                        />
                    </div>
                </div>
            )}

        </Layout>
    );
}

const header = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "16px"
};

const card = {
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    padding: "12px"
};

const btn = {
    background: "#4F46E5",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: 700
};

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const modal = {
    width: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #E2E8F0"
};