import {Injectable} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {Logic} from "../../../logic/Logic"
import {AppConfigService} from "./appconfig.service";

@Injectable()
export class ImportService {
  constructor(public requestService: RequestService, public logic: Logic, public appConfigService: AppConfigService) {

  }

  correctJSON(content: string): string {
    return content.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
  }

  importCoinMarketCapTicker(source: string, content: string, base: string) {
    console.log("IMPORT", source, content, typeof content, base)
    const correctJson = this.correctJSON(content);
    const file = JSON.parse(correctJson);
    const date = new Date().getTime();
    for (let i = 0; i < file.length; ++i) {
      const d = file[i];
      this.saveCoinMarketCapTicker(source, "USD", d.symbol, d.market_cap_usd, d.total_supply, date, parseFloat(d["24h_volume_usd"]))
    }
  }

  saveCoinMarketCapTicker(source: string, base: string, symbol: string, marketcap: number, supply: number, timestamp: number, volume: number) {
    const obj = {
      source: source,
      base: base,
      symbol: symbol,
      marketcap: marketcap,
      supply: supply,
      ts: timestamp,
      volume: volume
    }
    //this.logic.saveMarketData(obj)
  }


  getImportLinks(source, lastimport): string[] {
    let links = [];
    const pairs = this.getKrakenPairList(source)//["XXBTZEUR","XETHZEUR","DASHEUR","BCHEUR","XXRPZEUR","XETCZEUR"]
    if (source === "kraken") {
      for (let i = 0; i < pairs.length; ++i) {
        const p = pairs[i];
        for (let j = 0; j < this.appConfigService.intervals.length; ++j) {
          const inter = this.appConfigService.intervals[j]
          const l = "https://api.kraken.com/0/public/OHLC?pair=" + p + "&interval=" + inter + (lastimport ? ("&since=" + lastimport) : "")
          links.push(l);

        }
      }
      return links
    }
  }

  getLastImport(source, f) {
    this.logic.getLastImport(source, "price", (res) => {
      if (res) {
        f(( parseInt(res,10) - 100000).toString());
      } else {
        f(null)
      }

    })
  }


  getPairCode(source: string, symbol: string, base: string) {
    if (source === "kraken") {
      if (symbol === "BTC") {
        return "XXBTZ" + base;
      } else if (symbol === "ETH") {
        return "XETHZ" + base;
      } else if (symbol === "DASH") {
        return "DASH" + base;
      } else if (symbol === "BCH") {
        return "BCH" + base;
      } else if (symbol === "XRP") {
        return "XXRPZ" + base;
      } else if (symbol === "ETC") {
        return "XETCZ" + base;
      } else {
        console.log("unimplemented symbol")
      }

    }
  }

  getKrakenPairList(source: string): string[] {
    let A = []
    for (let i = 0; i < this.appConfigService.values.length; ++i) {
      const s = this.appConfigService.values[i]
      for (let j = 0; j < this.appConfigService.bases.length; ++j) {
        const b = this.appConfigService.bases[j]
        A.push(this.getPairCode(source, s, b))
      }
    }
    return A
  }


  importKrakenPrices(source, content, base, symbol, interval) {
    console.log("IMPORT", source, content, typeof content, base, symbol, interval)


    if (source === "kraken") {
      const file = JSON.parse(content);
      const res = file.result;
      console.log("res", res)

      const key = this.getPairCode(source, symbol, base)

      const data = res[key];
      console.log("data", data, key)
      if (!data) {
        console.log("pair not found")
        return
      }
      for (let i = 0; i < data.length; ++i) {
        const d = data[i];
        this.savePrice(source, base, symbol, interval, parseInt(d[0]), parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4]), parseFloat(d[6]))
      }
    }
  }

  savePrice(source: string, base: string, symbol: string, interval: string, timestamp: number, open: number, high: number, low: number, close: number, volume: number) {

    const obj = {
      "source": source,
      base: base,
      symbol: symbol,
      interval: interval,
      ts: timestamp,
      open: open,
      high: high, low: low, close: close, volume: volume
    }
    //this.logic.saveOHLC(obj)
  }
}
