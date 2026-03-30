function leerArchivo(nombre) {
    return new Promise(resolve => {
        setTimeout(() => {
            //console.log("Archivo leído");
            resolve("Contenido del archivo");
        }, 1000);
    });
}

function procesar(contenido) {
    return new Promise(resolve => {
        setTimeout(() => {
            //console.log("Archivo procesado");
            resolve(contenido.toUpperCase());
        }, 1000);
    });
}

function guardar(resultado) {
    return new Promise(resolve => {
        setTimeout(() => {
            //console.log("Archivo guardado");
            resolve(`Guardado: ${resultado}`);
        }, 1000);
    });
}

/* PROMESAS ANIDADAS

leerArchivo("datos.txt").then(contenido => {
    procesar(contenido).then(resultado => {
        guardar(resultado).then(mensaje => {
            console.log(mensaje);
            console.log("Todo listo (promesas anidadas)");
        });
    });
});

*/

async function procesarArchivo() {
    try {
        const contenido = await leerArchivo("datos.txt");
        console.log("Archivo leído:", contenido);

        const resultado = await procesar(contenido);
        console.log("Archivo procesado:", resultado);

        const mensaje = await guardar(resultado);
        console.log(mensaje);
    } catch (error) {
        console.log("Error:", error);
    }
}

procesarArchivo();