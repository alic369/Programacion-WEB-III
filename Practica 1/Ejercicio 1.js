let obj = miFuncion("euforia");
console.log(obj);

function miFuncion(x) {
    let cant = {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0
    };

    for(let i=0; i<x.length; i++)
    {
        let letra = x[i];

        if (letra in cant)
            cant[letra]++;
    }

    return cant;
}