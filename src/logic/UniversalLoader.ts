
export class UniversalLoader {
    static load(broker: string, task: string, data: any) {
        if (task == "balance") {
            let A = {}
            if (broker == "binance") {
                for (let symbol in data) {
                    A[symbol] = {
                        available: data[symbol].available,
                        onorder: data[symbol].onOrder,
                        total: data[symbol].available + data[symbol].onOrder
                    }
                }
            }
            else if (broker == "kraken") {
                for (let symbol in data) {
                    A[symbol] = {
                        available: null,
                        onorder: null,
                        total: data[symbol]
                    }
                }
            }
            else if (broker == "hitbtc") {
                data.forEach((d)=>{
                    A[d.currency] = {
                        available: d.available,
                        onorder: d.reserved,
                        total: d.reserved+d.available
                    }
                })
            }

            return A;
        }else if(task=="ticker"){
            let A={}
            if(broker=="hitbtc"){
                data.forEach((d)=>{
                    A[d.symbol]={
                        ask:d.ask,
                        bid:d.bid,
                        last:d.last,
                        ts:new Date(d.timestamp).getTime(),
                        volume:d.volume
                    }
                })
            }
        }
    }
}
