let obj = miFuncion([1,2,3,4,5]);
console.log(obj);

function miFuncion(x) {

    let res = {
        pares: [],
        impares: []
    }

    for (let i=0; i<x.length; i++)
    {
        if(x[i]%2 === 0)
            res.pares.push(x[i]);
        else
            res.impares.push(x[i]);
    }

    return res;
}