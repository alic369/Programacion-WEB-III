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
        setOpenModal(true);
    };

    const cerrarModal = () => {
        setOpenModal(false);
        setEditando(false);
        setIdEditar(null);
        setNombre("");
        setEmail("");
        setPwdu("");
    };

    const registrarEmpleado = async () => {
        try {
            await api.post("/usuarios/empleado", {
                nombre,
                email,
                pwdu
            });

            cerrarModal();
            cargarEmpleados();

        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    const editarEmpleado = (empleado) => {
        setEditando(true);
        setIdEditar(empleado.id);
        setNombre(empleado.nombre);
        setEmail(empleado.email);
        setOpenModal(true);
    };

    const guardarEdicion = async () => {
        try {
            await api.patch(`/usuarios/${idEditar}`, {
                nombre,
                email
            });

            cerrarModal();
            cargarEmpleados();

        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    const activarEmpleado = async (id) => {
        await api.patch(`/usuarios/${id}/activar`);
        cargarEmpleados();
    };

    const desactivarEmpleado = async (id) => {
        await api.patch(`/usuarios/${id}/desactivar`);
        cargarEmpleados();
    };

    const eliminarEmpleado = async (id) => {
        if (!window.confirm("¿Eliminar empleado?")) return;

        try {
            await api.delete(`/usuarios/${id}`);
            cargarEmpleados();
        } catch (error) {
            console.table(error?.response?.data?.mensaje);
        }
    };

    return (
        <Layout>

            {/* HEADER */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px"
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
                        Empleados
                    </h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Gestión de usuarios del sistema
                    </p>
                </div>

                <button
                    onClick={abrirModalNuevo}
                    style={{
                        background: "#4F46E5",
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        cursor: "pointer"
                    }}
                >
                    + Nuevo empleado
                </button>
            </div>

            {/* LISTA */}
            <ListaEmpleados
                empleados={empleados}
                editarEmpleado={editarEmpleado}
                eliminarEmpleado={eliminarEmpleado}
                activarEmpleado={activarEmpleado}
                desactivarEmpleado={desactivarEmpleado}
            />

            {/* MODAL REAL */}
            {openModal && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(15, 23, 42, 0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{
                        width: "420px",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid #E2E8F0"
                    }}>
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