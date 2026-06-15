export default function ListaProductos({
    productos,
    eliminarProducto,
    activarProducto,
    desactivarProducto,
    editarProducto
}) {

    return (
        <>
            <h2>Productos</h2>
            {
                productos.map((producto) => (

                    <div key={producto.id}>

                        <b>{producto.nombre}</b>

                        <br />

                        Precio: Bs. {producto.precio}

                        <br />

                        Stock: {producto.stock}

                        <br />

                        Categoría: {producto.categoria}

                        <br />

                        Activo: {producto.activo ? "Sí" : "No"}

                        <br />

                        
                        <button
                            onClick={() => eliminarProducto(producto.id)}
                        >
                            Eliminar
                        </button>
                        

                        <button
                            onClick={() => editarProducto(producto)}
                        >
                            Editar
                        </button>                        

                        <br />                        

                        {
                            producto.activo
                            ?
                            <button
                                onClick={() => desactivarProducto(producto.id)}
                            >
                                Desactivar
                            </button>
                            
                            :

                            <button
                                onClick={() => activarProducto(producto.id)}
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