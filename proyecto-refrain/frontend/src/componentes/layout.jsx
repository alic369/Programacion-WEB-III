import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const cerrarSesion = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>

            <Navbar
                user={user}
                cerrarSesion={cerrarSesion}
            />

            <hr />

            <div
                style={{
                    display: "flex",
                    gap: "40px"
                }}
            >

                <Sidebar rol={user.rol} />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}