let cad = miFuncion("abcd");
console.log(cad);

function miFuncion(x) {
    let rev = "";
    let n = x.length;

    for(let i=n; i>0; i--)
    {
        rev = rev + x[i-1];
    }

    return rev;
}