import { Navigate } from "react-router-dom";

export default function RutaPrivada({ children, rol }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (rol && user.rol !== rol) {
        return <Navigate to="/login" replace />;
    }

    return children;
}