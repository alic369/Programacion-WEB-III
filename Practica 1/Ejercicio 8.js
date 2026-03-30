function espera(callback) {
    setTimeout(() => {
        callback();
    }, 2000);
}

const miFuncion = () => console.log("Esperaste 2 segundos");

espera(miFuncion);