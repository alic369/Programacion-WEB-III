//Preparacion de comida

function comprarIngredientes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Ingredientes comprados");
            resolve("ingredientes");
        }, 1000);
    });
}

function prepararIngredientes(ingredientes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Ingredientes preparados: ${ingredientes}`);
            resolve("ingredientes preparados");
        }, 1500);
    });
}

function cocinar(preparados) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Cocinando con: ${preparados}`);
            resolve("comida lista");
        }, 2000);
    });
}

function servir(comida) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sirviendo: ${comida}`);
            resolve("Sajta servida");
        }, 1500);
    });
}

comprarIngredientes()
    .then((ingredientes) => prepararIngredientes(ingredientes))
    .then((preparados) => cocinar(preparados))
    .then((comida) => servir(comida))
    .then((resultadoFinal) => {
        console.log(`Termino de cocinar: ${resultadoFinal}`);
    })
    .catch((error) => {
        console.log(`No se pudo terminar: ${error}`);
    });