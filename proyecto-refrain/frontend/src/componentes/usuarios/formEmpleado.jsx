export default function FormEmpleado({
    nombre,
    setNombre,
    email,
    setEmail,
    pwdu,
    setPwdu,
    
    registrarEmpleado,

    editando,
    guardarEdicion,
    cancelarEdicion
}) {
    return (
        <>
            <h2>                
                {
                    editando ?
                    "Editar empleado"
                    :
                    "Registrar empleado"
                }
            </h2>

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

            {
                !editando &&
                <>                
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={pwdu}
                        onChange={(e) => setPwdu(e.target.value)}
                    />
                    <br />
                </>
            }

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

                    <button onClick={registrarEmpleado}>
                        Registrar
                    </button>
            }
        </>
    );

}