export class Crypto {
static getIntervalSeconds(inter:string){
    if(inter=="1m") return 1
    if(inter=="5m") return 5
    if(inter=="15m") return 15
    if(inter=="30m") return 30
    if(inter=="1h") return 60
    if(inter=="2h") return 120
    if(inter=="4h") return 240
    if(inter=="6h") return 360
    if(inter=="12h") return 720
    if(inter=="1d") return 1440
    if(inter=="1w") return 10080
}
    static getSymbolsFromPair(pair: string,possible:string[]) {
        if(!possible){  console.log("error no possible");return}

        if (!pair) {console.log("error no pair"); return}
        let a, b;
        const n = pair.length;
        const right = pair.substring(n - 3, n);

        //let possible=['BTC','ETH','BNB','USD','EUR','CAD','XBT','JPY','GBP']
        for(let i=0;i<possible.length;++i){
            if (right === possible[i]) {
                a = pair.substring(0, n - 3);
                b = right;
                return {supra: a, infra: b}

            }
        }
        const rightB = pair.substring(n - 4, n);
        for(let i=0;i<possible.length;++i){
            if (rightB === possible[i]) {
                a = pair.substring(0, n - 4);
                b = rightB;
                return {supra: a, infra: b}

            }
        }

         console.log("UNKNOWN infra", pair)

    }

    static getNbFormat(p:number):string {
        let n;
        if (p > 10000) {
            n = 1
        }
        else if (p > 1000) {
            n = 2
        }
        else if (p > 100) {

            n = 3
        }
        else if (p > 10) {

            n = 4
        }
        else if (p > 1) {

            n = 5
        }
        else if (p > 0.1) {

            n = 6
        }
        else if (p > 0.01) {

            n = 7
        }
        else {

            n = 7
        }
        return "1." + n + "-" + n;

    }

}
