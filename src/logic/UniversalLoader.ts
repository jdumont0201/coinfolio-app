
export class UniversalLoader {
    static load(broker: string, task: string, data: any) :Object{
        console.log("formaxi",broker,task,data)
        if (task == "balance") {
            let A = {}
            if (broker == "binance") {
                for (let symbol in data) {

                    A[symbol] = {
                        available: parseFloat(data[symbol].available),
                        onorder: parseFloat(data[symbol].onOrder),
                        total: parseFloat(data[symbol].available) + parseFloat(data[symbol].onOrder)
                    }
                }
            }
            else if (broker == "kraken") {
                for (let symbol in data) {
                    A[symbol] = {
                        available: null,
                        onorder: null,
                        total: parseFloat(data[symbol])
                    }
                }
            }
            else if (broker == "kucoin") {
                data.forEach((d)=>{
                    A[d.coinType] = {
                        available: parseFloat(d.balance),
                        onorder: parseFloat(d.freezeBalance),
                        total: parseFloat(d.balance)+parseFloat(d.freezeBalance)
                    }
                })
            }else if (broker == "hitbtc") {
                console.log("formax",data)
                for(let k in data){
                    let d=data[k];
                    A[k] = {
                        available: d.available,
                        onorder: d.reserved,
                        total: d.reserved+d.available
                    }
                }
            } else if (broker == "bitmex") {
               A['BTC']=data.amount
            }

            return A;
        }else if(task=="ticker"){
            let A={}
            if(broker=="hitbtc"){
                data.forEach((d)=>{
                    A[d.symbol]={
                        ask:parseFloat(d.ask),
                        bid:parseFloat(d.bid),
                        last:parseFloat(d.last),
                        ts:new Date(d.timestamp).getTime(),
                        volume:parseFloat(d.volume)
                    }
                })
            }else if(broker=="kraken"){
                    for(let symbol in data){
                        let d=data[symbol]
                        A[symbol]={
                            ask:parseFloat(d.a[0]),
                            bid:parseFloat(d.b[0]),
                            last:parseFloat(d.c[0]),
                            volume:parseFloat(d.v[1])
                        }
                    }

            }
            return A;
        }else if(task =="ohlc"){
            let A=[]
            if(broker=="binance"){
                data.forEach((d)=>{
                    A.push({
                        ts:parseInt(d[0]),
                        o:parseFloat(d[1]),
                        h:parseFloat(d[2]),
                        l:parseFloat(d[3]),
                        c:parseFloat(d[4])
                    })
                })
            }
            return A;
        }
    }
}
