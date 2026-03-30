let band = miFuncion("oruro");
console.log(band);
band = miFuncion("hola");
console.log(band);

function miFuncion(x) {
    let rev = "";
    let n = x.length;

    for(let i=n; i>0; i--)
    {
        rev += x[i-1];
    }

    return (rev==x);
}