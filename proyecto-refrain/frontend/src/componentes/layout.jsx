import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
    const navigate = useNavigate();

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    useEffect(() => {
        if (!user?.rol) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    const cerrarSesion = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    if (!user?.rol) return null;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F1F5F9",
            }}
        >
            <Navbar
                user={user}
                cerrarSesion={cerrarSesion}
            />

            <div
                style={{
                    display: "flex",
                    minHeight: "100vh",
                    paddingTop: "64px",
                }}
            >
                <Sidebar rol={user.rol} />

                <main
                    style={{
                        flex: 1,
                        padding: "32px",
                        minWidth: 0,
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}