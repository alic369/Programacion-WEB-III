let products = []

export function getProducts() {
    return products
}

/*
return [
        {
            id: 1,
            name: "Producto A",
            stock: 10
        },
        {
            id: 2,
            name: "Producto B",
            stock: 5
        }
    ]
*/

export function addProduct(product) {
    products.push({
        id: Date.now(),
        ...product
    })
}