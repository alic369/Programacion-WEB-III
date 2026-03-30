function leerArchivo(nombre, callback) {
    setTimeout(() => {
        console.log("Archivo leído");
        callback("Contenido del archivo");
    }, 1000);
}

function procesarArchivo(contenido, callback) {
    setTimeout(() => {
        console.log("Archivo procesado");
        callback(contenido.toUpperCase());
    }, 1000);
}

function guardarArchivo(resultado, callback) {
    setTimeout(() => {
        console.log("Archivo guardado");
        callback(`Guardado: ${resultado}`);
    }, 1000);
}
/* EJEMPLO CALLBACKS
leerArchivo("datos.txt", (contenido) => {
    procesarArchivo(contenido, (resultado) => {
        guardarArchivo(resultado, (mensaje) => {
            console.log(mensaje);
        });
    });
});
*/

function leer(nombre) {
    return new Promise(resolve => {
        leerArchivo(nombre, resolve);
    });
}

function procesar(contenido) {
    return new Promise(resolve => {
        procesarArchivo(contenido, resolve);
    });
}

function guardar(resultado) {
    return new Promise(resolve => {
        guardarArchivo(resultado, resolve);
    });
}

async function procedimiento() {
    const contenido = await leer("datos.txt");
    const resultado = await procesar(contenido);
    const mensaje = await guardar(resultado);
    console.log(mensaje);
}

procedimiento();