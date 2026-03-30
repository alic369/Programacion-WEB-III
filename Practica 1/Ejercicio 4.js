let obj = miFuncion([3,1,5,4,2]);
console.log(obj);

function miFuncion(x) {

    let res = {
        mayor: x[0],
        menor: x[0]
    }

    for(let i=1; i<x.length; i++)
    {
        if(x[i]>res.mayor)
            res.mayor = x[i];

        if(x[i]<res.menor)
            res.menor = x[i];
    }

    return res;
}