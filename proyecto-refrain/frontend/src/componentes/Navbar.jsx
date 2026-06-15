export default function Navbar({ user, cerrarSesion }) {

    return (

        <header>

            <h2>Refrain</h2>

            <p>
                {user.nombre} | {user.rol}
            </p>

            <button onClick={cerrarSesion}>
                Cerrar sesión
            </button>

        </header>

    );

}