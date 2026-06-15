export default function FormProducto({
    nombre,
    setNombre,
    precio,
    setPrecio,
    stock,
    setStock,
    categoria_id,
    setCategoria_id,
    categorias,

    registrarProducto,
    editando,
    guardarEdicion,
    cancelarEdicion
}) {
    return (
        <>
            <h2>
                {
                    editando ?
                    "Editar producto"
                    :
                    "Registrar producto"
                }
            </h2>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />

            <select
                value={categoria_id}
                onChange={(e) => setCategoria_id(e.target.value)}
            >
                <option value="">
                    Seleccione categoría
                </option>

                {
                    categorias.map((categoria) => (
                        <option
                            key={categoria.id}
                            value={categoria.id}
                        >
                            {categoria.nombre}
                        </option>
                    ))
                }
            </select>

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

                    <button onClick={registrarProducto}>
                        Registrar
                    </button>
            }
        </>
    );
}