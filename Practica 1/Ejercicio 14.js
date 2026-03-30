function leerArchivo(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nombre) resolve("Contenido del archivo");
            else reject("No hay nombre de archivo");
        }, 1000);
    });
}

function leerArchivoCallback(nombre, callback) {
    leerArchivo(nombre)
        .then(contenido => callback(null, contenido))
        .catch(error => callback(error));
}

leerArchivoCallback("datos.txt", (err, contenido) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Contenido:", contenido);
    }
});