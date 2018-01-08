export class Crypto{

 static getSymbolsFromPair(pair:string){
    let a,b;
    const n=pair.length;
    const right=pair.substring(n-3,n);
    const rightB=pair.substring(n-4,n);
    if(right==="BTC"){ a=pair.substring(0,n-3);b=right;}
    else if(right==="ETH") {a=pair.substring(0,n-3);b=right;}
    else if(right==="BNB") {a=pair.substring(0,n-3);b=right;}
    else if(rightB==="USDT") { a=pair.substring(0,n-4);b=rightB;}
    else console.log("UNKNOWN infra",pair)
    return {supra:a,infra:b}
 }}
