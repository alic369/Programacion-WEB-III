export default function ListaCategorias({
    categorias,
    editarCategoria,
    eliminarCategoria,
    activarCategoria,
    desactivarCategoria
}) {
    return (
        <>
            <h2> Categorías </h2>
            {
                categorias.map((categoria) => (

                    <div key={categoria.id}>

                        <b> {categoria.nombre} </b>

                        <br />

                        {categoria.descripcion}

                        <br /><br />

                        <button
                            onClick={() => editarCategoria(categoria)}
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => eliminarCategoria(categoria.id)}
                        >
                            Eliminar
                        </button>

                        <br />
                        {
                            categoria.activo
                            ?
                            <button
                                onClick={() => desactivarCategoria(categoria.id)}
                            >
                                Desactivar
                            </button>
                            
                            :

                            <button
                                onClick={() => activarCategoria(categoria.id)}
                            >
                                Activar
                            </button>
                        }

                        <hr />

                    </div>
                ))
            }
        </>
    );
}