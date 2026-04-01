import { useState } from "react";
import { addProduct } from "../services/InventoryService";

function ProductForm( { onAdd }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        addProduct({
            name,
            price,
            stock
        })

        onAdd()

        setName("")
        setPrice("")
        setStock("")
    }

    return (
        <form onSubmit={ handleSubmit }>
            <input placeholder="Nombre" value={name} onChange={ e=> setName(e.target.value)} />
            <input placeholder="Precio" value={price} onChange={ e=> setPrice(e.target.value)} />
            <input placeholder="Stock" value={stock} onChange={ e=> setStock(e.target.value)} />

            <button type="submit">Agregar</button>
        </form>
    )
}

export default ProductForm