import { getProducts } from "../services/InventoryService"

function InventoryPage() {
    const products = getProducts()

    return (
        <div>
            <h2>Inventario</h2>
            <ul>
                {
                    products.map(
                        p => (
                            <li key={p.id}>
                                {p.name} - Stock: {p.stock}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default InventoryPage