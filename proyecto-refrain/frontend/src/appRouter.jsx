import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./vistas/login.jsx";
import Dueno from "./vistas/dueno.jsx";
import Empleado from "./vistas/empleado.jsx";
import Categorias from "./vistas/categorias.jsx";
import Productos from "./vistas/productos.jsx";
import Clientes from "./vistas/clientes.jsx";

import RutaPrivada from "./componentes/rutaPrivada.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login />
                    } 
                />

                <Route
                    path="/dueno"
                    element={
                        <RutaPrivada rol="dueno">
                            <Dueno />
                        </RutaPrivada>
                    }
                />

                <Route
                    path="/empleado"
                    element={
                        <RutaPrivada rol="empleado">
                            <Empleado />
                        </RutaPrivada>
                    }
                />

                <Route
                    path="/categorias"
                    element={
                        <RutaPrivada>
                            <Categorias />
                        </RutaPrivada>
                    }
                />

                <Route
                    path="/productos"
                    element={
                        <RutaPrivada>
                            <Productos />
                        </RutaPrivada>
                    }
                />

                <Route
                    path="/clientes"
                    element={
                        <RutaPrivada>
                            <Clientes />
                        </RutaPrivada>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;