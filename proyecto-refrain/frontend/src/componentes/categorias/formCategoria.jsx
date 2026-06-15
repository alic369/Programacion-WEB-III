export default function FormCategoria({
    nombre,
    setNombre,

    descripcion,
    setDescripcion,

    registrarCategoria,
    editando,
    guardarEdicion,
    cancelarEdicion
}) {
    return (
        <>
            <h2>
                {
                    editando ?
                    "Editar categoría"
                    :
                    "Registrar categoría"
                }
            </h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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

                    <button onClick={registrarCategoria}>
                        Registrar
                    </button>
            }
        </>
    );
}