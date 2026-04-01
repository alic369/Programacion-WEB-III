import { getProducts } from "../services/InventoryService";

function ProductList() {
    const products = getProducts()

    return (
        <div>
            <h2>Productos</h2>
            {
                products.length ===0 && <p>No hay productos</p>
            }
            {
                products.map(p => (
                    <div key={p.id}>
                        {p.name} - {p.price} - Stock: {p.stock}
                        </div>
                ))
            }
        </div>
    )
}

export default ProductList