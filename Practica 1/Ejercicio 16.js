function leerArchivo(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Archivo leído");
            if (nombre) resolve("Contenido del archivo");
            else reject("No hay nombre de archivo");
        }, 1000);
    });
}

function procesarArchivo(contenido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Archivo procesado");
            if (contenido) resolve(contenido.toUpperCase());
            else reject("No hay contenido para procesar");
        }, 1000);
    });
}

function guardarArchivo(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Archivo guardado");
            if (resultado) resolve(`Guardado: ${resultado}`);
            else reject("No hay resultado para guardar");
        }, 1000);
    });
}
/* Ejecucion de promesas
leerArchivo("datos.txt")
    .then(contenido => {
        return procesarArchivo(contenido);
    })
    .then(resultado => {
        return guardarArchivo(resultado);
    })
    .then(mensaje => {
        console.log("Mensaje final:", mensaje);
    })
    .catch(error => {
        console.log("Error:", error);
    });
*/

async function procedimiento() {
    try {
        const contenido = await leerArchivo("datos.txt");
        const resultado = await procesarArchivo(contenido);
        const mensaje = await guardarArchivo(resultado);
        console.log("Mensaje final:", mensaje);
    } catch (error) {
        console.log("Error:", error);
    }
}

procedimiento();