import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Dueno() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [empleados, setEmpleados] = useState([]);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pwdu, setPwdu] = useState("");

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

            alert("Empleado registrado");

        } catch (error) {
            if (error.response)
                alert(JSON.stringify(error.response.data));
            else
                alert("Error");
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>

            <h1>Panel Dueño</h1>

            <p>Bienvenido {user.nombre}</p>

            <button onClick={cerrarSesion}>
                Cerrar sesión
            </button>

            <hr />

            --- Vista empleado---
            <h2>Registrar empleado</h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <br />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Contraseña"
                value={pwdu}
                onChange={(e) => setPwdu(e.target.value)}
            />

            <br />

            <button onClick={registrarEmpleado}>
                Registrar
            </button>

            <hr />

            #--- Vista empleados ---#
            <h2>Empleados</h2>
            {
                empleados.map((empleado) => (

                    <div key={empleado.id}>

                        <b>{empleado.nombre}</b>

                        <br />

                        {empleado.email}

                        <hr />

                    </div>

                ))
            }

        </div>
    );
}