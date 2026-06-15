import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        if (user.rol === "dueno")
            navigate("/dueno", { replace: true });

        else
            navigate("/empleado", { replace: true });

    }, [navigate]);

    const login = async () => {
        try {
            const { data } = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.rol === "dueno")
                navigate("/dueno", { replace: true });
            else
                navigate("/empleado", { replace: true });

        } catch {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={login}>
                Ingresar
            </button>
        </div>
    );
}