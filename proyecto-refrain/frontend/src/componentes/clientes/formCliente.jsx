export default function FormCliente({
    nombre,
    setNombre,
    email,
    setEmail,
    telefono,
    setTelefono,

    registrarCliente,
    editando,
    guardarEdicion,
    cancelarEdicion
}) {
    return (
        <>
            <h2>
                {
                    editando ?
                    "Editar cliente"
                    :
                    "Registrar cliente"
                }
            </h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />

            <br /><br />

            {
                editando ?
                <>
                    <button onClick={guardarEdicion}>
                        Guardar
                    </button>

                    <button onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                </>
                :
                <button onClick={registrarCliente}>
                    Registrar
                </button>
            }
        </>
    );
}