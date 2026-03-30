async function mensaje(x) {
    return new Promise ((resolve, reject) =>
    {
        setTimeout(() => {
            
            if(x=="defendio")
                resolve('Exito');
            else
                reject('Sin exito');

        }, 3000);
    });    
}

async function espera(defensa) {
    try{
        console.log(await mensaje(defensa))
    }
    catch (texto)
    {
        console.log(texto)
    }
}

espera("NO defendio");