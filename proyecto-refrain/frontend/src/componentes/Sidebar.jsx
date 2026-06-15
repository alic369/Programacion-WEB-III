import { Link } from "react-router-dom";

export default function Sidebar({ rol }) {

    return (
        <aside>
            {
                rol === "dueno" &&
                <>
                    <button>
                        Inicio
                    </button>

                    <br /><br />

                    <Link to="/dueno">
                        Empleados
                    </Link>

                    <br /><br />

                    <Link to="/categorias">
                        Categorías
                    </Link>

                    <br /><br />

                    <button>
                        Estadisticas
                    </button>

                    <br /><br />
                    
                </>
            }

            {
                rol === "empleado" &&
                <>
                    <Link to="/empleado">
                        Inicio
                    </Link>
                </>
            }

            <button>
                Ventas
            </button>

            <br /><br />

            <Link to="/productos">
                Productos
            </Link>

            <br /><br />

            <Link to="/clientes">
                Clientes
            </Link>

            <br /><br />

            

        </aside>

    );

}