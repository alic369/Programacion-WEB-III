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

                    <Link to="/dueno">
                        Empleados
                    </Link>

                    <br /><br />

                    <Link to="/categorias">
                        Categorías
                    </Link>

                    <button>
                        Estadisticas
                    </button>
                    
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

            <button>
                Productos
            </button>

            <br /><br />

            <button>
                Clientes
            </button>

            <br /><br />

            

        </aside>

    );

}