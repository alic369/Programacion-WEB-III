function leerArchivo(nombre, callback) {
    setTimeout(() => {
        console.log("Archivo leído");
        callback("Contenido del archivo");
    }, 1000);
}

function leerArchivoPromesa(nombre) {
    return new Promise(resolve => {
        leerArchivo(nombre, resolve);
    });
}

async function ejecutar() {
    const contenido = await leerArchivoPromesa("datos.txt");
    console.log("Contenido:", contenido);
}

ejecutar();