import {Injectable, Output} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {HttpHeaders} from "@angular/common/http"

import {RestangularModule, Restangular} from 'ngx-restangular';

import {ConfigService} from "../../globalton/core/services/config.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {ApiService} from "../../globalton/core/services/api.service";
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";
import {Assert} from "../../globalton/core/utils/assert";

@Injectable()
export class AppConfigService {


    constructor(public configService: ConfigService, public consoleService: ConsoleService, public apiService: ApiService, public authService: AuthService, public logic: Logic) {
        consoleService.serv('APPCONFIG')
        this.generateInfraSupra()
        this.generateListing();
        this.logic.setAppConfigService(this);
        this.apiService.setApiUrl("https://user.coinamics.io/api/");
        this.apiService.setServerUrl("https://user.coinamics.io/");
        this.consoleService.serv("+ AppConfigService");
        this.configService.app = "comeoncoins"
        this.configService.perSiteConfigured.emit({"type": "general"})
        if (this.authService.isAuthenticated())
            this.logic.readSubscription((res) => {
                console.log("expiration", res)
                if (!res) return
                this.authService.paymentExpiration = res.expiration;
                console.log("active", this.authService.isSubscriptionActive(), this.authService.authenticated, this.authService.paymentExpiration, this.authService.paymentExpiration > new Date().getTime() / 1000)
            })

    }

    isCustomDashboardEnabled = false;

    possibleBrokers: string[] = ["binance", "hitbtc", "kucoin", "kraken", "cryptopia", "bitfinex"]

    generateInfraSupra() {
        let res = {};
        let allc = {}
        for (let broker in this.infrasuprainv) {
            this.rawToUniversal[broker]={}
            this.universalToRaw[broker]={}

            for (let pair in this.infrasuprainv[broker]) {

                let v = this.infrasuprainv[broker][pair];
                this.rawToUniversal[broker][pair]=v.supra+v.infra;
                this.universalToRaw[broker][v.supra+v.infra]=pair;
                if (!(v.infra in res)) {
                    res[v.infra] = {}
                }
                if (!(v.supra in res[v.infra])) {
                    res[v.infra][v.supra] = {}
                }
                res[v.infra][v.supra][broker] = pair;
                allc[v.supra] = 1;
                allc[v.infra] = 1;

            }
        }
        this.allcryptos = Object.keys(allc).sort();
        //console.log("infrasupra", res);
        this.infrasupra = res;
    }

    allcryptos = [];
    infrasupra = {}

    rawToUniversal={}
    universalToRaw={}
    infrasuprainv = {
        bitfinex: {
            tBTCUSD: {infra: "USD", supra: "BTC"},
            tAIDBTC:                {infra: "BTC", supra: "AID"},
            tAIDETH:
                {infra: "ETH", supra: "AID"},
            tAIDUSD:
                {infra: "USD", supra: "AID"},
            tAVTBTC:
                {infra: "BTC", supra: "AVT"},
            tAVTETH:
                {infra: "ETH", supra: "AVT"},
            tAVTUSD:
                {infra: "USD", supra: "AVT"},
            tBATBTC:
                {infra: "BTC", supra: "BAT"},
            tBATETH:
                {infra: "ETH", supra: "BAT"},
            tBATUSD:
                {infra: "USD", supra: "BAT"},
            tBCHBTC:
                {infra: "BTC", supra: "BCH"},
            tBCHETH:
                {infra: "ETH", supra: "BCH"},
            tBCHUSD:
                {infra: "USD", supra: "BCH"},
            tBTCEUR:
                {infra: "EUR", supra: "BTC"},
            tBTGBTC:
                {infra: "BTC", supra: "BTG"},
            tBTGUSD:
                {infra: "USD", supra: "BTG"},
            tDATBTC:
                {infra: "BTC", supra: "DAT"},
            tDATETH:
                {infra: "ETH", supra: "DAT"},
            tDATUSD:
                {infra: "USD", supra: "DAT"},
            tDSHBTC:
                {infra: "BTC", supra: "DASH"},
            tDSHUSD:
                {infra: "USD", supra: "DASH"},
            tEDOBTC:
                {infra: "BTC", supra: "EDO"},
            tEDOETH:
                {infra: "ETH", supra: "EDO"},
            tEDOUSD:
                {infra: "USD", supra: "EDO"},
            tELFBTC:
                {infra: "BTC", supra: "ELF"},
            tELFETH:
                {infra: "ETH", supra: "ELF"},
            tELFUSD:
                {infra: "USD", supra: "ELF"},
            tEOSBTC:
                {infra: "BTC", supra: "EOS"},
            tEOSETH:
                {infra: "ETH", supra: "EOS"},
            tEOSUSD:
                {infra: "USD", supra: "EOS"},
            tETCBTC:
                {infra: "BTC", supra: "ETC"},
            tETCUSD:
                {infra: "USD", supra: "ETC"},
            tETHBTC:
                {infra: "BTC", supra: "ETH"},
            tETHUSD:
                {infra: "USD", supra: "ETH"},
            tETPBTC:
                {infra: "BTC", supra: "ETP"},
            tETPETH:
                {infra: "ETH", supra: "ETP"},
            tETPUSD:
                {infra: "USD", supra: "ETP"},
            tFUNBTC:
                {infra: "BTC", supra: "FUN"},
            tFUNETH:
                {infra: "ETH", supra: "FUN"},
            tFUNUSD:
                {infra: "USD", supra: "FUN"},
            tGNTBTC:
                {infra: "BTC", supra: "GNT"},
            tGNTETH:
                {infra: "ETH", supra: "GNT"},
            tGNTUSD:
                {infra: "USD", supra: "GNT"},
            tIOTBTC:
                {infra: "BTC", supra: "IOT"},
            tIOTETH:
                {infra: "ETH", supra: "IOT"},
            tIOTEUR:
                {infra: "EUR", supra: "IOT"},
            tIOTUSD:
                {infra: "USD", supra: "IOT"},
            tLTCBTC:
                {infra: "BTC", supra: "LTC"},
            tLTCUSD:
                {infra: "USD", supra: "LTC"},
            tMNABTC:
                {infra: "BTC", supra: "MNA"},
            tMNAETH:
                {infra: "ETH", supra: "MNA"},
            tMNAUSD:
                {infra: "USD", supra: "MNA"},
            tNEOBTC:
                {infra: "BTC", supra: "NEO"},
            tNEOETH:
                {infra: "ETH", supra: "NEO"},
            tNEOUSD:
                {infra: "USD", supra: "NEO"},
            tOMGBTC:
                {infra: "BTC", supra: "OMG"},
            tOMGETH:
                {infra: "ETH", supra: "OMG"},
            tOMGUSD:
                {infra: "USD", supra: "OMG"},
            tQSHBTC:
                {infra: "BTC", supra: "QSH"},
            tQSHETH:
                {infra: "ETH", supra: "QSH"},
            tQSHUSD:
                {infra: "USD", supra: "QSH"},
            tQTMBTC:
                {infra: "BTC", supra: "QTM"},
            tQTMETH:
                {infra: "ETH", supra: "QTM"},
            tQTMUSD:
                {infra: "USD", supra: "QTM"},
            tRCNBTC:
                {infra: "BTC", supra: "RCN"},
            tRCNETH:
                {infra: "ETH", supra: "RCN"},
            tRCNUSD:
                {infra: "USD", supra: "RCN"},
            tREPBTC:
                {infra: "BTC", supra: "REP"},
            tREPETH:
                {infra: "ETH", supra: "REP"},
            tREPUSD:
                {infra: "USD", supra: "REP"},
            tRLCBTC:
                {infra: "BTC", supra: "RLC"},
            tRLCETH:
                {infra: "ETH", supra: "RLC"},
            tRLCUSD:
                {infra: "USD", supra: "RLC"},
            tRRTBTC:
                {infra: "BTC", supra: "RRT"},
            tRRTUSD:
                {infra: "USD", supra: "RRT"},
            tSANBTC:
                {infra: "BTC", supra: "SAN"},
            tSANETH:
                {infra: "ETH", supra: "SAN"},
            tSANUSD:
                {infra: "USD", supra: "SAN"},
            tSNGBTC:
                {infra: "BTC", supra: "SNG"},
            tSNGETH:
                {infra: "ETH", supra: "SNG"},
            tSNGUSD:
                {infra: "USD", supra: "SNG"},
            tSNTBTC:
                {infra: "BTC", supra: "SNT"},
            tSNTETH:
                {infra: "ETH", supra: "SNT"},
            tSNTUSD:
                {infra: "USD", supra: "SNT"},
            tSPKBTC:
                {infra: "BTC", supra: "SPK"},
            tSPKETH:
                {infra: "ETH", supra: "SPK"},
            tSPKUSD:
                {infra: "USD", supra: "SPK"},
            tTNBBTC:
                {infra: "BTC", supra: "TNB"},
            tTNBETH:
                {infra: "ETH", supra: "TNB"},
            tTNBUSD:
                {infra: "USD", supra: "TNB"},
            tTRXBTC:
                {infra: "BTC", supra: "TRX"},
            tTRXETH:
                {infra: "ETH", supra: "TRX"},
            tTRXUSD:
                {infra: "USD", supra: "TRX"},
            tXMRBTC:
                {infra: "BTC", supra: "XMR"},
            tXMRUSD:
                {infra: "USD", supra: "XMR"},
            tXRPBTC:
                {infra: "BTC", supra: "XRP"},
            tXRPUSD:
                {infra: "USD", supra: "XRP"},
            tYYWBTC:
                {infra: "BTC", supra: "YYW"},
            tYYWETH:
                {infra: "ETH", supra: "YYW"},
            tYYWUSD:
                {infra: "USD", supra: "YYW"},
            tZECBTC:
                {infra: "BTC", supra: "ZEC"},
            tZECUSD:
                {infra: "USD", supra: "ZEC"},
            tZRXBTC:
                {infra: "BTC", supra: "ZRX"},
            tZRXETH:
                {infra: "ETH", supra: "ZRX"},
            tZRXUSD:
                {infra: "USD", supra: "ZRX"},

        },
        cryptopia: {
            "8BITBTC": {infra: "BTC", supra: "8BIT"},
            "8BITDOGE": {infra: "DOGE", supra: "8BIT"},
            "8BITLTC": {infra: "LTC", supra: "8BIT"},
            "21MBTC": {infra: "BTC", supra: "21M"},
            "21MDOGE": {infra: "DOGE", supra: "21M"},
            "21MLTC":
                {infra: "LTC", supra: "21M"},
            "42BTC":
                {infra: "BTC", supra: "42"},
            "42DOGE":
                {infra: "DOGE", supra: "42"},
            "42LTC":
                {infra: "LTC", supra: "42"},
            "300BTC":
                {infra: "BTC", supra: "300"},
            "300DOGE":
                {infra: "DOGE", supra: "300"},
            "300LTC":
                {infra: "LTC", supra: "300"},
            "611BTC":
                {infra: "BTC", supra: "611"},
            "611DOGE":
                {infra: "DOGE", supra: "611"},
            "611LTC":
                {infra: "LTC", supra: "611"},
            "808BTC":
                {infra: "BTC", supra: "808"},
            "808DOGE":
                {infra: "DOGE", supra: "808"},
            "808LTC":
                {infra: "LTC", supra: "808"},
            "888BTC":
                {infra: "BTC", supra: "888"},
            "888DOGE":
                {infra: "DOGE", supra: "888"},
            "888LTC":
                {infra: "LTC", supra: "888"},
            "1337BTC":
                {infra: "BTC", supra: "1337"},
            "1337DOGE":
                {infra: "DOGE", supra: "1337"},
            "1337LTC":
                {infra: "LTC", supra: "1337"},
            "$$$BTC":
                {infra: "BTC", supra: "$$$"},
            "$$$DOGE":
                {infra: "DOGE", supra: "$$$"},
            "$$$LTC":
                {infra: "LTC", supra: "$$$"},
            ABCBTC:
                {infra: "BTC", supra: "ABC"},
            ABCDOGE:
                {infra: "DOGE", supra: "ABC"},
            ABCLTC:
                {infra: "LTC", supra: "ABC"},
            ABYBTC:
                {infra: "BTC", supra: "ABY"},
            ABYDOGE:
                {infra: "DOGE", supra: "ABY"},
            ABYLTC:
                {infra: "LTC", supra: "ABY"},
            ACBTC:
                {infra: "BTC", supra: "AC"},
            ACCBTC:
                {infra: "BTC", supra: "ACC"},
            ACCDOGE:
                {infra: "DOGE", supra: "ACC"},
            ACCLTC:
                {infra: "LTC", supra: "ACC"},
            ACDOGE:
                {infra: "DOGE", supra: "AC"},
            ACLTC:
                {infra: "LTC", supra: "AC"},
            ACOINBTC:
                {infra: "BTC", supra: "ACOIN"},
            ACOINDOGE:
                {infra: "DOGE", supra: "ACOIN"},
            ACOINLTC:
                {infra: "LTC", supra: "ACOIN"},
            ADCBTC:
                {infra: "BTC", supra: "ADC"},
            ADCDOGE:
                {infra: "DOGE", supra: "ADC"},
            ADCLTC:
                {infra: "LTC", supra: "ADC"},
            ADSTBTC:
                {infra: "BTC", supra: "ADST"},
            ADSTDOGE:
                {infra: "DOGE", supra: "ADST"},
            ADSTLTC:
                {infra: "LTC", supra: "ADST"},
            AGABTC:
                {infra: "BTC", supra: "AGA"},
            AGADOGE:
                {infra: "DOGE", supra: "AGA"},
            AGALTC:
                {infra: "LTC", supra: "AGA"},
            ALEXBTC:
                {infra: "BTC", supra: "ALEX"},
            ALEXDOGE:
                {infra: "DOGE", supra: "ALEX"},
            ALEXLTC:
                {infra: "LTC", supra: "ALEX"},
            ALISBTC:
                {infra: "BTC", supra: "ALIS"},
            ALISDOGE:
                {infra: "DOGE", supra: "ALIS"},
            ALISLTC:
                {infra: "LTC", supra: "ALIS"},
            ALLBTC:
                {infra: "BTC", supra: "ALL"},
            ALLDOGE:
                {infra: "DOGE", supra: "ALL"},
            ALLLTC:
                {infra: "LTC", supra: "ALL"},
            ALTBTC:
                {infra: "BTC", supra: "ALT"},
            ALTDOGE:
                {infra: "DOGE", supra: "ALT"},
            ALTLTC:
                {infra: "LTC", supra: "ALT"},
            AMPBTC:
                {infra: "BTC", supra: "AMP"},
            AMPDOGE:
                {infra: "DOGE", supra: "AMP"},
            AMPLTC:
                {infra: "LTC", supra: "AMP"},
            ANIBTC:
                {infra: "BTC", supra: "ANI"},
            ANIDOGE:
                {infra: "DOGE", supra: "ANI"},
            ANILTC:
                {infra: "LTC", supra: "ANI"},
            APXBTC:
                {infra: "BTC", supra: "APX"},
            APXDOGE:
                {infra: "DOGE", supra: "APX"},
            APXLTC:
                {infra: "LTC", supra: "APX"},
            ARCBTC:
                {infra: "BTC", supra: "ARC"},
            ARCDOGE:
                {infra: "DOGE", supra: "ARC"},
            ARCLTC:
                {infra: "LTC", supra: "ARC"},
            ARCOBTC:
                {infra: "BTC", supra: "ARCO"},
            ARCODOGE:
                {infra: "DOGE", supra: "ARCO"},
            ARCOLTC:
                {infra: "LTC", supra: "ARCO"},
            ARGBTC:
                {infra: "BTC", supra: "ARG"},
            ARGDOGE:
                {infra: "DOGE", supra: "ARG"},
            ARGLTC:
                {infra: "LTC", supra: "ARG"},
            ARGUSBTC:
                {infra: "BTC", supra: "ARGUS"},
            ARGUSDOGE:
                {infra: "DOGE", supra: "ARGUS"},
            ARGUSLTC:
                {infra: "LTC", supra: "ARGUS"},
            ARIBTC:
                {infra: "BTC", supra: "ARI"},
            ARIDOGE:
                {infra: "DOGE", supra: "ARI"},
            ARILTC:
                {infra: "LTC", supra: "ARI"},
            ARKBTC:
                {infra: "BTC", supra: "ARK"},
            ARKDOGE:
                {infra: "DOGE", supra: "ARK"},
            ARKLTC:
                {infra: "LTC", supra: "ARK"},
            ARKUSDT:
                {infra: "USD", supra: "ARK"},
            ATHBTC:
                {infra: "BTC", supra: "ATH"},
            ATHDOGE:
                {infra: "DOGE", supra: "ATH"},
            ATHLTC:
                {infra: "LTC", supra: "ATH"},
            ATMSBTC:
                {infra: "BTC", supra: "ATMS"},
            ATMSDOGE:
                {infra: "DOGE", supra: "ATMS"},
            ATMSLTC:
                {infra: "LTC", supra: "ATMS"},
            ATOMBTC:
                {infra: "BTC", supra: "ATOM"},
            ATOMDOGE:
                {infra: "DOGE", supra: "ATOM"},
            ATOMLTC:
                {infra: "LTC", supra: "ATOM"},
            AUBTC:
                {infra: "BTC", supra: "AU"},
            AUDOGE:
                {infra: "DOGE", supra: "AU"},
            AULTC:
                {infra: "LTC", supra: "AU"},
            AURBTC:
                {infra: "BTC", supra: "AUR"},
            AURDOGE:
                {infra: "DOGE", supra: "AUR"},
            AURLTC:
                {infra: "LTC", supra: "AUR"},
            AURSBTC:
                {infra: "BTC", supra: "AURS"},
            AURSDOGE:
                {infra: "DOGE", supra: "AURS"},
            AURSLTC:
                {infra: "LTC", supra: "AURS"},
            BATBTC:
                {infra: "BTC", supra: "BAT"},
            BATDOGE:
                {infra: "DOGE", supra: "BAT"},
            BATLTC:
                {infra: "LTC", supra: "BAT"},
            BAYBTC:
                {infra: "BTC", supra: "BAY"},
            BAYDOGE:
                {infra: "DOGE", supra: "BAY"},
            BAYLTC:
                {infra: "LTC", supra: "BAY"},
            BCFBTC:
                {infra: "BTC", supra: "BCF"},
            BCFDOGE:
                {infra: "DOGE", supra: "BCF"},
            BCFLTC:
                {infra: "LTC", supra: "BCF"},
            BCHBTC:
                {infra: "BTC", supra: "BCH"},
            BCHDOGE:
                {infra: "DOGE", supra: "BCH"},
            BCHLTC:
                {infra: "LTC", supra: "BCH"},
            BCHNZDT:
                {infra: "NZDT", supra: "BCH"},
            BCHUSDT:
                {infra: "USD", supra: "BCH"},
            BCPTBTC:
                {infra: "BTC", supra: "BCPT"},
            BCPTDOGE:
                {infra: "DOGE", supra: "BCPT"},
            BCPTLTC:
                {infra: "LTC", supra: "BCPT"},
            BDLBTC:
                {infra: "BTC", supra: "BDL"},
            BDLDOGE:
                {infra: "DOGE", supra: "BDL"},
            BDLLTC:
                {infra: "LTC", supra: "BDL"},
            BEEZBTC:
                {infra: "BTC", supra: "BEEZ"},
            BEEZDOGE:
                {infra: "DOGE", supra: "BEEZ"},
            BEEZLTC:
                {infra: "LTC", supra: "BEEZ"},
            BENJIBTC:
                {infra: "BTC", supra: "BENJI"},
            BENJIDOGE:
                {infra: "DOGE", supra: "BENJI"},
            BENJILTC:
                {infra: "LTC", supra: "BENJI"},
            BERNBTC:
                {infra: "BTC", supra: "BERN"},
            BERNDOGE:
                {infra: "DOGE", supra: "BERN"},
            BERNLTC:
                {infra: "LTC", supra: "BERN"},
            BESTBTC:
                {infra: "BTC", supra: "BEST"},
            BESTDOGE:
                {infra: "DOGE", supra: "BEST"},
            BESTLTC:
                {infra: "LTC", supra: "BEST"},
            BGRBTC:
                {infra: "BTC", supra: "BGR"},
            BGRDOGE:
                {infra: "DOGE", supra: "BGR"},
            BGRLTC:
                {infra: "LTC", supra: "BGR"},
            BIPBTC:
                {infra: "BTC", supra: "BIP"},
            BIPDOGE:
                {infra: "DOGE", supra: "BIP"},
            BIPLTC:
                {infra: "LTC", supra: "BIP"},
            BIRDBTC:
                {infra: "BTC", supra: "BIRD"},
            BIRDDOGE:
                {infra: "DOGE", supra: "BIRD"},
            BIRDLTC:
                {infra: "LTC", supra: "BIRD"},
            BISBTC:
                {infra: "BTC", supra: "BIS"},
            BISDOGE:
                {infra: "DOGE", supra: "BIS"},
            BISLTC:
                {infra: "LTC", supra: "BIS"},
            BITBBTC:
                {infra: "BTC", supra: "BITB"},
            BITBDOGE:
                {infra: "DOGE", supra: "BITB"},
            BITBLTC:
                {infra: "LTC", supra: "BITB"},
            BITSBTC:
                {infra: "BTC", supra: "BITS"},
            BITSDOGE:
                {infra: "DOGE", supra: "BITS"},
            BITSLTC:
                {infra: "LTC", supra: "BITS"},
            BKCATBTC:
                {infra: "BTC", supra: "BKCAT"},
            BKCATDOGE:
                {infra: "DOGE", supra: "BKCAT"},
            BKCATLTC:
                {infra: "LTC", supra: "BKCAT"},
            BLCBTC:
                {infra: "BTC", supra: "BLC"},
            BLCDOGE:
                {infra: "DOGE", supra: "BLC"},
            BLCLTC:
                {infra: "LTC", supra: "BLC"},
            BLKBTC:
                {infra: "BTC", supra: "BLK"},
            BLKDOGE:
                {infra: "DOGE", supra: "BLK"},
            BLKLTC:
                {infra: "LTC", supra: "BLK"},
            BLZBTC:
                {infra: "BTC", supra: "BLZ"},
            BLZDOGE:
                {infra: "DOGE", supra: "BLZ"},
            BLZLTC:
                {infra: "LTC", supra: "BLZ"},
            BNCBTC:
                {infra: "BTC", supra: "BNC"},
            BNCDOGE:
                {infra: "DOGE", supra: "BNC"},
            BNCLTC:
                {infra: "LTC", supra: "BNC"},
            BNXBTC:
                {infra: "BTC", supra: "BNX"},
            BNXDOGE:
                {infra: "DOGE", supra: "BNX"},
            BNXLTC:
                {infra: "LTC", supra: "BNX"},
            BOLIBTC:
                {infra: "BTC", supra: "BOLI"},
            BOLIDOGE:
                {infra: "DOGE", supra: "BOLI"},
            BOLILTC:
                {infra: "LTC", supra: "BOLI"},
            BONBTC:
                {infra: "BTC", supra: "BON"},
            BONDOGE:
                {infra: "DOGE", supra: "BON"},
            BONLTC:
                {infra: "LTC", supra: "BON"},
            BOPBTC:
                {infra: "BTC", supra: "BOP"},
            BOPDOGE:
                {infra: "DOGE", supra: "BOP"},
            BOPLTC:
                {infra: "LTC", supra: "BOP"},
            BOSONDOGE:
                {infra: "DOGE", supra: "BOSON"},
            BOSONLTC:
                {infra: "LTC", supra: "BOSON"},
            BPLBTC:
                {infra: "BTC", supra: "BPL"},
            BPLDOGE:
                {infra: "DOGE", supra: "BPL"},
            BPLLTC:
                {infra: "LTC", supra: "BPL"},
            BRGBTC:
                {infra: "BTC", supra: "BRG"},
            BRGDOGE:
                {infra: "DOGE", supra: "BRG"},
            BRGLTC:
                {infra: "LTC", supra: "BRG"},
            BROBTC:
                {infra: "BTC", supra: "BRO"},
            BRODOGE:
                {infra: "DOGE", supra: "BRO"},
            BROLTC:
                {infra: "LTC", supra: "BRO"},
            BSDBTC:
                {infra: "BTC", supra: "BSD"},
            BSDDOGE:
                {infra: "DOGE", supra: "BSD"},
            BSDLTC:
                {infra: "LTC", supra: "BSD"},
            BSDUSDT:
                {infra: "USD", supra: "BSD"},
            BSTYBTC:
                {infra: "BTC", supra: "BSTY"},
            BSTYDOGE:
                {infra: "DOGE", supra: "BSTY"},
            BSTYLTC:
                {infra: "LTC", supra: "BSTY"},
            BTABTC:
                {infra: "BTC", supra: "BTA"},
            BTADOGE:
                {infra: "DOGE", supra: "BTA"},
            BTALTC:
                {infra: "LTC", supra: "BTA"},
            BTBBTC:
                {infra: "BTC", supra: "BTB"},
            BTBDOGE:
                {infra: "DOGE", supra: "BTB"},
            BTBLTC:
                {infra: "LTC", supra: "BTB"},
            BTCDBTC:
                {infra: "BTC", supra: "BTCD"},
            BTCDDOGE:
                {infra: "DOGE", supra: "BTCD"},
            BTCDLTC:
                {infra: "LTC", supra: "BTCD"},
            BTCNZDT:
                {infra: "NZDT", supra: "BTC"},
            BTCSBTC:
                {infra: "BTC", supra: "BTCS"},
            BTCSDOGE:
                {infra: "DOGE", supra: "BTCS"},
            BTCSLTC:
                {infra: "LTC", supra: "BTCS"},
            BTCUSDT:
                {infra: "USD", supra: "BTC"},
            BTDXBTC:
                {infra: "BTC", supra: "BTDX"},
            BTDXDOGE:
                {infra: "DOGE", supra: "BTDX"},
            BTDXLTC:
                {infra: "LTC", supra: "BTDX"},
            BTGBTC:
                {infra: "BTC", supra: "BTG"},
            BTGDOGE:
                {infra: "DOGE", supra: "BTG"},
            BTGLTC:
                {infra: "LTC", supra: "BTG"},
            BTMBTC:
                {infra: "BTC", supra: "BTM"},
            BTMDOGE:
                {infra: "DOGE", supra: "BTM"},
            BTMLTC:
                {infra: "LTC", supra: "BTM"},
            BTXBTC:
                {infra: "BTC", supra: "BTX"},
            BTXDOGE:
                {infra: "DOGE", supra: "BTX"},
            BTXLTC:
                {infra: "LTC", supra: "BTX"},
            BTXNZDT:
                {infra: "NZDT", supra: "BTX"},
            BTXUSDT:
                {infra: "USD", supra: "BTX"},
            BUCKSBTC:
                {infra: "BTC", supra: "BUCKS"},
            BUCKSDOGE:
                {infra: "DOGE", supra: "BUCKS"},
            BUCKSLTC:
                {infra: "LTC", supra: "BUCKS"},
            BUMBABTC:
                {infra: "BTC", supra: "BUMBA"},
            BUMBADOGE:
                {infra: "DOGE", supra: "BUMBA"},
            BUMBALTC:
                {infra: "LTC", supra: "BUMBA"},
            BUNBTC:
                {infra: "BTC", supra: "BUN"},
            BUNDOGE:
                {infra: "DOGE", supra: "BUN"},
            BUNLTC:
                {infra: "LTC", supra: "BUN"},
            BVBBTC:
                {infra: "BTC", supra: "BVB"},
            BVBDOGE:
                {infra: "DOGE", supra: "BVB"},
            BVBLTC:
                {infra: "LTC", supra: "BVB"},
            BWKBTC:
                {infra: "BTC", supra: "BWK"},
            BWKDOGE:
                {infra: "DOGE", supra: "BWK"},
            BWKLTC:
                {infra: "LTC", supra: "BWK"},
            BXCBTC:
                {infra: "BTC", supra: "BXC"},
            BXCDOGE:
                {infra: "DOGE", supra: "BXC"},
            BXCLTC:
                {infra: "LTC", supra: "BXC"},
            C2BTC:
                {infra: "BTC", supra: "C2"},
            C2DOGE:
                {infra: "DOGE", supra: "C2"},
            C2LTC:
                {infra: "LTC", supra: "C2"},
            CACHBTC:
                {infra: "BTC", supra: "CACH"},
            CACHDOGE:
                {infra: "DOGE", supra: "CACH"},
            CACHLTC:
                {infra: "LTC", supra: "CACH"},
            CANBTC:
                {infra: "BTC", supra: "CAN"},
            CANNBTC:
                {infra: "BTC", supra: "CANN"},
            CANNDOGE:
                {infra: "DOGE", supra: "CANN"},
            CANNLTC:
                {infra: "LTC", supra: "CANN"},
            CAPPBTC:
                {infra: "BTC", supra: "CAPP"},
            CAPPDOGE:
                {infra: "DOGE", supra: "CAPP"},
            CAPPLTC:
                {infra: "LTC", supra: "CAPP"},
            CARBTC:
                {infra: "BTC", supra: "CAR"},
            CARDOGE:
                {infra: "DOGE", supra: "CAR"},
            CARLTC:
                {infra: "LTC", supra: "CAR"},
            CATBTC:
                {infra: "BTC", supra: "CAT"},
            CATDOGE:
                {infra: "DOGE", supra: "CAT"},
            CATLTC:
                {infra: "LTC", supra: "CAT"},
            CBXBTC:
                {infra: "BTC", supra: "CBX"},
            CBXDOGE:
                {infra: "DOGE", supra: "CBX"},
            CBXLTC:
                {infra: "LTC", supra: "CBX"},
            CCBBTC:
                {infra: "BTC", supra: "CCB"},
            CCBDOGE:
                {infra: "DOGE", supra: "CCB"},
            CCBLTC:
                {infra: "LTC", supra: "CCB"},
            CCBTC:
                {infra: "BTC", supra: "CC"},
            CCDOGE:
                {infra: "DOGE", supra: "CC"},
            CCLTC:
                {infra: "LTC", supra: "CC"},
            CCNBTC:
                {infra: "BTC", supra: "CCN"},
            CCNDOGE:
                {infra: "DOGE", supra: "CCN"},
            CCNLTC:
                {infra: "LTC", supra: "CCN"},
            CDNBTC:
                {infra: "BTC", supra: "CDN"},
            CDNDOGE:
                {infra: "DOGE", supra: "CDN"},
            CDNLTC:
                {infra: "LTC", supra: "CDN"},
            CEFSBTC:
                {infra: "BTC", supra: "CEFS"},
            CEFSDOGE:
                {infra: "DOGE", supra: "CEFS"},
            CEFSLTC:
                {infra: "LTC", supra: "CEFS"},
            CEFSNZDT:
                {infra: "NZDT", supra: "CEFS"},
            CEFSUSDT:
                {infra: "USD", supra: "CEFS"},
            CFCBTC:
                {infra: "BTC", supra: "CFC"},
            CFCDOGE:
                {infra: "DOGE", supra: "CFC"},
            CFCLTC:
                {infra: "LTC", supra: "CFC"},
            CFTBTC:
                {infra: "BTC", supra: "CFT"},
            CFTDOGE:
                {infra: "DOGE", supra: "CFT"},
            CFTLTC:
                {infra: "LTC", supra: "CFT"},
            CHANBTC:
                {infra: "BTC", supra: "CHAN"},
            CHANDOGE:
                {infra: "DOGE", supra: "CHAN"},
            CHANLTC:
                {infra: "LTC", supra: "CHAN"},
            CHCBTC:
                {infra: "BTC", supra: "CHC"},
            CHCDOGE:
                {infra: "DOGE", supra: "CHC"},
            CHCLTC:
                {infra: "LTC", supra: "CHC"},
            CHESSBTC:
                {infra: "BTC", supra: "CHESS"},
            CHESSDOGE:
                {infra: "DOGE", supra: "CHESS"},
            CHESSLTC:
                {infra: "LTC", supra: "CHESS"},
            CHIEFDOGE:
                {infra: "DOGE", supra: "CHIEF"},
            CHIEFLTC:
                {infra: "LTC", supra: "CHIEF"},
            CJBTC:
                {infra: "BTC", supra: "CJ"},
            CJDOGE:
                {infra: "DOGE", supra: "CJ"},
            CJLTC:
                {infra: "LTC", supra: "CJ"},
            CLAMBTC:
                {infra: "BTC", supra: "CLAM"},
            CLAMDOGE:
                {infra: "DOGE", supra: "CLAM"},
            CLAMLTC:
                {infra: "LTC", supra: "CLAM"},
            CLBTC:
                {infra: "BTC", supra: "CL"},
            CLOAKBTC:
                {infra: "BTC", supra: "CLOAK"},
            CLOAKDOGE:
                {infra: "DOGE", supra: "CLOAK"},
            CLOAKLTC:
                {infra: "LTC", supra: "CLOAK"},
            CMPBTC:
                {infra: "BTC", supra: "CMP"},
            CMPCOBTC:
                {infra: "BTC", supra: "CMPCO"},
            CMPCODOGE:
                {infra: "DOGE", supra: "CMPCO"},
            CMPCOLTC:
                {infra: "LTC", supra: "CMPCO"},
            CMPDOGE:
                {infra: "DOGE", supra: "CMP"},
            CMPLTC:
                {infra: "LTC", supra: "CMP"},
            CMTBTC:
                {infra: "BTC", supra: "CMT"},
            CMTDOGE:
                {infra: "DOGE", supra: "CMT"},
            CMTLTC:
                {infra: "LTC", supra: "CMT"},
            CNNCBTC:
                {infra: "BTC", supra: "CNNC"},
            CNNCDOGE:
                {infra: "DOGE", supra: "CNNC"},
            CNNCLTC:
                {infra: "LTC", supra: "CNNC"},
            CNOBTC:
                {infra: "BTC", supra: "CNO"},
            CNODOGE:
                {infra: "DOGE", supra: "CNO"},
            CNOLTC:
                {infra: "LTC", supra: "CNO"},
            COALBTC:
                {infra: "BTC", supra: "COAL"},
            COALDOGE:
                {infra: "DOGE", supra: "COAL"},
            COALLTC:
                {infra: "LTC", supra: "COAL"},
            COMPBTC:
                {infra: "BTC", supra: "COMP"},
            COMPDOGE:
                {infra: "DOGE", supra: "COMP"},
            COMPLTC:
                {infra: "LTC", supra: "COMP"},
            CONBTC:
                {infra: "BTC", supra: "CON"},
            CONDOGE:
                {infra: "DOGE", supra: "CON"},
            CONLTC:
                {infra: "LTC", supra: "CON"},
            COPPERBTC:
                {infra: "BTC", supra: "COPPER"},
            COPPERDOGE:
                {infra: "DOGE", supra: "COPPER"},
            COPPERLTC:
                {infra: "LTC", supra: "COPPER"},
            CORBTC:
                {infra: "BTC", supra: "COR"},
            CORDOGE:
                {infra: "DOGE", supra: "COR"},
            CORGBTC:
                {infra: "BTC", supra: "CORG"},
            CORGDOGE:
                {infra: "DOGE", supra: "CORG"},
            CORGLTC:
                {infra: "LTC", supra: "CORG"},
            CORLTC:
                {infra: "LTC", supra: "COR"},
            CPNBTC:
                {infra: "BTC", supra: "CPN"},
            CPNDOGE:
                {infra: "DOGE", supra: "CPN"},
            CPNLTC:
                {infra: "LTC", supra: "CPN"},
            CQSTBTC:
                {infra: "BTC", supra: "CQST"},
            CQSTDOGE:
                {infra: "DOGE", supra: "CQST"},
            CQSTLTC:
                {infra: "LTC", supra: "CQST"},
            CRAVEBTC:
                {infra: "BTC", supra: "CRAVE"},
            CRAVEDOGE:
                {infra: "DOGE", supra: "CRAVE"},
            CRAVELTC:
                {infra: "LTC", supra: "CRAVE"},
            CRCBTC:
                {infra: "BTC", supra: "CRC"},
            CRCDOGE:
                {infra: "DOGE", supra: "CRC"},
            CRCLTC:
                {infra: "LTC", supra: "CRC"},
            CREABTC:
                {infra: "BTC", supra: "CREA"},
            CREADOGE:
                {infra: "DOGE", supra: "CREA"},
            CREALTC:
                {infra: "LTC", supra: "CREA"},
            CRMBTC:
                {infra: "BTC", supra: "CRM"},
            CRMDOGE:
                {infra: "DOGE", supra: "CRM"},
            CRMLTC:
                {infra: "LTC", supra: "CRM"},
            CRURBTC:
                {infra: "BTC", supra: "CRUR"},
            CRURDOGE:
                {infra: "DOGE", supra: "CRUR"},
            CRURLTC:
                {infra: "LTC", supra: "CRUR"},
            CRXBTC:
                {infra: "BTC", supra: "CRX"},
            CRXDOGE:
                {infra: "DOGE", supra: "CRX"},
            CRXLTC:
                {infra: "LTC", supra: "CRX"},
            CRYPTBTC:
                {infra: "BTC", supra: "CRYPT"},
            CRYPTDOGE:
                {infra: "DOGE", supra: "CRYPT"},
            CRYPTLTC:
                {infra: "LTC", supra: "CRYPT"},
            CTIC3BTC:
                {infra: "BTC", supra: "CTIC3"},
            CTIC3DOGE:
                {infra: "DOGE", supra: "CTIC3"},
            CTIC3LTC:
                {infra: "LTC", supra: "CTIC3"},
            CTRBTC:
                {infra: "BTC", supra: "CTR"},
            CTRDOGE:
                {infra: "DOGE", supra: "CTR"},
            CTRLTC:
                {infra: "LTC", supra: "CTR"},
            CXTBTC:
                {infra: "BTC", supra: "CXT"},
            CXTDOGE:
                {infra: "DOGE", supra: "CXT"},
            CXTLTC:
                {infra: "LTC", supra: "CXT"},
            DALCBTC:
                {infra: "BTC", supra: "DALC"},
            DALCDOGE:
                {infra: "DOGE", supra: "DALC"},
            DALCLTC:
                {infra: "LTC", supra: "DALC"},
            DARKBTC:
                {infra: "BTC", supra: "DARK"},
            DARKDOGE:
                {infra: "DOGE", supra: "DARK"},
            DARKLTC:
                {infra: "LTC", supra: "DARK"},
            DASBTC:
                {infra: "BTC", supra: "DAS"},
            DASDOGE:
                {infra: "DOGE", supra: "DAS"},
            DASHBTC:
                {infra: "BTC", supra: "DASH"},
            DASHDOGE:
                {infra: "DOGE", supra: "DASH"},
            DASHLTC:
                {infra: "LTC", supra: "DASH"},
            DASHUSDT:
                {infra: "USD", supra: "DASH"},
            DASLTC:
                {infra: "LTC", supra: "DAS"},
            DAXXBTC:
                {infra: "BTC", supra: "DAXX"},
            DAXXDOGE:
                {infra: "DOGE", supra: "DAXX"},
            DAXXLTC:
                {infra: "LTC", supra: "DAXX"},
            DBETBTC:
                {infra: "BTC", supra: "DBET"},
            DBETDOGE:
                {infra: "DOGE", supra: "DBET"},
            DBETLTC:
                {infra: "LTC", supra: "DBET"},
            DBIXBTC:
                {infra: "BTC", supra: "DBIX"},
            DBIXDOGE:
                {infra: "DOGE", supra: "DBIX"},
            DBIXLTC:
                {infra: "LTC", supra: "DBIX"},
            DCNBTC:
                {infra: "BTC", supra: "DCN"},
            DCNDOGE:
                {infra: "DOGE", supra: "DCN"},
            DCNLTC:
                {infra: "LTC", supra: "DCN"},
            DCRBTC:
                {infra: "BTC", supra: "DCR"},
            DCRDOGE:
                {infra: "DOGE", supra: "DCR"},
            DCRLTC:
                {infra: "LTC", supra: "DCR"},
            DCRUSDT:
                {infra: "USD", supra: "DCR"},
            DCYBTC:
                {infra: "BTC", supra: "DCY"},
            DCYDOGE:
                {infra: "DOGE", supra: "DCY"},
            DCYLTC:
                {infra: "LTC", supra: "DCY"},
            DDFBTC:
                {infra: "BTC", supra: "DDF"},
            DDFDOGE:
                {infra: "DOGE", supra: "DDF"},
            DDFLTC:
                {infra: "LTC", supra: "DDF"},
            DEMBTC:
                {infra: "BTC", supra: "DEM"},
            DEMDOGE:
                {infra: "DOGE", supra: "DEM"},
            DEMLTC:
                {infra: "LTC", supra: "DEM"},
            DEUSBTC:
                {infra: "BTC", supra: "DEUS"},
            DEUSDOGE:
                {infra: "DOGE", supra: "DEUS"},
            DEUSLTC:
                {infra: "LTC", supra: "DEUS"},
            DFSBTC:
                {infra: "BTC", supra: "DFS"},
            DFSDOGE:
                {infra: "DOGE", supra: "DFS"},
            DFSLTC:
                {infra: "LTC", supra: "DFS"},
            DGBBTC:
                {infra: "BTC", supra: "DGB"},
            DGBDOGE:
                {infra: "DOGE", supra: "DGB"},
            DGBLTC:
                {infra: "LTC", supra: "DGB"},
            DGCBTC:
                {infra: "BTC", supra: "DGC"},
            DGCDOGE:
                {infra: "DOGE", supra: "DGC"},
            DGCLTC:
                {infra: "LTC", supra: "DGC"},
            DGPTBTC:
                {infra: "BTC", supra: "DGPT"},
            DGPTDOGE:
                {infra: "DOGE", supra: "DGPT"},
            DGPTLTC:
                {infra: "LTC", supra: "DGPT"},
            DIMEBTC:
                {infra: "BTC", supra: "DIME"},
            DIMEDOGE:
                {infra: "DOGE", supra: "DIME"},
            DIMELTC:
                {infra: "LTC", supra: "DIME"},
            DIVXBTC:
                {infra: "BTC", supra: "DIVX"},
            DIVXDOGE:
                {infra: "DOGE", supra: "DIVX"},
            DIVXLTC:
                {infra: "LTC", supra: "DIVX"},
            DNABTC:
                {infra: "BTC", supra: "DNA"},
            DNADOGE:
                {infra: "DOGE", supra: "DNA"},
            DNALTC:
                {infra: "LTC", supra: "DNA"},
            DNRBTC:
                {infra: "BTC", supra: "DNR"},
            DNRDOGE:
                {infra: "DOGE", supra: "DNR"},
            DNRLTC:
                {infra: "LTC", supra: "DNR"},
            DOGEBTC:
                {infra: "BTC", supra: "DOGE"},
            DOGELTC:
                {infra: "LTC", supra: "DOGE"},
            DOGENZDT:
                {infra: "NZDT", supra: "DOGE"},
            DOGEUSDT:
                {infra: "USD", supra: "DOGE"},
            DONBTC:
                {infra: "BTC", supra: "DON"},
            DONDOGE:
                {infra: "DOGE", supra: "DON"},
            DONLTC:
                {infra: "LTC", supra: "DON"},
            DOPEBTC:
                {infra: "BTC", supra: "DOPE"},
            DOPEDOGE:
                {infra: "DOGE", supra: "DOPE"},
            DOPELTC:
                {infra: "LTC", supra: "DOPE"},
            DOTBTC:
                {infra: "BTC", supra: "DOT"},
            DOTDOGE:
                {infra: "DOGE", supra: "DOT"},
            DOTLTC:
                {infra: "LTC", supra: "DOT"},
            DOTNZDT:
                {infra: "NZDT", supra: "DOT"},
            DOTUSDT:
                {infra: "USD", supra: "DOT"},
            DPBTC:
                {infra: "BTC", supra: "DP"},
            DPDOGE:
                {infra: "DOGE", supra: "DP"},
            DPLTC:
                {infra: "LTC", supra: "DP"},
            DPPBTC:
                {infra: "BTC", supra: "DPP"},
            DPPDOGE:
                {infra: "DOGE", supra: "DPP"},
            DPPLTC:
                {infra: "LTC", supra: "DPP"},
            DRPBTC:
                {infra: "BTC", supra: "DRP"},
            DRPDOGE:
                {infra: "DOGE", supra: "DRP"},
            DRPLTC:
                {infra: "LTC", supra: "DRP"},
            DRPUBTC:
                {infra: "BTC", supra: "DRPU"},
            DRXNEBTC:
                {infra: "BTC", supra: "DRXNE"},
            DRXNEDOGE:
                {infra: "DOGE", supra: "DRXNE"},
            DRXNELTC:
                {infra: "LTC", supra: "DRXNE"},
            DUOBTC:
                {infra: "BTC", supra: "DUO"},
            DUODOGE:
                {infra: "DOGE", supra: "DUO"},
            DUOLTC:
                {infra: "LTC", supra: "DUO"},
            EBGBTC:
                {infra: "BTC", supra: "EBG"},
            EBGDOGE:
                {infra: "DOGE", supra: "EBG"},
            EBGLTC:
                {infra: "LTC", supra: "EBG"},
            ECBTC:
                {infra: "BTC", supra: "EC"},
            ECDOGE:
                {infra: "DOGE", supra: "EC"},
            ECLTC:
                {infra: "LTC", supra: "EC"},
            ECOBBTC:
                {infra: "BTC", supra: "ECOB"},
            ECOBDOGE:
                {infra: "DOGE", supra: "ECOB"},
            ECOBLTC:
                {infra: "LTC", supra: "ECOB"},
            ECOBTC:
                {infra: "BTC", supra: "ECO"},
            ECODOGE:
                {infra: "DOGE", supra: "ECO"},
            ECOLTC:
                {infra: "LTC", supra: "ECO"},
            EDCBTC:
                {infra: "BTC", supra: "EDC"},
            EDCDOGE:
                {infra: "DOGE", supra: "EDC"},
            EDCLTC:
                {infra: "LTC", supra: "EDC"},
            EDDIEBTC:
                {infra: "BTC", supra: "EDDIE"},
            EDDIEDOGE:
                {infra: "DOGE", supra: "EDDIE"},
            EDDIELTC:
                {infra: "LTC", supra: "EDDIE"},
            EDRCBTC:
                {infra: "BTC", supra: "EDRC"},
            EDRCDOGE:
                {infra: "DOGE", supra: "EDRC"},
            EDRCLTC:
                {infra: "LTC", supra: "EDRC"},
            EFLBTC:
                {infra: "BTC", supra: "EFL"},
            EFLDOGE:
                {infra: "DOGE", supra: "EFL"},
            EFLLTC:
                {infra: "LTC", supra: "EFL"},
            EGCBTC:
                {infra: "BTC", supra: "EGC"},
            EGCDOGE:
                {infra: "DOGE", supra: "EGC"},
            EGCLTC:
                {infra: "LTC", supra: "EGC"},
            ELCBTC:
                {infra: "BTC", supra: "ELC"},
            ELCDOGE:
                {infra: "DOGE", supra: "ELC"},
            ELCLTC:
                {infra: "LTC", supra: "ELC"},
            ELLABTC:
                {infra: "BTC", supra: "ELLA"},
            ELLADOGE:
                {infra: "DOGE", supra: "ELLA"},
            ELLALTC:
                {infra: "LTC", supra: "ELLA"},
            ELMBTC:
                {infra: "BTC", supra: "ELM"},
            ELMDOGE:
                {infra: "DOGE", supra: "ELM"},
            ELMLTC:
                {infra: "LTC", supra: "ELM"},
            ELPDOGE:
                {infra: "DOGE", supra: "ELP"},
            ELPLTC:
                {infra: "LTC", supra: "ELP"},
            EMBDOGE:
                {infra: "DOGE", supra: "EMB"},
            EMBLTC:
                {infra: "LTC", supra: "EMB"},
            EMC2BTC:
                {infra: "BTC", supra: "EMC2"},
            EMC2DOGE:
                {infra: "DOGE", supra: "EMC2"},
            EMC2LTC:
                {infra: "LTC", supra: "EMC2"},
            EMCBTC:
                {infra: "BTC", supra: "EMC"},
            EMCDOGE:
                {infra: "DOGE", supra: "EMC"},
            EMCLTC:
                {infra: "LTC", supra: "EMC"},
            EMDBTC:
                {infra: "BTC", supra: "EMD"},
            EMDDOGE:
                {infra: "DOGE", supra: "EMD"},
            EMDLTC:
                {infra: "LTC", supra: "EMD"},
            ENJBTC:
                {infra: "BTC", supra: "ENJ"},
            ENJDOGE:
                {infra: "DOGE", supra: "ENJ"},
            ENJLTC:
                {infra: "LTC", supra: "ENJ"},
            EPCBTC:
                {infra: "BTC", supra: "EPC"},
            EPCDOGE:
                {infra: "DOGE", supra: "EPC"},
            EPCLTC:
                {infra: "LTC", supra: "EPC"},
            EQTBTC:
                {infra: "BTC", supra: "EQT"},
            EQTDOGE:
                {infra: "DOGE", supra: "EQT"},
            EQTLTC:
                {infra: "LTC", supra: "EQT"},
            ERYBTC:
                {infra: "BTC", supra: "ERY"},
            ERYDOGE:
                {infra: "DOGE", supra: "ERY"},
            ERYLTC:
                {infra: "LTC", supra: "ERY"},
            ETCBTC:
                {infra: "BTC", supra: "ETC"},
            ETCDOGE:
                {infra: "DOGE", supra: "ETC"},
            ETCLTC:
                {infra: "LTC", supra: "ETC"},
            ETCNZDT:
                {infra: "NZDT", supra: "ETC"},
            ETCUSDT:
                {infra: "USD", supra: "ETC"},
            ETHBTC:
                {infra: "BTC", supra: "ETH"},
            ETHDBTC:
                {infra: "BTC", supra: "ETHD"},
            ETHDDOGE:
                {infra: "DOGE", supra: "ETHD"},
            ETHDLTC:
                {infra: "LTC", supra: "ETHD"},
            ETHDOGE:
                {infra: "DOGE", supra: "ETH"},
            ETHLTC:
                {infra: "LTC", supra: "ETH"},
            ETHNZDT:
                {infra: "NZDT", supra: "ETH"},
            ETHUSDT:
                {infra: "USD", supra: "ETH"},
            ETNBTC:
                {infra: "BTC", supra: "ETN"},
            ETNDOGE:
                {infra: "DOGE", supra: "ETN"},
            ETNLTC:
                {infra: "LTC", supra: "ETN"},
            ETNNZDT:
                {infra: "NZDT", supra: "ETN"},
            ETNUSDT:
                {infra: "USD", supra: "ETN"},
            ETTBTC:
                {infra: "BTC", supra: "ETT"},
            ETTDOGE:
                {infra: "DOGE", supra: "ETT"},
            ETTLTC:
                {infra: "LTC", supra: "ETT"},
            EUCBTC:
                {infra: "BTC", supra: "EUC"},
            EUCDOGE:
                {infra: "DOGE", supra: "EUC"},
            EUCLTC:
                {infra: "LTC", supra: "EUC"},
            EVILBTC:
                {infra: "BTC", supra: "EVIL"},
            EVILDOGE:
                {infra: "DOGE", supra: "EVIL"},
            EVILLTC:
                {infra: "LTC", supra: "EVIL"},
            EVOBTC:
                {infra: "BTC", supra: "EVO"},
            EVODOGE:
                {infra: "DOGE", supra: "EVO"},
            EVOLTC:
                {infra: "LTC", supra: "EVO"},
            EVRBTC:
                {infra: "BTC", supra: "EVR"},
            EVRDOGE:
                {infra: "DOGE", supra: "EVR"},
            EVRLTC:
                {infra: "LTC", supra: "EVR"},
            EXPBTC:
                {infra: "BTC", supra: "EXP"},
            EXPDOGE:
                {infra: "DOGE", supra: "EXP"},
            EXPLTC:
                {infra: "LTC", supra: "EXP"},
            FAZZBTC:
                {infra: "BTC", supra: "FAZZ"},
            FAZZDOGE:
                {infra: "DOGE", supra: "FAZZ"},
            FAZZLTC:
                {infra: "LTC", supra: "FAZZ"},
            FCNBTC:
                {infra: "BTC", supra: "FCN"},
            FCNDOGE:
                {infra: "DOGE", supra: "FCN"},
            FCNLTC:
                {infra: "LTC", supra: "FCN"},
            FCTBTC:
                {infra: "BTC", supra: "FCT"},
            FCTDOGE:
                {infra: "DOGE", supra: "FCT"},
            FCTLTC:
                {infra: "LTC", supra: "FCT"},
            FFCBTC:
                {infra: "BTC", supra: "FFC"},
            FFCDOGE:
                {infra: "DOGE", supra: "FFC"},
            FFCLTC:
                {infra: "LTC", supra: "FFC"},
            FJCBTC:
                {infra: "BTC", supra: "FJC"},
            FJCDOGE:
                {infra: "DOGE", supra: "FJC"},
            FJCLTC:
                {infra: "LTC", supra: "FJC"},
            FLASHBTC:
                {infra: "BTC", supra: "FLASH"},
            FLASHDOGE:
                {infra: "DOGE", supra: "FLASH"},
            FLASHLTC:
                {infra: "LTC", supra: "FLASH"},
            FLAXBTC:
                {infra: "BTC", supra: "FLAX"},
            FLAXDOGE:
                {infra: "DOGE", supra: "FLAX"},
            FLAXLTC:
                {infra: "LTC", supra: "FLAX"},
            FLNBTC:
                {infra: "BTC", supra: "FLN"},
            FLNDOGE:
                {infra: "DOGE", supra: "FLN"},
            FLNLTC:
                {infra: "LTC", supra: "FLN"},
            FLTBTC:
                {infra: "BTC", supra: "FLT"},
            FLTDOGE:
                {infra: "DOGE", supra: "FLT"},
            FLTLTC:
                {infra: "LTC", supra: "FLT"},
            FONZBTC:
                {infra: "BTC", supra: "FONZ"},
            FONZDOGE:
                {infra: "DOGE", supra: "FONZ"},
            FONZLTC:
                {infra: "LTC", supra: "FONZ"},
            FORTBTC:
                {infra: "BTC", supra: "FORT"},
            FORTDOGE:
                {infra: "DOGE", supra: "FORT"},
            FORTLTC:
                {infra: "LTC", supra: "FORT"},
            FRCBTC:
                {infra: "BTC", supra: "FRC"},
            FRCDOGE:
                {infra: "DOGE", supra: "FRC"},
            FRCLTC:
                {infra: "LTC", supra: "FRC"},
            FRNBTC:
                {infra: "BTC", supra: "FRN"},
            FRNDOGE:
                {infra: "DOGE", supra: "FRN"},
            FRNLTC:
                {infra: "LTC", supra: "FRN"},
            FSTBTC:
                {infra: "BTC", supra: "FST"},
            FSTDOGE:
                {infra: "DOGE", supra: "FST"},
            FSTLTC:
                {infra: "LTC", supra: "FST"},
            FTCBTC:
                {infra: "BTC", supra: "FTC"},
            FTCCBTC:
                {infra: "BTC", supra: "FTCC"},
            FTCCDOGE:
                {infra: "DOGE", supra: "FTCC"},
            FTCCLTC:
                {infra: "LTC", supra: "FTCC"},
            FTCDOGE:
                {infra: "DOGE", supra: "FTC"},
            FTCLTC:
                {infra: "LTC", supra: "FTC"},
            FUELBTC:
                {infra: "BTC", supra: "FUEL"},
            FUELDOGE:
                {infra: "DOGE", supra: "FUEL"},
            FUELLTC:
                {infra: "LTC", supra: "FUEL"},
            FUNKBTC:
                {infra: "BTC", supra: "FUNK"},
            FUNKDOGE:
                {infra: "DOGE", supra: "FUNK"},
            FUNKLTC:
                {infra: "LTC", supra: "FUNK"},
            FUZZBTC:
                {infra: "BTC", supra: "FUZZ"},
            FUZZDOGE:
                {infra: "DOGE", supra: "FUZZ"},
            FUZZLTC:
                {infra: "LTC", supra: "FUZZ"},
            GAIABTC:
                {infra: "BTC", supra: "GAIA"},
            GAIADOGE:
                {infra: "DOGE", supra: "GAIA"},
            GAIALTC:
                {infra: "LTC", supra: "GAIA"},
            GAMEBTC:
                {infra: "BTC", supra: "GAME"},
            GAMEDOGE:
                {infra: "DOGE", supra: "GAME"},
            GAMELTC:
                {infra: "LTC", supra: "GAME"},
            GAPBTC:
                {infra: "BTC", supra: "GAP"},
            GAPDOGE:
                {infra: "DOGE", supra: "GAP"},
            GAPLTC:
                {infra: "LTC", supra: "GAP"},
            GAYBTC:
                {infra: "BTC", supra: "GAY"},
            GAYDOGE:
                {infra: "DOGE", supra: "GAY"},
            GAYLTC:
                {infra: "LTC", supra: "GAY"},
            GBXBTC:
                {infra: "BTC", supra: "GBX"},
            GBXDOGE:
                {infra: "DOGE", supra: "GBX"},
            GBXLTC:
                {infra: "LTC", supra: "GBX"},
            GBYTEBTC:
                {infra: "BTC", supra: "GBYTE"},
            GBYTEDOGE:
                {infra: "DOGE", supra: "GBYTE"},
            GBYTELTC:
                {infra: "LTC", supra: "GBYTE"},
            GCNBTC:
                {infra: "BTC", supra: "GCN"},
            GCNDOGE:
                {infra: "DOGE", supra: "GCN"},
            GCNLTC:
                {infra: "LTC", supra: "GCN"},
            GDCBTC:
                {infra: "BTC", supra: "GDC"},
            GDCDOGE:
                {infra: "DOGE", supra: "GDC"},
            GDCLTC:
                {infra: "LTC", supra: "GDC"},
            GEERTBTC:
                {infra: "BTC", supra: "GEERT"},
            GEERTDOGE:
                {infra: "DOGE", supra: "GEERT"},
            GEERTLTC:
                {infra: "LTC", supra: "GEERT"},
            GEOBTC:
                {infra: "BTC", supra: "GEO"},
            GEODOGE:
                {infra: "DOGE", supra: "GEO"},
            GEOLTC:
                {infra: "LTC", supra: "GEO"},
            GEOOldBTC:
                {infra: "BTC", supra: "GEO_Old"},
            GEOOldDOGE:
                {infra: "DOGE", supra: "GEO_Old"},
            GEOOldLTC:
                {infra: "LTC", supra: "GEO_Old"},
            GLDBTC:
                {infra: "BTC", supra: "GLD"},
            GLDDOGE:
                {infra: "DOGE", supra: "GLD"},
            GLDLTC:
                {infra: "LTC", supra: "GLD"},
            GNOBTC:
                {infra: "BTC", supra: "GNO"},
            GNODOGE:
                {infra: "DOGE", supra: "GNO"},
            GNOLTC:
                {infra: "LTC", supra: "GNO"},
            GNTBTC:
                {infra: "BTC", supra: "GNT"},
            GNTDOGE:
                {infra: "DOGE", supra: "GNT"},
            GNTLTC:
                {infra: "LTC", supra: "GNT"},
            GPBTC:
                {infra: "BTC", supra: "GP"},
            GPDOGE:
                {infra: "DOGE", supra: "GP"},
            GPLBTC:
                {infra: "BTC", supra: "GPL"},
            GPLDOGE:
                {infra: "DOGE", supra: "GPL"},
            GPLLTC:
                {infra: "LTC", supra: "GPL"},
            GPLTC:
                {infra: "LTC", supra: "GP"},
            GPUBTC:
                {infra: "BTC", supra: "GPU"},
            GPUDOGE:
                {infra: "DOGE", supra: "GPU"},
            GPULTC:
                {infra: "LTC", supra: "GPU"},
            GRNBTC:
                {infra: "BTC", supra: "GRN"},
            GRNDOGE:
                {infra: "DOGE", supra: "GRN"},
            GRNLTC:
                {infra: "LTC", supra: "GRN"},
            GRSBTC:
                {infra: "BTC", supra: "GRS"},
            GRSDOGE:
                {infra: "DOGE", supra: "GRS"},
            GRSLTC:
                {infra: "LTC", supra: "GRS"},
            GRWBTC:
                {infra: "BTC", supra: "GRW"},
            GRWDOGE:
                {infra: "DOGE", supra: "GRW"},
            GRWIBTC:
                {infra: "BTC", supra: "GRWI"},
            GRWIDOGE:
                {infra: "DOGE", supra: "GRWI"},
            GRWILTC:
                {infra: "LTC", supra: "GRWI"},
            GRWLTC:
                {infra: "LTC", supra: "GRW"},
            GUNBTC:
                {infra: "BTC", supra: "GUN"},
            GUNDOGE:
                {infra: "DOGE", supra: "GUN"},
            GUNLTC:
                {infra: "LTC", supra: "GUN"},
            GXGBTC:
                {infra: "BTC", supra: "GXG"},
            GXGDOGE:
                {infra: "DOGE", supra: "GXG"},
            GXGLTC:
                {infra: "LTC", supra: "GXG"},
            HACBTC:
                {infra: "BTC", supra: "HAC"},
            HACDOGE:
                {infra: "DOGE", supra: "HAC"},
            HACLTC:
                {infra: "LTC", supra: "HAC"},
            HALBTC:
                {infra: "BTC", supra: "HAL"},
            HALDOGE:
                {infra: "DOGE", supra: "HAL"},
            HALLTC:
                {infra: "LTC", supra: "HAL"},
            HAVBTC:
                {infra: "BTC", supra: "HAV"},
            HAVDOGE:
                {infra: "DOGE", supra: "HAV"},
            HAVLTC:
                {infra: "LTC", supra: "HAV"},
            HBCBTC:
                {infra: "BTC", supra: "HBC"},
            HBCDOGE:
                {infra: "DOGE", supra: "HBC"},
            HBCLTC:
                {infra: "LTC", supra: "HBC"},
            HBNBTC:
                {infra: "BTC", supra: "HBN"},
            HBNDOGE:
                {infra: "DOGE", supra: "HBN"},
            HBNLTC:
                {infra: "LTC", supra: "HBN"},
            HCBTC:
                {infra: "BTC", supra: "HC"},
            HCDOGE:
                {infra: "DOGE", supra: "HC"},
            HCLTC:
                {infra: "LTC", supra: "HC"},
            HDLBBTC:
                {infra: "BTC", supra: "HDLB"},
            HDLBDOGE:
                {infra: "DOGE", supra: "HDLB"},
            HDLBLTC:
                {infra: "LTC", supra: "HDLB"},
            HEATBTC:
                {infra: "BTC", supra: "HEAT"},
            HEATDOGE:
                {infra: "DOGE", supra: "HEAT"},
            HEATLTC:
                {infra: "LTC", supra: "HEAT"},
            HLMBTC:
                {infra: "BTC", supra: "HLM"},
            HLMDOGE:
                {infra: "DOGE", supra: "HLM"},
            HLMLTC:
                {infra: "LTC", supra: "HLM"},
            HOLDBTC:
                {infra: "BTC", supra: "HOLD"},
            HOLDDOGE:
                {infra: "DOGE", supra: "HOLD"},
            HOLDLTC:
                {infra: "LTC", supra: "HOLD"},
            HSRBTC:
                {infra: "BTC", supra: "HSR"},
            HSRDOGE:
                {infra: "DOGE", supra: "HSR"},
            HSRLTC:
                {infra: "LTC", supra: "HSR"},
            HSTBTC:
                {infra: "BTC", supra: "HST"},
            HSTDOGE:
                {infra: "DOGE", supra: "HST"},
            HSTLTC:
                {infra: "LTC", supra: "HST"},
            HUSHBTC:
                {infra: "BTC", supra: "HUSH"},
            HUSHDOGE:
                {infra: "DOGE", supra: "HUSH"},
            HUSHLTC:
                {infra: "LTC", supra: "HUSH"},
            HUSHNZDT:
                {infra: "NZDT", supra: "HUSH"},
            HUSHUSDT:
                {infra: "USD", supra: "HUSH"},
            HXXBTC:
                {infra: "BTC", supra: "HXX"},
            HXXDOGE:
                {infra: "DOGE", supra: "HXX"},
            HXXLTC:
                {infra: "LTC", supra: "HXX"},
            HYPBTC:
                {infra: "BTC", supra: "HYP"},
            HYPDOGE:
                {infra: "DOGE", supra: "HYP"},
            HYPLTC:
                {infra: "LTC", supra: "HYP"},
            I0CBTC:
                {infra: "BTC", supra: "I0C"},
            I0CDOGE:
                {infra: "DOGE", supra: "I0C"},
            I0CLTC:
                {infra: "LTC", supra: "I0C"},
            ICOBBTC:
                {infra: "BTC", supra: "ICOB"},
            ICOBDOGE:
                {infra: "DOGE", supra: "ICOB"},
            ICOBLTC:
                {infra: "LTC", supra: "ICOB"},
            IFLTBTC:
                {infra: "BTC", supra: "IFLT"},
            IFLTDOGE:
                {infra: "DOGE", supra: "IFLT"},
            IFLTLTC:
                {infra: "LTC", supra: "IFLT"},
            IFTBTC:
                {infra: "BTC", supra: "IFT"},
            IFTDOGE:
                {infra: "DOGE", supra: "IFT"},
            IFTLTC:
                {infra: "LTC", supra: "IFT"},
            IMSBTC:
                {infra: "BTC", supra: "IMS"},
            IMSDOGE:
                {infra: "DOGE", supra: "IMS"},
            IMSLTC:
                {infra: "LTC", supra: "IMS"},
            INBTC:
                {infra: "BTC", supra: "IN"},
            INDOGE:
                {infra: "DOGE", supra: "IN"},
            INFXBTC:
                {infra: "BTC", supra: "INFX"},
            INFXDOGE:
                {infra: "DOGE", supra: "INFX"},
            INFXLTC:
                {infra: "LTC", supra: "INFX"},
            INLTC:
                {infra: "LTC", supra: "IN"},
            INNBTC:
                {infra: "BTC", supra: "INN"},
            INNDOGE:
                {infra: "DOGE", supra: "INN"},
            INNLTC:
                {infra: "LTC", supra: "INN"},
            INSNBTC:
                {infra: "BTC", supra: "INSN"},
            INSNDOGE:
                {infra: "DOGE", supra: "INSN"},
            INSNLTC:
                {infra: "LTC", supra: "INSN"},
            IQTBTC:
                {infra: "BTC", supra: "IQT"},
            IQTDOGE:
                {infra: "DOGE", supra: "IQT"},
            IQTLTC:
                {infra: "LTC", supra: "IQT"},
            IRLBTC:
                {infra: "BTC", supra: "IRL"},
            IRLDOGE:
                {infra: "DOGE", supra: "IRL"},
            IRLLTC:
                {infra: "LTC", supra: "IRL"},
            ITIBTC:
                {infra: "BTC", supra: "ITI"},
            ITIDOGE:
                {infra: "DOGE", supra: "ITI"},
            ITILTC:
                {infra: "LTC", supra: "ITI"},
            IXCBTC:
                {infra: "BTC", supra: "IXC"},
            IXCDOGE:
                {infra: "DOGE", supra: "IXC"},
            IXCLTC:
                {infra: "LTC", supra: "IXC"},
            IZEBTC:
                {infra: "BTC", supra: "IZE"},
            IZEDOGE:
                {infra: "DOGE", supra: "IZE"},
            IZELTC:
                {infra: "LTC", supra: "IZE"},
            KASHBTC:
                {infra: "BTC", supra: "KASH"},
            KASHDOGE:
                {infra: "DOGE", supra: "KASH"},
            KASHLTC:
                {infra: "LTC", supra: "KASH"},
            KAYIBTC:
                {infra: "BTC", supra: "KAYI"},
            KAYIDOGE:
                {infra: "DOGE", supra: "KAYI"},
            KAYILTC:
                {infra: "LTC", supra: "KAYI"},
            KBRBTC:
                {infra: "BTC", supra: "KBR"},
            KBRDOGE:
                {infra: "DOGE", supra: "KBR"},
            KBRLTC:
                {infra: "LTC", supra: "KBR"},
            KDCBTC:
                {infra: "BTC", supra: "KDC"},
            KDCDOGE:
                {infra: "DOGE", supra: "KDC"},
            KDCLTC:
                {infra: "LTC", supra: "KDC"},
            KEDBTC:
                {infra: "BTC", supra: "KED"},
            KEDDOGE:
                {infra: "DOGE", supra: "KED"},
            KEDLTC:
                {infra: "LTC", supra: "KED"},
            KEKBTC:
                {infra: "BTC", supra: "KEK"},
            KEKDOGE:
                {infra: "DOGE", supra: "KEK"},
            KEKLTC:
                {infra: "LTC", supra: "KEK"},
            KGBBTC:
                {infra: "BTC", supra: "KGB"},
            KGBDOGE:
                {infra: "DOGE", supra: "KGB"},
            KGBLTC:
                {infra: "LTC", supra: "KGB"},
            KINGBTC:
                {infra: "BTC", supra: "KING"},
            KINGDOGE:
                {infra: "DOGE", supra: "KING"},
            KINGLTC:
                {infra: "LTC", supra: "KING"},
            KMDBTC:
                {infra: "BTC", supra: "KMD"},
            KMDDOGE:
                {infra: "DOGE", supra: "KMD"},
            KMDLTC:
                {infra: "LTC", supra: "KMD"},
            KNCBTC:
                {infra: "BTC", supra: "KNC"},
            KNCDOGE:
                {infra: "DOGE", supra: "KNC"},
            KNCLTC:
                {infra: "LTC", supra: "KNC"},
            KOBOBTC:
                {infra: "BTC", supra: "KOBO"},
            KOBODOGE:
                {infra: "DOGE", supra: "KOBO"},
            KOBOLTC:
                {infra: "LTC", supra: "KOBO"},
            KRBBTC:
                {infra: "BTC", supra: "KRB"},
            KRBDOGE:
                {infra: "DOGE", supra: "KRB"},
            KRBLTC:
                {infra: "LTC", supra: "KRB"},
            KRONEBTC:
                {infra: "BTC", supra: "KRONE"},
            KRONEDOGE:
                {infra: "DOGE", supra: "KRONE"},
            KRONELTC:
                {infra: "LTC", supra: "KRONE"},
            KUMABTC:
                {infra: "BTC", supra: "KUMA"},
            KUMADOGE:
                {infra: "DOGE", supra: "KUMA"},
            KUMALTC:
                {infra: "LTC", supra: "KUMA"},
            KURTBTC:
                {infra: "BTC", supra: "KURT"},
            KURTDOGE:
                {infra: "DOGE", supra: "KURT"},
            KURTLTC:
                {infra: "LTC", supra: "KURT"},
            KUSHBTC:
                {infra: "BTC", supra: "KUSH"},
            KUSHDOGE:
                {infra: "DOGE", supra: "KUSH"},
            KUSHLTC:
                {infra: "LTC", supra: "KUSH"},
            LANABTC:
                {infra: "BTC", supra: "LANA"},
            LANADOGE:
                {infra: "DOGE", supra: "LANA"},
            LANALTC:
                {infra: "LTC", supra: "LANA"},
            LBCBTC:
                {infra: "BTC", supra: "LBC"},
            LBCDOGE:
                {infra: "DOGE", supra: "LBC"},
            LBCLTC:
                {infra: "LTC", supra: "LBC"},
            LBTCBTC:
                {infra: "BTC", supra: "LBTC"},
            LBTCDOGE:
                {infra: "DOGE", supra: "LBTC"},
            LBTCLTC:
                {infra: "LTC", supra: "LBTC"},
            LCPBTC:
                {infra: "BTC", supra: "LCP"},
            LCPDOGE:
                {infra: "DOGE", supra: "LCP"},
            LCPLTC:
                {infra: "LTC", supra: "LCP"},
            LDCBTC:
                {infra: "BTC", supra: "LDC"},
            LDCDOGE:
                {infra: "DOGE", supra: "LDC"},
            LDCLTC:
                {infra: "LTC", supra: "LDC"},
            LDOGEBTC:
                {infra: "BTC", supra: "LDOGE"},
            LDOGEDOGE:
                {infra: "DOGE", supra: "LDOGE"},
            LDOGELTC:
                {infra: "LTC", supra: "LDOGE"},
            LEABTC:
                {infra: "BTC", supra: "LEA"},
            LEADOGE:
                {infra: "DOGE", supra: "LEA"},
            LEAFBTC:
                {infra: "BTC", supra: "LEAF"},
            LEAFDOGE:
                {infra: "DOGE", supra: "LEAF"},
            LEAFLTC:
                {infra: "LTC", supra: "LEAF"},
            LEALTC:
                {infra: "LTC", supra: "LEA"},
            LEMONBTC:
                {infra: "BTC", supra: "LEMON"},
            LEMONDOGE:
                {infra: "DOGE", supra: "LEMON"},
            LEMONLTC:
                {infra: "LTC", supra: "LEMON"},
            LEPENDOGE:
                {infra: "DOGE", supra: "LEPEN"},
            LEPENLTC:
                {infra: "LTC", supra: "LEPEN"},
            LFTCBTC:
                {infra: "BTC", supra: "LFTC"},
            LFTCDOGE:
                {infra: "DOGE", supra: "LFTC"},
            LFTCLTC:
                {infra: "LTC", supra: "LFTC"},
            LINDABTC:
                {infra: "BTC", supra: "LINDA"},
            LINDADOGE:
                {infra: "DOGE", supra: "LINDA"},
            LINDALTC:
                {infra: "LTC", supra: "LINDA"},
            LINXBTC:
                {infra: "BTC", supra: "LINX"},
            LINXDOGE:
                {infra: "DOGE", supra: "LINX"},
            LINXLTC:
                {infra: "LTC", supra: "LINX"},
            LITBTC:
                {infra: "BTC", supra: "LIT"},
            LITDOGE:
                {infra: "DOGE", supra: "LIT"},
            LITLTC:
                {infra: "LTC", supra: "LIT"},
            LIZIBTC:
                {infra: "BTC", supra: "LIZI"},
            LIZIDOGE:
                {infra: "DOGE", supra: "LIZI"},
            LIZILTC:
                {infra: "LTC", supra: "LIZI"},
            LOOKDOGE:
                {infra: "DOGE", supra: "LOOK"},
            LOOKLTC:
                {infra: "LTC", supra: "LOOK"},
            LOTBTC:
                {infra: "BTC", supra: "LOT"},
            LOTDOGE:
                {infra: "DOGE", supra: "LOT"},
            LOTLTC:
                {infra: "LTC", supra: "LOT"},
            LTBBTC:
                {infra: "BTC", supra: "LTB"},
            LTBDOGE:
                {infra: "DOGE", supra: "LTB"},
            LTBLTC:
                {infra: "LTC", supra: "LTB"},
            LTCBTC:
                {infra: "BTC", supra: "LTC"},
            LTCNZDT:
                {infra: "NZDT", supra: "LTC"},
            LTCUBTC:
                {infra: "BTC", supra: "LTCU"},
            LTCUDOGE:
                {infra: "DOGE", supra: "LTCU"},
            LTCULTC:
                {infra: "LTC", supra: "LTCU"},
            LTCUSDT:
                {infra: "USD", supra: "LTC"},
            LUXBTC:
                {infra: "BTC", supra: "LUX"},
            LUXDOGE:
                {infra: "DOGE", supra: "LUX"},
            LUXLTC:
                {infra: "LTC", supra: "LUX"},
            LUXNZDT:
                {infra: "NZDT", supra: "LUX"},
            LUXUSDT:
                {infra: "USD", supra: "LUX"},
            LYCBTC:
                {infra: "BTC", supra: "LYC"},
            LYCDOGE:
                {infra: "DOGE", supra: "LYC"},
            LYCLTC:
                {infra: "LTC", supra: "LYC"},
            MACBTC:
                {infra: "BTC", supra: "MAC"},
            MACDOGE:
                {infra: "DOGE", supra: "MAC"},
            MACLTC:
                {infra: "LTC", supra: "MAC"},
            MAGEBTC:
                {infra: "BTC", supra: "MAGE"},
            MAGEDOGE:
                {infra: "DOGE", supra: "MAGE"},
            MAGELTC:
                {infra: "LTC", supra: "MAGE"},
            MAGNBTC:
                {infra: "BTC", supra: "MAGN"},
            MAGNDOGE:
                {infra: "DOGE", supra: "MAGN"},
            MAGNLTC:
                {infra: "LTC", supra: "MAGN"},
            MAIDBTC:
                {infra: "BTC", supra: "MAID"},
            MAIDDOGE:
                {infra: "DOGE", supra: "MAID"},
            MAIDLTC:
                {infra: "LTC", supra: "MAID"},
            MARBTC:
                {infra: "BTC", supra: "MAR"},
            MARDOGE:
                {infra: "DOGE", supra: "MAR"},
            MARLTC:
                {infra: "LTC", supra: "MAR"},
            MARSBTC:
                {infra: "BTC", supra: "MARS"},
            MARSDOGE:
                {infra: "DOGE", supra: "MARS"},
            MARSLTC:
                {infra: "LTC", supra: "MARS"},
            MARXBTC:
                {infra: "BTC", supra: "MARX"},
            MARXDOGE:
                {infra: "DOGE", supra: "MARX"},
            MARXLTC:
                {infra: "LTC", supra: "MARX"},
            MATRXBTC:
                {infra: "BTC", supra: "MATRX"},
            MATRXDOGE:
                {infra: "DOGE", supra: "MATRX"},
            MATRXLTC:
                {infra: "LTC", supra: "MATRX"},
            MBRSBTC:
                {infra: "BTC", supra: "MBRS"},
            MBRSDOGE:
                {infra: "DOGE", supra: "MBRS"},
            MBRSLTC:
                {infra: "LTC", supra: "MBRS"},
            MCIBTC:
                {infra: "BTC", supra: "MCI"},
            MCIDOGE:
                {infra: "DOGE", supra: "MCI"},
            MCILTC:
                {infra: "LTC", supra: "MCI"},
            MCRNBTC:
                {infra: "BTC", supra: "MCRN"},
            MCRNDOGE:
                {infra: "DOGE", supra: "MCRN"},
            MCRNLTC:
                {infra: "LTC", supra: "MCRN"},
            MECBTC:
                {infra: "BTC", supra: "MEC"},
            MECDOGE:
                {infra: "DOGE", supra: "MEC"},
            MECLTC:
                {infra: "LTC", supra: "MEC"},
            MEOWDOGE:
                {infra: "DOGE", supra: "MEOW"},
            MEOWLTC:
                {infra: "LTC", supra: "MEOW"},
            MGOBTC:
                {infra: "BTC", supra: "MGO"},
            MGODOGE:
                {infra: "DOGE", supra: "MGO"},
            MGOLTC:
                {infra: "LTC", supra: "MGO"},
            MGXBTC:
                {infra: "BTC", supra: "MGX"},
            MGXDOGE:
                {infra: "DOGE", supra: "MGX"},
            MGXLTC:
                {infra: "LTC", supra: "MGX"},
            MINEXBTC:
                {infra: "BTC", supra: "MINEX"},
            MINEXDOGE:
                {infra: "DOGE", supra: "MINEX"},
            MINEXLTC:
                {infra: "LTC", supra: "MINEX"},
            MINTBTC:
                {infra: "BTC", supra: "MINT"},
            MINTDOGE:
                {infra: "DOGE", supra: "MINT"},
            MINTLTC:
                {infra: "LTC", supra: "MINT"},
            MLITEBTC:
                {infra: "BTC", supra: "MLITE"},
            MLITEDOGE:
                {infra: "DOGE", supra: "MLITE"},
            MLITELTC:
                {infra: "LTC", supra: "MLITE"},
            MNEBTC:
                {infra: "BTC", supra: "MNE"},
            MNEDOGE:
                {infra: "DOGE", supra: "MNE"},
            MNELTC:
                {infra: "LTC", supra: "MNE"},
            MNMBTC:
                {infra: "BTC", supra: "MNM"},
            MNMDOGE:
                {infra: "DOGE", supra: "MNM"},
            MNMLTC:
                {infra: "LTC", supra: "MNM"},
            MOINBTC:
                {infra: "BTC", supra: "MOIN"},
            MOINDOGE:
                {infra: "DOGE", supra: "MOIN"},
            MOINLTC:
                {infra: "LTC", supra: "MOIN"},
            MOJOBTC:
                {infra: "BTC", supra: "MOJO"},
            MOJODOGE:
                {infra: "DOGE", supra: "MOJO"},
            MOJOLTC:
                {infra: "LTC", supra: "MOJO"},
            MONKBTC:
                {infra: "BTC", supra: "MONK"},
            MONKDOGE:
                {infra: "DOGE", supra: "MONK"},
            MONKLTC:
                {infra: "LTC", supra: "MONK"},
            MOTOBTC:
                {infra: "BTC", supra: "MOTO"},
            MOTODOGE:
                {infra: "DOGE", supra: "MOTO"},
            MOTOLTC:
                {infra: "LTC", supra: "MOTO"},
            MSPBTC:
                {infra: "BTC", supra: "MSP"},
            MSPDOGE:
                {infra: "DOGE", supra: "MSP"},
            MSPLTC:
                {infra: "LTC", supra: "MSP"},
            MSTBTC:
                {infra: "BTC", supra: "MST"},
            MSTDOGE:
                {infra: "DOGE", supra: "MST"},
            MSTLTC:
                {infra: "LTC", supra: "MST"},
            MTLBTC:
                {infra: "BTC", supra: "MTL"},
            MTLDOGE:
                {infra: "DOGE", supra: "MTL"},
            MTLLTC:
                {infra: "LTC", supra: "MTL"},
            MTLMCBTC:
                {infra: "BTC", supra: "MTLMC"},
            MTLMCDOGE:
                {infra: "DOGE", supra: "MTLMC"},
            MTLMCLTC:
                {infra: "LTC", supra: "MTLMC"},
            MTNCBTC:
                {infra: "BTC", supra: "MTNC"},
            MTNCDOGE:
                {infra: "DOGE", supra: "MTNC"},
            MTNCLTC:
                {infra: "LTC", supra: "MTNC"},
            MUSICBTC:
                {infra: "BTC", supra: "MUSIC"},
            MUSICDOGE:
                {infra: "DOGE", supra: "MUSIC"},
            MUSICLTC:
                {infra: "LTC", supra: "MUSIC"},
            MYBBTC:
                {infra: "BTC", supra: "MYB"},
            MYBDOGE:
                {infra: "DOGE", supra: "MYB"},
            MYBLTC:
                {infra: "LTC", supra: "MYB"},
            MZCBTC:
                {infra: "BTC", supra: "MZC"},
            MZCDOGE:
                {infra: "DOGE", supra: "MZC"},
            MZCLTC:
                {infra: "LTC", supra: "MZC"},
            NAMOBTC:
                {infra: "BTC", supra: "NAMO"},
            NAMODOGE:
                {infra: "DOGE", supra: "NAMO"},
            NAMOLTC:
                {infra: "LTC", supra: "NAMO"},
            NAVBTC:
                {infra: "BTC", supra: "NAV"},
            NAVDOGE:
                {infra: "DOGE", supra: "NAV"},
            NAVLTC:
                {infra: "LTC", supra: "NAV"},
            NAVNZDT:
                {infra: "NZDT", supra: "NAV"},
            NAVUSDT:
                {infra: "USD", supra: "NAV"},
            NDAOBTC:
                {infra: "BTC", supra: "NDAO"},
            NDAODOGE:
                {infra: "DOGE", supra: "NDAO"},
            NDAOLTC:
                {infra: "LTC", supra: "NDAO"},
            NEBLBTC:
                {infra: "BTC", supra: "NEBL"},
            NEBLDOGE:
                {infra: "DOGE", supra: "NEBL"},
            NEBLLTC:
                {infra: "LTC", supra: "NEBL"},
            NEOBTC:
                {infra: "BTC", supra: "NEO"},
            NEODOGE:
                {infra: "DOGE", supra: "NEO"},
            NEOLTC:
                {infra: "LTC", supra: "NEO"},
            NETBTC:
                {infra: "BTC", supra: "NET"},
            NETDOGE:
                {infra: "DOGE", supra: "NET"},
            NETKOBTC:
                {infra: "BTC", supra: "NETKO"},
            NETKODOGE:
                {infra: "DOGE", supra: "NETKO"},
            NETKOLTC:
                {infra: "LTC", supra: "NETKO"},
            NETLTC:
                {infra: "LTC", supra: "NET"},
            NEVABTC:
                {infra: "BTC", supra: "NEVA"},
            NEVADOGE:
                {infra: "DOGE", supra: "NEVA"},
            NEVALTC:
                {infra: "LTC", supra: "NEVA"},
            NKABTC:
                {infra: "BTC", supra: "NKA"},
            NKADOGE:
                {infra: "DOGE", supra: "NKA"},
            NKALTC:
                {infra: "LTC", supra: "NKA"},
            NLC2BTC:
                {infra: "BTC", supra: "NLC2"},
            NLC2DOGE:
                {infra: "DOGE", supra: "NLC2"},
            NLC2LTC:
                {infra: "LTC", supra: "NLC2"},
            NMCBTC:
                {infra: "BTC", supra: "NMC"},
            NMCDOGE:
                {infra: "DOGE", supra: "NMC"},
            NMCLTC:
                {infra: "LTC", supra: "NMC"},
            NMSBTC:
                {infra: "BTC", supra: "NMS"},
            NMSDOGE:
                {infra: "DOGE", supra: "NMS"},
            NMSLTC:
                {infra: "LTC", supra: "NMS"},
            NOBLBTC:
                {infra: "BTC", supra: "NOBL"},
            NOBLDOGE:
                {infra: "DOGE", supra: "NOBL"},
            NOBLLTC:
                {infra: "LTC", supra: "NOBL"},
            NOTEBTC:
                {infra: "BTC", supra: "NOTE"},
            NOTEDOGE:
                {infra: "DOGE", supra: "NOTE"},
            NOTELTC:
                {infra: "LTC", supra: "NOTE"},
            NTRNBTC:
                {infra: "BTC", supra: "NTRN"},
            NTRNDOGE:
                {infra: "DOGE", supra: "NTRN"},
            NTRNLTC:
                {infra: "LTC", supra: "NTRN"},
            NVCBTC:
                {infra: "BTC", supra: "NVC"},
            NVCDOGE:
                {infra: "DOGE", supra: "NVC"},
            NVCLTC:
                {infra: "LTC", supra: "NVC"},
            NXSBTC:
                {infra: "BTC", supra: "NXS"},
            NXSDOGE:
                {infra: "DOGE", supra: "NXS"},
            NXSLTC:
                {infra: "LTC", supra: "NXS"},
            NYANBTC:
                {infra: "BTC", supra: "NYAN"},
            NYANDOGE:
                {infra: "DOGE", supra: "NYAN"},
            NYANLTC:
                {infra: "LTC", supra: "NYAN"},
            NZDTUSDT:
                {infra: "USD", supra: "NZDT"},
            ODNBTC:
                {infra: "BTC", supra: "ODN"},
            ODNDOGE:
                {infra: "DOGE", supra: "ODN"},
            ODNLTC:
                {infra: "LTC", supra: "ODN"},
            OFFBTC:
                {infra: "BTC", supra: "OFF"},
            OFFDOGE:
                {infra: "DOGE", supra: "OFF"},
            OFFLTC:
                {infra: "LTC", supra: "OFF"},
            OKBTC:
                {infra: "BTC", supra: "OK"},
            OKDOGE:
                {infra: "DOGE", supra: "OK"},
            OKLTC:
                {infra: "LTC", supra: "OK"},
            OMGBTC:
                {infra: "BTC", supra: "OMG"},
            OMGDOGE:
                {infra: "DOGE", supra: "OMG"},
            OMGLTC:
                {infra: "LTC", supra: "OMG"},
            ONIONBTC:
                {infra: "BTC", supra: "ONION"},
            ONIONDOGE:
                {infra: "DOGE", supra: "ONION"},
            ONIONLTC:
                {infra: "LTC", supra: "ONION"},
            OOOBTC:
                {infra: "BTC", supra: "OOO"},
            OOODOGE:
                {infra: "DOGE", supra: "OOO"},
            OOOLTC:
                {infra: "LTC", supra: "OOO"},
            OPALBTC:
                {infra: "BTC", supra: "OPAL"},
            OPALDOGE:
                {infra: "DOGE", supra: "OPAL"},
            OPALLTC:
                {infra: "LTC", supra: "OPAL"},
            OPCBTC:
                {infra: "BTC", supra: "OPC"},
            OPCDOGE:
                {infra: "DOGE", supra: "OPC"},
            OPCLTC:
                {infra: "LTC", supra: "OPC"},
            ORBBTC:
                {infra: "BTC", supra: "ORB"},
            ORBDOGE:
                {infra: "DOGE", supra: "ORB"},
            ORBLTC:
                {infra: "LTC", supra: "ORB"},
            ORMEBTC:
                {infra: "BTC", supra: "ORME"},
            ORMEDOGE:
                {infra: "DOGE", supra: "ORME"},
            ORMELTC:
                {infra: "LTC", supra: "ORME"},
            ORMENZDT:
                {infra: "NZDT", supra: "ORME"},
            ORMEUSDT:
                {infra: "USD", supra: "ORME"},
            OSCBTC:
                {infra: "BTC", supra: "OSC"},
            OSCDOGE:
                {infra: "DOGE", supra: "OSC"},
            OSCLTC:
                {infra: "LTC", supra: "OSC"},
            OTNBTC:
                {infra: "BTC", supra: "OTN"},
            OTNDOGE:
                {infra: "DOGE", supra: "OTN"},
            OTNLTC:
                {infra: "LTC", supra: "OTN"},
            OXBTC:
                {infra: "BTC", supra: "OX"},
            OXDOGE:
                {infra: "DOGE", supra: "OX"},
            OXLTC:
                {infra: "LTC", supra: "OX"},
            OZCBTC:
                {infra: "BTC", supra: "OZC"},
            OZCDOGE:
                {infra: "DOGE", supra: "OZC"},
            OZCLTC:
                {infra: "LTC", supra: "OZC"},
            PACBTC:
                {infra: "BTC", supra: "PAC"},
            PACDOGE:
                {infra: "DOGE", supra: "PAC"},
            PACLTC:
                {infra: "LTC", supra: "PAC"},
            PAKBTC:
                {infra: "BTC", supra: "PAK"},
            PAKDOGE:
                {infra: "DOGE", supra: "PAK"},
            PAKLTC:
                {infra: "LTC", supra: "PAK"},
            PASLBTC:
                {infra: "BTC", supra: "PASL"},
            PASLDOGE:
                {infra: "DOGE", supra: "PASL"},
            PASLLTC:
                {infra: "LTC", supra: "PASL"},
            PAYBTC:
                {infra: "BTC", supra: "PAY"},
            PAYDOGE:
                {infra: "DOGE", supra: "PAY"},
            PAYLTC:
                {infra: "LTC", supra: "PAY"},
            PBLBTC:
                {infra: "BTC", supra: "PBL"},
            PBLDOGE:
                {infra: "DOGE", supra: "PBL"},
            PBLLTC:
                {infra: "LTC", supra: "PBL"},
            PCCBTC:
                {infra: "BTC", supra: "PCC"},
            PCCDOGE:
                {infra: "DOGE", supra: "PCC"},
            PCCLTC:
                {infra: "LTC", supra: "PCC"},
            PCOINBTC:
                {infra: "BTC", supra: "PCOIN"},
            PCOINDOGE:
                {infra: "DOGE", supra: "PCOIN"},
            PCOINLTC:
                {infra: "LTC", supra: "PCOIN"},
            PENGBTC:
                {infra: "BTC", supra: "PENG"},
            PENGDOGE:
                {infra: "DOGE", supra: "PENG"},
            PENGLTC:
                {infra: "LTC", supra: "PENG"},
            PEPEBTC:
                {infra: "BTC", supra: "PEPE"},
            PEPEDOGE:
                {infra: "DOGE", supra: "PEPE"},
            PEPELTC:
                {infra: "LTC", supra: "PEPE"},
            PHOBTC:
                {infra: "BTC", supra: "PHO"},
            PHODOGE:
                {infra: "DOGE", supra: "PHO"},
            PHOLTC:
                {infra: "LTC", supra: "PHO"},
            PHRBTC:
                {infra: "BTC", supra: "PHR"},
            PHRDOGE:
                {infra: "DOGE", supra: "PHR"},
            PHRLTC:
                {infra: "LTC", supra: "PHR"},
            PHSBTC:
                {infra: "BTC", supra: "PHS"},
            PHSDOGE:
                {infra: "DOGE", supra: "PHS"},
            PHSLTC:
                {infra: "LTC", supra: "PHS"},
            PIGGYBTC:
                {infra: "BTC", supra: "PIGGY"},
            PIGGYDOGE:
                {infra: "DOGE", supra: "PIGGY"},
            PIGGYLTC:
                {infra: "LTC", supra: "PIGGY"},
            PINKBTC:
                {infra: "BTC", supra: "PINK"},
            PINKDOGE:
                {infra: "DOGE", supra: "PINK"},
            PINKLTC:
                {infra: "LTC", supra: "PINK"},
            PIRLBTC:
                {infra: "BTC", supra: "PIRL"},
            PIRLDOGE:
                {infra: "DOGE", supra: "PIRL"},
            PIRLLTC:
                {infra: "LTC", supra: "PIRL"},
            PIVXBTC:
                {infra: "BTC", supra: "PIVX"},
            PIVXDOGE:
                {infra: "DOGE", supra: "PIVX"},
            PIVXLTC:
                {infra: "LTC", supra: "PIVX"},
            PLCBTC:
                {infra: "BTC", supra: "PLC"},
            PLCDOGE:
                {infra: "DOGE", supra: "PLC"},
            PLCLTC:
                {infra: "LTC", supra: "PLC"},
            PLRBTC:
                {infra: "BTC", supra: "PLR"},
            PLRDOGE:
                {infra: "DOGE", supra: "PLR"},
            PLRLTC:
                {infra: "LTC", supra: "PLR"},
            PLXBTC:
                {infra: "BTC", supra: "PLX"},
            PLXDOGE:
                {infra: "DOGE", supra: "PLX"},
            PLXLTC:
                {infra: "LTC", supra: "PLX"},
            PNDBTC:
                {infra: "BTC", supra: "PND"},
            PNDDOGE:
                {infra: "DOGE", supra: "PND"},
            PNDLTC:
                {infra: "LTC", supra: "PND"},
            POLLBTC:
                {infra: "BTC", supra: "POLL"},
            POLLDOGE:
                {infra: "DOGE", supra: "POLL"},
            POLLLTC:
                {infra: "LTC", supra: "POLL"},
            POPBTC:
                {infra: "BTC", supra: "POP"},
            POPDOGE:
                {infra: "DOGE", supra: "POP"},
            POPLTC:
                {infra: "LTC", supra: "POP"},
            POSTBTC:
                {infra: "BTC", supra: "POST"},
            POSTDOGE:
                {infra: "DOGE", supra: "POST"},
            POSTLTC:
                {infra: "LTC", supra: "POST"},
            POSWBTC:
                {infra: "BTC", supra: "POSW"},
            POSWDOGE:
                {infra: "DOGE", supra: "POSW"},
            POSWLTC:
                {infra: "LTC", supra: "POSW"},
            POTBTC:
                {infra: "BTC", supra: "POT"},
            POTDOGE:
                {infra: "DOGE", supra: "POT"},
            POTLTC:
                {infra: "LTC", supra: "POT"},
            POWRBTC:
                {infra: "BTC", supra: "POWR"},
            POWRDOGE:
                {infra: "DOGE", supra: "POWR"},
            POWRLTC:
                {infra: "LTC", supra: "POWR"},
            PPCBTC:
                {infra: "BTC", supra: "PPC"},
            PPCDOGE:
                {infra: "DOGE", supra: "PPC"},
            PPCLTC:
                {infra: "LTC", supra: "PPC"},
            PRBTC:
                {infra: "BTC", supra: "PR"},
            PRDOGE:
                {infra: "DOGE", supra: "PR"},
            PRLBTC:
                {infra: "BTC", supra: "PRL"},
            PRLDOGE:
                {infra: "DOGE", supra: "PRL"},
            PRLLTC:
                {infra: "LTC", supra: "PRL"},
            PRLTC:
                {infra: "LTC", supra: "PR"},
            PROCBTC:
                {infra: "BTC", supra: "PROC"},
            PROCDOGE:
                {infra: "DOGE", supra: "PROC"},
            PROCLTC:
                {infra: "LTC", supra: "PROC"},
            PTCBTC:
                {infra: "BTC", supra: "PTC"},
            PTCDOGE:
                {infra: "DOGE", supra: "PTC"},
            PTCLTC:
                {infra: "LTC", supra: "PTC"},
            PURABTC:
                {infra: "BTC", supra: "PURA"},
            PURADOGE:
                {infra: "DOGE", supra: "PURA"},
            PURALTC:
                {infra: "LTC", supra: "PURA"},
            PUTBTC:
                {infra: "BTC", supra: "PUT"},
            PUTDOGE:
                {infra: "DOGE", supra: "PUT"},
            PUTLTC:
                {infra: "LTC", supra: "PUT"},
            PXCBTC:
                {infra: "BTC", supra: "PXC"},
            PXCDOGE:
                {infra: "DOGE", supra: "PXC"},
            PXCLTC:
                {infra: "LTC", supra: "PXC"},
            PXIBTC:
                {infra: "BTC", supra: "PXI"},
            PXIDOGE:
                {infra: "DOGE", supra: "PXI"},
            PXILTC:
                {infra: "LTC", supra: "PXI"},
            Q2CBTC:
                {infra: "BTC", supra: "Q2C"},
            Q2CDOGE:
                {infra: "DOGE", supra: "Q2C"},
            Q2CLTC:
                {infra: "LTC", supra: "Q2C"},
            QBTBTC:
                {infra: "BTC", supra: "QBT"},
            QBTDOGE:
                {infra: "DOGE", supra: "QBT"},
            QBTLTC:
                {infra: "LTC", supra: "QBT"},
            QRKBTC:
                {infra: "BTC", supra: "QRK"},
            QRKDOGE:
                {infra: "DOGE", supra: "QRK"},
            QRKLTC:
                {infra: "LTC", supra: "QRK"},
            QTLBTC:
                {infra: "BTC", supra: "QTL"},
            QTLDOGE:
                {infra: "DOGE", supra: "QTL"},
            QTLLTC:
                {infra: "LTC", supra: "QTL"},
            QWARKBTC:
                {infra: "BTC", supra: "QWARK"},
            QWARKDOGE:
                {infra: "DOGE", supra: "QWARK"},
            QWARKLTC:
                {infra: "LTC", supra: "QWARK"},
            RAINBTC:
                {infra: "BTC", supra: "RAIN"},
            RAINDOGE:
                {infra: "DOGE", supra: "RAIN"},
            RAINLTC:
                {infra: "LTC", supra: "RAIN"},
            RBBTBTC:
                {infra: "BTC", supra: "RBBT"},
            RBBTDOGE:
                {infra: "DOGE", supra: "RBBT"},
            RBBTLTC:
                {infra: "LTC", supra: "RBBT"},
            RBTBTC:
                {infra: "BTC", supra: "RBT"},
            RBTC:
                {infra: "BTC", supra: "R"},
            RBTDOGE:
                {infra: "DOGE", supra: "RBT"},
            RBTLTC:
                {infra: "LTC", supra: "RBT"},
            RBYBTC:
                {infra: "BTC", supra: "RBY"},
            RBYDOGE:
                {infra: "DOGE", supra: "RBY"},
            RBYLTC:
                {infra: "LTC", supra: "RBY"},
            RCBTC:
                {infra: "BTC", supra: "RC"},
            RCDOGE:
                {infra: "DOGE", supra: "RC"},
            RCLTC:
                {infra: "LTC", supra: "RC"},
            RDDBTC:
                {infra: "BTC", supra: "RDD"},
            RDDDOGE:
                {infra: "DOGE", supra: "RDD"},
            RDDLTC:
                {infra: "LTC", supra: "RDD"},
            RDOGE:
                {infra: "DOGE", supra: "R"},
            REDBTC:
                {infra: "BTC", supra: "RED"},
            REDDOGE:
                {infra: "DOGE", supra: "RED"},
            REDLTC:
                {infra: "LTC", supra: "RED"},
            REPBTC:
                {infra: "BTC", supra: "REP"},
            REPDOGE:
                {infra: "DOGE", supra: "REP"},
            REPLTC:
                {infra: "LTC", supra: "REP"},
            RICKSBTC:
                {infra: "BTC", supra: "RICKS"},
            RICKSDOGE:
                {infra: "DOGE", supra: "RICKS"},
            RICKSLTC:
                {infra: "LTC", supra: "RICKS"},
            RIYABTC:
                {infra: "BTC", supra: "RIYA"},
            RIYADOGE:
                {infra: "DOGE", supra: "RIYA"},
            RIYALTC:
                {infra: "LTC", supra: "RIYA"},
            RKCBTC:
                {infra: "BTC", supra: "RKC"},
            RKCDOGE:
                {infra: "DOGE", supra: "RKC"},
            RKCLTC:
                {infra: "LTC", supra: "RKC"},
            RLTC:
                {infra: "LTC", supra: "R"},
            RNSBTC:
                {infra: "BTC", supra: "RNS"},
            RNSDOGE:
                {infra: "DOGE", supra: "RNS"},
            RNSLTC:
                {infra: "LTC", supra: "RNS"},
            RPCBTC:
                {infra: "BTC", supra: "RPC"},
            RPCDOGE:
                {infra: "DOGE", supra: "RPC"},
            RPCLTC:
                {infra: "LTC", supra: "RPC"},
            RUPBTC:
                {infra: "BTC", supra: "RUP"},
            RUPDOGE:
                {infra: "DOGE", supra: "RUP"},
            RUPLTC:
                {infra: "LTC", supra: "RUP"},
            SAFEXBTC:
                {infra: "BTC", supra: "SAFEX"},
            SAFEXDOGE:
                {infra: "DOGE", supra: "SAFEX"},
            SAFEXLTC:
                {infra: "LTC", supra: "SAFEX"},
            SAGABTC:
                {infra: "BTC", supra: "SAGA"},
            SAGADOGE:
                {infra: "DOGE", supra: "SAGA"},
            SAGALTC:
                {infra: "LTC", supra: "SAGA"},
            SAKBTC:
                {infra: "BTC", supra: "SAK"},
            SAKDOGE:
                {infra: "DOGE", supra: "SAK"},
            SAKLTC:
                {infra: "LTC", supra: "SAK"},
            SANDBTC:
                {infra: "BTC", supra: "SAND"},
            SANDDOGE:
                {infra: "DOGE", supra: "SAND"},
            SANDLTC:
                {infra: "LTC", supra: "SAND"},
            SBCBTC:
                {infra: "BTC", supra: "SBC"},
            SBCDOGE:
                {infra: "DOGE", supra: "SBC"},
            SBCLTC:
                {infra: "LTC", supra: "SBC"},
            SCLBTC:
                {infra: "BTC", supra: "SCL"},
            SCLDOGE:
                {infra: "DOGE", supra: "SCL"},
            SCLLTC:
                {infra: "LTC", supra: "SCL"},
            SCTBTC:
                {infra: "BTC", supra: "SCT"},
            SDRNBTC:
                {infra: "BTC", supra: "SDRN"},
            SDRNDOGE:
                {infra: "DOGE", supra: "SDRN"},
            SDRNLTC:
                {infra: "LTC", supra: "SDRN"},
            SELBTC:
                {infra: "BTC", supra: "SEL"},
            SELDOGE:
                {infra: "DOGE", supra: "SEL"},
            SELLTC:
                {infra: "LTC", supra: "SEL"},
            SENDBTC:
                {infra: "BTC", supra: "SEND"},
            SENDDOGE:
                {infra: "DOGE", supra: "SEND"},
            SENDLTC:
                {infra: "LTC", supra: "SEND"},
            SFCBTC:
                {infra: "BTC", supra: "SFC"},
            SFCDOGE:
                {infra: "DOGE", supra: "SFC"},
            SFCLTC:
                {infra: "LTC", supra: "SFC"},
            SHABTC:
                {infra: "BTC", supra: "SHA"},
            SHADOGE:
                {infra: "DOGE", supra: "SHA"},
            SHALTC:
                {infra: "LTC", supra: "SHA"},
            SHRMBTC:
                {infra: "BTC", supra: "SHRM"},
            SHRMDOGE:
                {infra: "DOGE", supra: "SHRM"},
            SHRMLTC:
                {infra: "LTC", supra: "SHRM"},
            SIBBTC:
                {infra: "BTC", supra: "SIB"},
            SIBDOGE:
                {infra: "DOGE", supra: "SIB"},
            SIBLTC:
                {infra: "LTC", supra: "SIB"},
            SJWBTC:
                {infra: "BTC", supra: "SJW"},
            SJWDOGE:
                {infra: "DOGE", supra: "SJW"},
            SJWLTC:
                {infra: "LTC", supra: "SJW"},
            SKCBTC:
                {infra: "BTC", supra: "SKC"},
            SKCDOGE:
                {infra: "DOGE", supra: "SKC"},
            SKCLTC:
                {infra: "LTC", supra: "SKC"},
            SKINBTC:
                {infra: "BTC", supra: "SKIN"},
            SKINDOGE:
                {infra: "DOGE", supra: "SKIN"},
            SKINLTC:
                {infra: "LTC", supra: "SKIN"},
            SKRBTC:
                {infra: "BTC", supra: "SKR"},
            SKRDOGE:
                {infra: "DOGE", supra: "SKR"},
            SKRLTC:
                {infra: "LTC", supra: "SKR"},
            SKYBTC:
                {infra: "BTC", supra: "SKY"},
            SKYDOGE:
                {infra: "DOGE", supra: "SKY"},
            SKYLTC:
                {infra: "LTC", supra: "SKY"},
            SKYNZDT:
                {infra: "NZDT", supra: "SKY"},
            SKYUSDT:
                {infra: "USD", supra: "SKY"},
            SLGBTC:
                {infra: "BTC", supra: "SLG"},
            SLGDOGE:
                {infra: "DOGE", supra: "SLG"},
            SLGLTC:
                {infra: "LTC", supra: "SLG"},
            SLOTHBTC:
                {infra: "BTC", supra: "SLOTH"},
            SLOTHDOGE:
                {infra: "DOGE", supra: "SLOTH"},
            SLOTHLTC:
                {infra: "LTC", supra: "SLOTH"},
            SMARTBTC:
                {infra: "BTC", supra: "SMART"},
            SMARTDOGE:
                {infra: "DOGE", supra: "SMART"},
            SMARTLTC:
                {infra: "LTC", supra: "SMART"},
            SMCBTC:
                {infra: "BTC", supra: "SMC"},
            SMCDOGE:
                {infra: "DOGE", supra: "SMC"},
            SMCLTC:
                {infra: "LTC", supra: "SMC"},
            SOILBTC:
                {infra: "BTC", supra: "SOIL"},
            SOILDOGE:
                {infra: "DOGE", supra: "SOIL"},
            SOILLTC:
                {infra: "LTC", supra: "SOIL"},
            SONGBTC:
                {infra: "BTC", supra: "SONG"},
            SONGDOGE:
                {infra: "DOGE", supra: "SONG"},
            SONGLTC:
                {infra: "LTC", supra: "SONG"},
            SOONBTC:
                {infra: "BTC", supra: "SOON"},
            SOONDOGE:
                {infra: "DOGE", supra: "SOON"},
            SOONLTC:
                {infra: "LTC", supra: "SOON"},
            SPACEBTC:
                {infra: "BTC", supra: "SPACE"},
            SPACEDOGE:
                {infra: "DOGE", supra: "SPACE"},
            SPACELTC:
                {infra: "LTC", supra: "SPACE"},
            SPANKBTC:
                {infra: "BTC", supra: "SPANK"},
            SPANKDOGE:
                {infra: "DOGE", supra: "SPANK"},
            SPANKLTC:
                {infra: "LTC", supra: "SPANK"},
            SPNBTC:
                {infra: "BTC", supra: "SPN"},
            SPNDOGE:
                {infra: "DOGE", supra: "SPN"},
            SPNLTC:
                {infra: "LTC", supra: "SPN"},
            SPRBTC:
                {infra: "BTC", supra: "SPR"},
            SPRDOGE:
                {infra: "DOGE", supra: "SPR"},
            SPRLTC:
                {infra: "LTC", supra: "SPR"},
            SPTBTC:
                {infra: "BTC", supra: "SPT"},
            SPTDOGE:
                {infra: "DOGE", supra: "SPT"},
            SPTLTC:
                {infra: "LTC", supra: "SPT"},
            SQLBTC:
                {infra: "BTC", supra: "SQL"},
            SQLDOGE:
                {infra: "DOGE", supra: "SQL"},
            SQLLTC:
                {infra: "LTC", supra: "SQL"},
            SRCBTC:
                {infra: "BTC", supra: "SRC"},
            SRCDOGE:
                {infra: "DOGE", supra: "SRC"},
            SRCLTC:
                {infra: "LTC", supra: "SRC"},
            STARTBTC:
                {infra: "BTC", supra: "START"},
            STARTDOGE:
                {infra: "DOGE", supra: "START"},
            STARTLTC:
                {infra: "LTC", supra: "START"},
            STCBTC:
                {infra: "BTC", supra: "STC"},
            STCDOGE:
                {infra: "DOGE", supra: "STC"},
            STCLTC:
                {infra: "LTC", supra: "STC"},
            STNBTC:
                {infra: "BTC", supra: "STN"},
            STNDOGE:
                {infra: "DOGE", supra: "STN"},
            STNLTC:
                {infra: "LTC", supra: "STN"},
            STRATBTC:
                {infra: "BTC", supra: "STRAT"},
            STRATDOGE:
                {infra: "DOGE", supra: "STRAT"},
            STRATLTC:
                {infra: "LTC", supra: "STRAT"},
            STRCBTC:
                {infra: "BTC", supra: "STRC"},
            STRCDOGE:
                {infra: "DOGE", supra: "STRC"},
            STRCLTC:
                {infra: "LTC", supra: "STRC"},
            STVBTC:
                {infra: "BTC", supra: "STV"},
            STVDOGE:
                {infra: "DOGE", supra: "STV"},
            STVLTC:
                {infra: "LTC", supra: "STV"},
            SUMOBTC:
                {infra: "BTC", supra: "SUMO"},
            SUMODOGE:
                {infra: "DOGE", supra: "SUMO"},
            SUMOLTC:
                {infra: "LTC", supra: "SUMO"},
            SWINGBTC:
                {infra: "BTC", supra: "SWING"},
            SWINGDOGE:
                {infra: "DOGE", supra: "SWING"},
            SWINGLTC:
                {infra: "LTC", supra: "SWING"},
            SXCBTC:
                {infra: "BTC", supra: "SXC"},
            SXCDOGE:
                {infra: "DOGE", supra: "SXC"},
            SXCLTC:
                {infra: "LTC", supra: "SXC"},
            SYNXBTC:
                {infra: "BTC", supra: "SYNX"},
            SYNXDOGE:
                {infra: "DOGE", supra: "SYNX"},
            SYNXLTC:
                {infra: "LTC", supra: "SYNX"},
            TAJBTC:
                {infra: "BTC", supra: "TAJ"},
            TAJDOGE:
                {infra: "DOGE", supra: "TAJ"},
            TAJLTC:
                {infra: "LTC", supra: "TAJ"},
            TEKBTC:
                {infra: "BTC", supra: "TEK"},
            TEKDOGE:
                {infra: "DOGE", supra: "TEK"},
            TEKLTC:
                {infra: "LTC", supra: "TEK"},
            TERBTC:
                {infra: "BTC", supra: "TER"},
            TERDOGE:
                {infra: "DOGE", supra: "TER"},
            TERLTC:
                {infra: "LTC", supra: "TER"},
            TESBTC:
                {infra: "BTC", supra: "TES"},
            TESDOGE:
                {infra: "DOGE", supra: "TES"},
            TESLTC:
                {infra: "LTC", supra: "TES"},
            TGCBTC:
                {infra: "BTC", supra: "TGC"},
            TGCDOGE:
                {infra: "DOGE", supra: "TGC"},
            TGCLTC:
                {infra: "LTC", supra: "TGC"},
            TITBTC:
                {infra: "BTC", supra: "TIT"},
            TITDOGE:
                {infra: "DOGE", supra: "TIT"},
            TITLTC:
                {infra: "LTC", supra: "TIT"},
            TIXBTC:
                {infra: "BTC", supra: "TIX"},
            TIXDOGE:
                {infra: "DOGE", supra: "TIX"},
            TIXLTC:
                {infra: "LTC", supra: "TIX"},
            TOABTC:
                {infra: "BTC", supra: "TOA"},
            TOADOGE:
                {infra: "DOGE", supra: "TOA"},
            TOALTC:
                {infra: "LTC", supra: "TOA"},
            TOKBTC:
                {infra: "BTC", supra: "TOK"},
            TOKDOGE:
                {infra: "DOGE", supra: "TOK"},
            TOKLTC:
                {infra: "LTC", supra: "TOK"},
            TOPBTC:
                {infra: "BTC", supra: "TOP"},
            TOPDOGE:
                {infra: "DOGE", supra: "TOP"},
            TOPLTC:
                {infra: "LTC", supra: "TOP"},
            TRBOBTC:
                {infra: "BTC", supra: "TRBO"},
            TRCBTC:
                {infra: "BTC", supra: "TRC"},
            TRCDOGE:
                {infra: "DOGE", supra: "TRC"},
            TRCLTC:
                {infra: "LTC", supra: "TRC"},
            TRIBTC:
                {infra: "BTC", supra: "TRI"},
            TRIDOGE:
                {infra: "DOGE", supra: "TRI"},
            TRILTC:
                {infra: "LTC", supra: "TRI"},
            TRKBTC:
                {infra: "BTC", supra: "TRK"},
            TRKDOGE:
                {infra: "DOGE", supra: "TRK"},
            TRKLTC:
                {infra: "LTC", supra: "TRK"},
            TRUMPBTC:
                {infra: "BTC", supra: "TRUMP"},
            TRUMPDOGE:
                {infra: "DOGE", supra: "TRUMP"},
            TRUMPLTC:
                {infra: "LTC", supra: "TRUMP"},
            TRXBTC:
                {infra: "BTC", supra: "TRX"},
            TSEBTC:
                {infra: "BTC", supra: "TSE"},
            TSEDOGE:
                {infra: "DOGE", supra: "TSE"},
            TSELTC:
                {infra: "LTC", supra: "TSE"},
            TTCBTC:
                {infra: "BTC", supra: "TTC"},
            TTCDOGE:
                {infra: "DOGE", supra: "TTC"},
            TTCLTC:
                {infra: "LTC", supra: "TTC"},
            TTYBTC:
                {infra: "BTC", supra: "TTY"},
            TTYDOGE:
                {infra: "DOGE", supra: "TTY"},
            TTYLTC:
                {infra: "LTC", supra: "TTY"},
            TXBTC:
                {infra: "BTC", supra: "TX"},
            TXDOGE:
                {infra: "DOGE", supra: "TX"},
            TXLTC:
                {infra: "LTC", supra: "TX"},
            TZCBTC:
                {infra: "BTC", supra: "TZC"},
            TZCDOGE:
                {infra: "DOGE", supra: "TZC"},
            TZCLTC:
                {infra: "LTC", supra: "TZC"},
            UBQBTC:
                {infra: "BTC", supra: "UBQ"},
            UBQDOGE:
                {infra: "DOGE", supra: "UBQ"},
            UBQLTC:
                {infra: "LTC", supra: "UBQ"},
            UFRBTC:
                {infra: "BTC", supra: "UFR"},
            UFRDOGE:
                {infra: "DOGE", supra: "UFR"},
            UFRLTC:
                {infra: "LTC", supra: "UFR"},
            UISBTC:
                {infra: "BTC", supra: "UIS"},
            UISDOGE:
                {infra: "DOGE", supra: "UIS"},
            UISLTC:
                {infra: "LTC", supra: "UIS"},
            UMOBTC:
                {infra: "BTC", supra: "UMO"},
            UMODOGE:
                {infra: "DOGE", supra: "UMO"},
            UMOLTC:
                {infra: "LTC", supra: "UMO"},
            UNICBTC:
                {infra: "BTC", supra: "UNIC"},
            UNICDOGE:
                {infra: "DOGE", supra: "UNIC"},
            UNICLTC:
                {infra: "LTC", supra: "UNIC"},
            UNIFYBTC:
                {infra: "BTC", supra: "UNIFY"},
            UNIFYDOGE:
                {infra: "DOGE", supra: "UNIFY"},
            UNIFYLTC:
                {infra: "LTC", supra: "UNIFY"},
            UNITBTC:
                {infra: "BTC", supra: "UNIT"},
            UNITDOGE:
                {infra: "DOGE", supra: "UNIT"},
            UNITLTC:
                {infra: "LTC", supra: "UNIT"},
            UNITSBTC:
                {infra: "BTC", supra: "UNITS"},
            UNITSDOGE:
                {infra: "DOGE", supra: "UNITS"},
            UNITSLTC:
                {infra: "LTC", supra: "UNITS"},
            UNOBTC:
                {infra: "BTC", supra: "UNO"},
            UNODOGE:
                {infra: "DOGE", supra: "UNO"},
            UNOLTC:
                {infra: "LTC", supra: "UNO"},
            UNOUSDT:
                {infra: "USD", supra: "UNO"},
            URBTC:
                {infra: "BTC", supra: "UR"},
            URDOGE:
                {infra: "DOGE", supra: "UR"},
            URLTC:
                {infra: "LTC", supra: "UR"},
            UTCBTC:
                {infra: "BTC", supra: "UTC"},
            UTCDOGE:
                {infra: "DOGE", supra: "UTC"},
            UTCLTC:
                {infra: "LTC", supra: "UTC"},
            VBTC:
                {infra: "BTC", supra: "V"},
            VCCBTC:
                {infra: "BTC", supra: "VCC"},
            VCCDOGE:
                {infra: "DOGE", supra: "VCC"},
            VCCLTC:
                {infra: "LTC", supra: "VCC"},
            VDOGE:
                {infra: "DOGE", supra: "V"},
            VIDZBTC:
                {infra: "BTC", supra: "VIDZ"},
            VIDZDOGE:
                {infra: "DOGE", supra: "VIDZ"},
            VIDZLTC:
                {infra: "LTC", supra: "VIDZ"},
            VIVOBTC:
                {infra: "BTC", supra: "VIVO"},
            VIVODOGE:
                {infra: "DOGE", supra: "VIVO"},
            VIVOLTC:
                {infra: "LTC", supra: "VIVO"},
            VLTC:
                {infra: "LTC", supra: "V"},
            VOISEBTC:
                {infra: "BTC", supra: "VOISE"},
            VOISEDOGE:
                {infra: "DOGE", supra: "VOISE"},
            VOISELTC:
                {infra: "LTC", supra: "VOISE"},
            VPRCBTC:
                {infra: "BTC", supra: "VPRC"},
            VPRCDOGE:
                {infra: "DOGE", supra: "VPRC"},
            VPRCLTC:
                {infra: "LTC", supra: "VPRC"},
            VRCBTC:
                {infra: "BTC", supra: "VRC"},
            VRCDOGE:
                {infra: "DOGE", supra: "VRC"},
            VRCLTC:
                {infra: "LTC", supra: "VRC"},
            VRMBTC:
                {infra: "BTC", supra: "VRM"},
            VRMDOGE:
                {infra: "DOGE", supra: "VRM"},
            VRMLTC:
                {infra: "LTC", supra: "VRM"},
            VUCBTC:
                {infra: "BTC", supra: "VUC"},
            VUCDOGE:
                {infra: "DOGE", supra: "VUC"},
            VUCLTC:
                {infra: "LTC", supra: "VUC"},
            WCBTC:
                {infra: "BTC", supra: "WC"},
            WCDOGE:
                {infra: "DOGE", supra: "WC"},
            WCLTC:
                {infra: "LTC", supra: "WC"},
            WColdBTC:
                {infra: "BTC", supra: "WC_old"},
            WColdDOGE:
                {infra: "DOGE", supra: "WC_old"},
            WColdLTC:
                {infra: "LTC", supra: "WC_old"},
            WDCBTC:
                {infra: "BTC", supra: "WDC"},
            WDCDOGE:
                {infra: "DOGE", supra: "WDC"},
            WDCLTC:
                {infra: "LTC", supra: "WDC"},
            WEEDBTC:
                {infra: "BTC", supra: "WEED"},
            WEEDDOGE:
                {infra: "DOGE", supra: "WEED"},
            WEEDLTC:
                {infra: "LTC", supra: "WEED"},
            WILDBTC:
                {infra: "BTC", supra: "WILD"},
            WILDDOGE:
                {infra: "DOGE", supra: "WILD"},
            WILDLTC:
                {infra: "LTC", supra: "WILD"},
            WISHBTC:
                {infra: "BTC", supra: "WISH"},
            WISHDOGE:
                {infra: "DOGE", supra: "WISH"},
            WISHLTC:
                {infra: "LTC", supra: "WISH"},
            WLCBTC:
                {infra: "BTC", supra: "WLC"},
            WLCDOGE:
                {infra: "DOGE", supra: "WLC"},
            WLCLTC:
                {infra: "LTC", supra: "WLC"},
            WRCBTC:
                {infra: "BTC", supra: "WRC"},
            WRCDOGE:
                {infra: "DOGE", supra: "WRC"},
            WRCLTC:
                {infra: "LTC", supra: "WRC"},
            WSXBTC:
                {infra: "BTC", supra: "WSX"},
            WSXDOGE:
                {infra: "DOGE", supra: "WSX"},
            WSXLTC:
                {infra: "LTC", supra: "WSX"},
            WWBTC:
                {infra: "BTC", supra: "WW"},
            WWDOGE:
                {infra: "DOGE", supra: "WW"},
            WWLTC:
                {infra: "LTC", supra: "WW"},
            XBCBTC:
                {infra: "BTC", supra: "XBC"},
            XBCDOGE:
                {infra: "DOGE", supra: "XBC"},
            XBCLTC:
                {infra: "LTC", supra: "XBC"},
            XBLBTC:
                {infra: "BTC", supra: "XBL"},
            XBLDOGE:
                {infra: "DOGE", supra: "XBL"},
            XBLLTC:
                {infra: "LTC", supra: "XBL"},
            XBTSBTC:
                {infra: "BTC", supra: "XBTS"},
            XBTSDOGE:
                {infra: "DOGE", supra: "XBTS"},
            XBTSLTC:
                {infra: "LTC", supra: "XBTS"},
            XBYBTC:
                {infra: "BTC", supra: "XBY"},
            XBYDOGE:
                {infra: "DOGE", supra: "XBY"},
            XBYLTC:
                {infra: "LTC", supra: "XBY"},
            XCOBTC:
                {infra: "BTC", supra: "XCO"},
            XCODOGE:
                {infra: "DOGE", supra: "XCO"},
            XCOLTC:
                {infra: "LTC", supra: "XCO"},
            XCPOBTC:
                {infra: "BTC", supra: "XCPO"},
            XCPODOGE:
                {infra: "DOGE", supra: "XCPO"},
            XCPOLTC:
                {infra: "LTC", supra: "XCPO"},
            XCREBTC:
                {infra: "BTC", supra: "XCRE"},
            XCREDOGE:
                {infra: "DOGE", supra: "XCRE"},
            XCRELTC:
                {infra: "LTC", supra: "XCRE"},
            XCTBTC:
                {infra: "BTC", supra: "XCT"},
            XCTDOGE:
                {infra: "DOGE", supra: "XCT"},
            XCTLTC:
                {infra: "LTC", supra: "XCT"},
            XCXTBTC:
                {infra: "BTC", supra: "XCXT"},
            XCXTDOGE:
                {infra: "DOGE", supra: "XCXT"},
            XCXTLTC:
                {infra: "LTC", supra: "XCXT"},
            XEMBTC:
                {infra: "BTC", supra: "XEM"},
            XEMDOGE:
                {infra: "DOGE", supra: "XEM"},
            XEMLTC:
                {infra: "LTC", supra: "XEM"},
            XFTBTC:
                {infra: "BTC", supra: "XFT"},
            XFTDOGE:
                {infra: "DOGE", supra: "XFT"},
            XFTLTC:
                {infra: "LTC", supra: "XFT"},
            XGOXBTC:
                {infra: "BTC", supra: "XGOX"},
            XGOXDOGE:
                {infra: "DOGE", supra: "XGOX"},
            XGOXLTC:
                {infra: "LTC", supra: "XGOX"},
            XGRBTC:
                {infra: "BTC", supra: "XGR"},
            XGRDOGE:
                {infra: "DOGE", supra: "XGR"},
            XGRLTC:
                {infra: "LTC", supra: "XGR"},
            XIDBTC:
                {infra: "BTC", supra: "XID"},
            XIDDOGE:
                {infra: "DOGE", supra: "XID"},
            XIDLTC:
                {infra: "LTC", supra: "XID"},
            XJOBTC:
                {infra: "BTC", supra: "XJO"},
            XJODOGE:
                {infra: "DOGE", supra: "XJO"},
            XJOLTC:
                {infra: "LTC", supra: "XJO"},
            XLCBTC:
                {infra: "BTC", supra: "XLC"},
            XLCDOGE:
                {infra: "DOGE", supra: "XLC"},
            XLCLTC:
                {infra: "LTC", supra: "XLC"},
            XMCCBTC:
                {infra: "BTC", supra: "XMCC"},
            XMCCDOGE:
                {infra: "DOGE", supra: "XMCC"},
            XMCCLTC:
                {infra: "LTC", supra: "XMCC"},
            XMGBTC:
                {infra: "BTC", supra: "XMG"},
            XMGDOGE:
                {infra: "DOGE", supra: "XMG"},
            XMGLTC:
                {infra: "LTC", supra: "XMG"},
            XMRBTC:
                {infra: "BTC", supra: "XMR"},
            XMRDOGE:
                {infra: "DOGE", supra: "XMR"},
            XMRLTC:
                {infra: "LTC", supra: "XMR"},
            XMRNZDT:
                {infra: "NZDT", supra: "XMR"},
            XMRUSDT:
                {infra: "USD", supra: "XMR"},
            XMYBTC:
                {infra: "BTC", supra: "XMY"},
            XMYDOGE:
                {infra: "DOGE", supra: "XMY"},
            XMYLTC:
                {infra: "LTC", supra: "XMY"},
            XPDBTC:
                {infra: "BTC", supra: "XPD"},
            XPDDOGE:
                {infra: "DOGE", supra: "XPD"},
            XPDLTC:
                {infra: "LTC", supra: "XPD"},
            XPMBTC:
                {infra: "BTC", supra: "XPM"},
            XPMDOGE:
                {infra: "DOGE", supra: "XPM"},
            XPMLTC:
                {infra: "LTC", supra: "XPM"},
            XPTXBTC:
                {infra: "BTC", supra: "XPTX"},
            XPTXDOGE:
                {infra: "DOGE", supra: "XPTX"},
            XPTXLTC:
                {infra: "LTC", supra: "XPTX"},
            XRABTC:
                {infra: "BTC", supra: "XRA"},
            XRADOGE:
                {infra: "DOGE", supra: "XRA"},
            XRALTC:
                {infra: "LTC", supra: "XRA"},
            XREBTC:
                {infra: "BTC", supra: "XRE"},
            XREDOGE:
                {infra: "DOGE", supra: "XRE"},
            XRELTC:
                {infra: "LTC", supra: "XRE"},
            XRYBTC:
                {infra: "BTC", supra: "XRY"},
            XRYDOGE:
                {infra: "DOGE", supra: "XRY"},
            XRYLTC:
                {infra: "LTC", supra: "XRY"},
            XSPECBTC:
                {infra: "BTC", supra: "XSPEC"},
            XSPECDOGE:
                {infra: "DOGE", supra: "XSPEC"},
            XSPECLTC:
                {infra: "LTC", supra: "XSPEC"},
            XSTBTC:
                {infra: "BTC", supra: "XST"},
            XSTDOGE:
                {infra: "DOGE", supra: "XST"},
            XSTLTC:
                {infra: "LTC", supra: "XST"},
            XVGBTC:
                {infra: "BTC", supra: "XVG"},
            XVGDOGE:
                {infra: "DOGE", supra: "XVG"},
            XVGLTC:
                {infra: "LTC", supra: "XVG"},
            XVGNZDT:
                {infra: "NZDT", supra: "XVG"},
            XVGUSDT:
                {infra: "USD", supra: "XVG"},
            XZCBTC:
                {infra: "BTC", supra: "XZC"},
            XZCDOGE:
                {infra: "DOGE", supra: "XZC"},
            XZCLTC:
                {infra: "LTC", supra: "XZC"},
            YOVIBTC:
                {infra: "BTC", supra: "YOVI"},
            YOVIDOGE:
                {infra: "DOGE", supra: "YOVI"},
            YOVILTC:
                {infra: "LTC", supra: "YOVI"},
            ZAPBTC:
                {infra: "BTC", supra: "ZAP"},
            ZAPDOGE:
                {infra: "DOGE", supra: "ZAP"},
            ZAPLTC:
                {infra: "LTC", supra: "ZAP"},
            ZCLBTC:
                {infra: "BTC", supra: "ZCL"},
            ZCLDOGE:
                {infra: "DOGE", supra: "ZCL"},
            ZCLLTC:
                {infra: "LTC", supra: "ZCL"},
            ZECBTC:
                {infra: "BTC", supra: "ZEC"},
            ZECDOGE:
                {infra: "DOGE", supra: "ZEC"},
            ZECLTC:
                {infra: "LTC", supra: "ZEC"},
            ZECNZDT:
                {infra: "NZDT", supra: "ZEC"},
            ZECUSDT:
                {infra: "USD", supra: "ZEC"},
            ZEITBTC:
                {infra: "BTC", supra: "ZEIT"},
            ZEITDOGE:
                {infra: "DOGE", supra: "ZEIT"},
            ZEITLTC:
                {infra: "LTC", supra: "ZEIT"},
            ZENBTC:
                {infra: "BTC", supra: "ZEN"},
            ZENDOGE:
                {infra: "DOGE", supra: "ZEN"},
            ZENLTC:
                {infra: "LTC", supra: "ZEN"},
            ZERBTC:
                {infra: "BTC", supra: "ZER"},
            ZERDOGE:
                {infra: "DOGE", supra: "ZER"},
            ZERLTC:
                {infra: "LTC", supra: "ZER"},
            ZETBTC:
                {infra: "BTC", supra: "ZET"},
            ZETDOGE:
                {infra: "DOGE", supra: "ZET"},
            ZETLTC:
                {infra: "LTC", supra: "ZET"},
            ZOIBTC:
                {infra: "BTC", supra: "ZOI"},
            ZOIDOGE:
                {infra: "DOGE", supra: "ZOI"},
            ZOILTC:
                {infra: "LTC", supra: "ZOI"},
            ZSEBTC:
                {infra: "BTC", supra: "ZSE"},
            ZSEDOGE:
                {infra: "DOGE", supra: "ZSE"},
            ZSELTC:
                {infra: "LTC", supra: "ZSE"},
        }

        ,
        kucoin: {

            ACTBCH:
                {infra: "BCH", supra: "ACT"},
            ACTBTC:
                {infra: "BTC", supra: "ACT"},
            ACTETH:
                {infra: "ETH", supra: "ACT"},
            ACATBTC:
                {infra: "BTC", supra: "ACAT"},
            ACATNEO:
                {infra: "NEO", supra: "ACAT"},
            ACATETH:
                {infra: "ETH", supra: "ACAT"},
            ADBBTC:
                {infra: "BTC", supra: "ADB"},
            ADBETH:
                {infra: "ETH", supra: "ADB"},
            AGIBTC:
                {infra: "BTC", supra: "AGI"},
            AGIETH:
                {infra: "ETH", supra: "AGI"},
            AIONBTC:
                {infra: "BTC", supra: "AION"},
            AIONETH:
                {infra: "ETH", supra: "AION"},
            AIXBTC:
                {infra: "BTC", supra: "AIX"},
            AIXETH:
                {infra: "ETH", supra: "AIX"},
            AMBBTC:
                {infra: "BTC", supra: "AMB"},
            AMBETH:
                {infra: "ETH", supra: "AMB"},
            ARYBTC:
                {infra: "BTC", supra: "ARY"},
            ARYETH:
                {infra: "ETH", supra: "ARY"},
            BCDBTC:
                {infra: "BTC", supra: "BCD"},
            BCDETH:
                {infra: "ETH", supra: "BCD"},
            BCHBTC:
                {infra: "BTC", supra: "BCH"},
            BCHETH:
                {infra: "ETH", supra: "BCH"},
            BCHKCS:
                {infra: "KCS", supra: "BCH"},
            BCHNEO:
                {infra: "NEO", supra: "BCH"},
            BCHUSDT:
                {infra: "USD", supra: "BCH"},
            BCPTBTC:
                {infra: "BTC", supra: "BCPT"},
            BCPTETH:
                {infra: "ETH", supra: "BCPT"},
            BHCBTC:
                {infra: "BTC", supra: "BHC"},
            BNTYBTC:
                {infra: "BTC", supra: "BNTY"},
            BNTYETH:
                {infra: "ETH", supra: "BNTY"},
            BOSBTC:
                {infra: "BTC", supra: "BOS"},
            BOSETH:
                {infra: "ETH", supra: "BOS"},
            BTCUSDT:
                {infra: "USD", supra: "BTC"},
            BTGBTC:
                {infra: "BTC", supra: "BTG"},
            BTGETH:
                {infra: "ETH", supra: "BTG"},
            BTMBTC:
                {infra: "BTC", supra: "BTM"},
            BTMETH:
                {infra: "ETH", supra: "BTM"},
            CAGBTC:
                {infra: "BTC", supra: "CAG"},
            CAGETH:
                {infra: "ETH", supra: "CAG"},
            CAGKCS:
                {infra: "KCS", supra: "CAG"},
            CANBTC:
                {infra: "BTC", supra: "CAN"},
            CANETH:
                {infra: "ETH", supra: "CAN"},
            CATBTC:
                {infra: "BTC", supra: "CAT"},
            CATETH:
                {infra: "ETH", supra: "CAT"},
            CFDETH:
                {infra: "ETH", supra: "CFD"},
            COFIBTC:
                {infra: "BTC", supra: "COFI"},
            COFIETH:
                {infra: "ETH", supra: "COFI"},
            CVBTC:
                {infra: "BTC", supra: "CV"},
            CVCBTC:
                {infra: "BTC", supra: "CVC"},
            CVCETH:
                {infra: "ETH", supra: "CVC"},
            CVETH:
                {infra: "ETH", supra: "CV"},
            CXOBTC:
                {infra: "BTC", supra: "CXO"},
            CXOETH:
                {infra: "ETH", supra: "CXO"},
            DASHBTC:
                {infra: "BTC", supra: "DASH"},
            DASHETH:
                {infra: "ETH", supra: "DASH"},
            DASHKCS:
                {infra: "KCS", supra: "DASH"},
            DATBCH:
                {infra: "BCH", supra: "DAT"},
            DATBTC:
                {infra: "BTC", supra: "DAT"},
            DATETH:
                {infra: "ETH", supra: "DAT"},
            DBCBTC:
                {infra: "BTC", supra: "DBC"},
            DBCETH:
                {infra: "ETH", supra: "DBC"},
            DBCNEO:
                {infra: "NEO", supra: "DBC"},
            DBCUSDT:
                {infra: "USD", supra: "DBC"},
            DENTBCH:
                {infra: "BCH", supra: "DENT"},
            DENTBTC:
                {infra: "BTC", supra: "DENT"},
            DENTETH:
                {infra: "ETH", supra: "DENT"},
            DENTNEO:
                {infra: "NEO", supra: "DENT"},
            DGBBTC:
                {infra: "BTC", supra: "DGB"},
            DGBETH:
                {infra: "ETH", supra: "DGB"},
            DNABTC:
                {infra: "BTC", supra: "DNA"},
            DNAETH:
                {infra: "ETH", supra: "DNA"},
            DRGNBTC:
                {infra: "BTC", supra: "DRGN"},
            DRGNETH:
                {infra: "ETH", supra: "DRGN"},
            DRGNNEO:
                {infra: "NEO", supra: "DRGN"},
            DRGNUSDT:
                {infra: "USD", supra: "DRGN"},
            EBTCBTC:
                {infra: "BTC", supra: "EBTC"},
            EBTCETH:
                {infra: "ETH", supra: "EBTC"},
            ELIXBTC:
                {infra: "BTC", supra: "ELIX"},
            ELIXETH:
                {infra: "ETH", supra: "ELIX"},
            ENJBTC:
                {infra: "BTC", supra: "ENJ"},
            ENJETH:
                {infra: "ETH", supra: "ENJ"},
            EOSBTC:
                {infra: "BTC", supra: "EOS"},
            EOSETH:
                {infra: "ETH", supra: "EOS"},
            EOSNEO:
                {infra: "NEO", supra: "EOS"},
            ETCBTC:
                {infra: "BTC", supra: "ETC"},
            ETCETH:
                {infra: "ETH", supra: "ETC"},
            ETCKCS:
                {infra: "KCS", supra: "ETC"},
            ETCUSDT:
                {infra: "USD", supra: "ETC"},
            ETHBTC:
                {infra: "BTC", supra: "ETH"},
            ETHUSDT:
                {infra: "USD", supra: "ETH"},
            EVXBTC:
                {infra: "BTC", supra: "EVX"},
            EVXETH:
                {infra: "ETH", supra: "EVX"},
            FLIXXBTC:
                {infra: "BTC", supra: "FLIXX"},
            FLIXXETH:
                {infra: "ETH", supra: "FLIXX"},
            FOTABCH:
                {infra: "BCH", supra: "FOTA"},
            FOTABTC:
                {infra: "BTC", supra: "FOTA"},
            FOTAETH:
                {infra: "ETH", supra: "FOTA"},
            FOTANEO:
                {infra: "NEO", supra: "FOTA"},
            FOTAUSDT:
                {infra: "USD", supra: "FOTA"},
            GASBTC:
                {infra: "BTC", supra: "GAS"},
            GASKCS:
                {infra: "KCS", supra: "GAS"},
            GASNEO:
                {infra: "NEO", supra: "GAS"},
            GVTBTC:
                {infra: "BTC", supra: "GVT"},
            GVTETH:
                {infra: "ETH", supra: "GVT"},
            HATBTC:
                {infra: "BTC", supra: "HAT"},
            HATETH:
                {infra: "ETH", supra: "HAT"},
            HPBBTC:
                {infra: "BTC", supra: "HPB"},
            HPBETH:
                {infra: "ETH", supra: "HPB"},
            HSRBTC:
                {infra: "BTC", supra: "HSR"},
            HSRETH:
                {infra: "ETH", supra: "HSR"},
            HSTBTC:
                {infra: "BTC", supra: "HST"},
            HSTETH:
                {infra: "ETH", supra: "HST"},
            INGBTC:
                {infra: "BTC", supra: "ING"},
            INGETH:
                {infra: "ETH", supra: "ING"},
            INSBTC:
                {infra: "BTC", supra: "INS"},
            INSETH:
                {infra: "ETH", supra: "INS"},
            IOSTBTC:
                {infra: "BTC", supra: "IOST"},
            IOSTETH:
                {infra: "ETH", supra: "IOST"},
            KCSBCH:
                {infra: "BCH", supra: "KCS"},
            KCSBTC:
                {infra: "BTC", supra: "KCS"},
            KCSETH:
                {infra: "ETH", supra: "KCS"},
            KCSUSDT:
                {infra: "USD", supra: "KCS"},
            KEYBTC:
                {infra: "BTC", supra: "KEY"},
            KEYETH:
                {infra: "ETH", supra: "KEY"},
            KNCBTC:
                {infra: "BTC", supra: "KNC"},
            KNCETH:
                {infra: "ETH", supra: "KNC"},
            LABTC:
                {infra: "BTC", supra: "LA"},
            LAETH:
                {infra: "ETH", supra: "LA"},
            LENDBTC:
                {infra: "BTC", supra: "LEND"},
            LENDETH:
                {infra: "ETH", supra: "LEND"},
            LTCBTC:
                {infra: "BTC", supra: "LTC"},
            LTCETH:
                {infra: "ETH", supra: "LTC"},
            LTCNEO: {infra: "NEO", supra: "LTC"},
            LOCIETH: {infra: "ETH", supra: "LOCI"},
            LOCIBTC: {infra: "BTC", supra: "LOCI"},
            LTCUSDT:
                {infra: "USD", supra: "LTC"},
            MODBTC:
                {infra: "BTC", supra: "MOD"},
            MODETH:
                {infra: "ETH", supra: "MOD"},
            MODKCS:
                {infra: "KCS", supra: "MOD"},
            MODNEO:
                {infra: "NEO", supra: "MOD"},
            MTHBTC:
                {infra: "BTC", supra: "MTH"},
            MTHETH:
                {infra: "ETH", supra: "MTH"},
            MTNBTC:
                {infra: "BTC", supra: "MTN"},
            MTNETH:
                {infra: "ETH", supra: "MTN"},
            NEBLBTC:
                {infra: "BTC", supra: "NEBL"},
            NEBLETH:
                {infra: "ETH", supra: "NEBL"},
            NEOBTC:
                {infra: "BTC", supra: "NEO"},
            NEOETH:
                {infra: "ETH", supra: "NEO"},
            NEOKCS:
                {infra: "KCS", supra: "NEO"},
            NEOUSDT:
                {infra: "USD", supra: "NEO"},
            NULSBTC:
                {infra: "BTC", supra: "NULS"},
            NULSETH:
                {infra: "ETH", supra: "NULS"},
            OCNBTC:
                {infra: "BTC", supra: "OCN"},
            OCNETH:
                {infra: "ETH", supra: "OCN"},
            OCNUSDT:
                {infra: "USD", supra: "OCN"},
            OMGBTC:
                {infra: "BTC", supra: "OMG"},
            OMGETH:
                {infra: "ETH", supra: "OMG"},
            ONIONBTC:
                {infra: "BTC", supra: "ONION"},
            ONIONETH:
                {infra: "ETH", supra: "ONION"},
            PAYBTC:
                {infra: "BTC", supra: "PAY"},
            PAYETH:
                {infra: "ETH", supra: "PAY"},
            PBLBTC:
                {infra: "BTC", supra: "PBL"},
            PBLETH:
                {infra: "ETH", supra: "PBL"},
            POEBTC:
                {infra: "BTC", supra: "POE"},
            POEETH:
                {infra: "ETH", supra: "POE"},
            POLLBTC:
                {infra: "BTC", supra: "POLL"},
            POLLETH:
                {infra: "ETH", supra: "POLL"},
            POWRBTC:
                {infra: "BTC", supra: "POWR"},
            POWRETH:
                {infra: "ETH", supra: "POWR"},
            PPTBTC:
                {infra: "BTC", supra: "PPT"},
            PPTETH:
                {infra: "ETH", supra: "PPT"},
            PRLBTC:
                {infra: "BTC", supra: "PRL"},
            PRLETH:
                {infra: "ETH", supra: "PRL"},
            PRLNEO:
                {infra: "NEO", supra: "PRL"},
            PURABTC:
                {infra: "BTC", supra: "PURA"},
            PURAETH:
                {infra: "ETH", supra: "PURA"},
            QLCBTC:
                {infra: "BTC", supra: "QLC"},
            QLCETH:
                {infra: "ETH", supra: "QLC"},
            QLCNEO:
                {infra: "NEO", supra: "QLC"},
            QSPBTC:
                {infra: "BTC", supra: "QSP"},
            QSPETH:
                {infra: "ETH", supra: "QSP"},
            QTUMBTC:
                {infra: "BTC", supra: "QTUM"},
            QTUMNEO:
                {infra: "NEO", supra: "QTUM"},
            RBTC:
                {infra: "BTC", supra: "R"},
            RDNBTC:
                {infra: "BTC", supra: "RDN"},
            RDNETH:
                {infra: "ETH", supra: "RDN"},
            REQBTC:
                {infra: "BTC", supra: "REQ"},
            REQETH:
                {infra: "ETH", supra: "REQ"},
            RETH:
                {infra: "ETH", supra: "R"},
            RHOCBTC:
                {infra: "BTC", supra: "RHOC"},
            RHOCETH:
                {infra: "ETH", supra: "RHOC"},
            RPXBTC:
                {infra: "BTC", supra: "RPX"},
            RPXETH:
                {infra: "ETH", supra: "RPX"},
            RPXKCS:
                {infra: "KCS", supra: "RPX"},
            RPXNEO:
                {infra: "NEO", supra: "RPX"},
            SNMBTC:
                {infra: "BTC", supra: "SNM"},
            SNMETH:
                {infra: "ETH", supra: "SNM"},
            SNOVBTC:
                {infra: "BTC", supra: "SNOV"},
            SNOVETH:
                {infra: "ETH", supra: "SNOV"},
            SNTBTC:
                {infra: "BTC", supra: "SNT"},
            SNTETH:
                {infra: "ETH", supra: "SNT"},
            STXBTC:
                {infra: "BTC", supra: "STX"},
            STXETH:
                {infra: "ETH", supra: "STX"},
            SUBBTC:
                {infra: "BTC", supra: "SUB"},
            SUBETH:
                {infra: "ETH", supra: "SUB"},
            TELBTC:
                {infra: "BTC", supra: "TEL"},
            TELETH:
                {infra: "ETH", supra: "TEL"},
            TELUSDT:
                {infra: "USD", supra: "TEL"},
            TFLBTC:
                {infra: "BTC", supra: "TFL"},
            TFLETH:
                {infra: "ETH", supra: "TFL"},
            TIOBTC:
                {infra: "BTC", supra: "TIO"},
            TIOETH:
                {infra: "ETH", supra: "TIO"},
            TKYBTC:
                {infra: "BTC", supra: "TKY"},
            TKYETH:
                {infra: "ETH", supra: "TKY"},
            TKYNEO:
                {infra: "NEO", supra: "TKY"},
            TNCBTC:
                {infra: "BTC", supra: "TNC"},
            TNCETH:
                {infra: "ETH", supra: "TNC"},
            TNCNEO:
                {infra: "NEO", supra: "TNC"},
            TNCUSDT:
                {infra: "USD", supra: "TNC"},
            UKGBTC:
                {infra: "BTC", supra: "UKG"},
            UKGETH:
                {infra: "ETH", supra: "UKG"},
            UTKBCH:
                {infra: "BCH", supra: "UTK"},
            UTKBTC:
                {infra: "BTC", supra: "UTK"},
            UTKETH:
                {infra: "ETH", supra: "UTK"},
            VENBTC:
                {infra: "BTC", supra: "VEN"},
            VENETH:
                {infra: "ETH", supra: "VEN"},
            WTCBTC:
                {infra: "BTC", supra: "WTC"},
            XASBCH:
                {infra: "BCH", supra: "XAS"},
            XASBTC:
                {infra: "BTC", supra: "XAS"},
            XASETH:
                {infra: "ETH", supra: "XAS"},
            XLRBTC:
                {infra: "BTC", supra: "XLR"},
            XLRETH:
                {infra: "ETH", supra: "XLR"},
            XRBBTC:
                {infra: "BTC", supra: "XRB"},
            XRBETH:
                {infra: "ETH", supra: "XRB"},
            XRBUSDT:
                {infra: "USD", supra: "XRB"},
            ZPTBTC:
                {infra: "BTC", supra: "ZPT"},
            ZPTETH:
                {infra: "ETH", supra: "ZPT"},
            ZPTNEO:
                {infra: "NEO", supra: "ZPT"},
        },
        hitbtc: {
            "1STBTC":
                {infra: "BTC", supra: "1ST"},
            "1STETH":
                {infra: "ETH", supra: "1ST"},
            ADXBTC:
                {infra: "BTC", supra: "ADX"},
            ADXETH:
                {infra: "ETH", supra: "ADX"},
            ADXUSD:
                {infra: "USD", supra: "ADX"},
            AEBTC:
                {infra: "BTC", supra: "AE"},
            AEONBTC:
                {infra: "BTC", supra: "AEON"},
            AIRBTC:
                {infra: "BTC", supra: "AIR"},
            AIRETH:
                {infra: "ETH", supra: "AIR"},
            AIRUSD:
                {infra: "USD", supra: "AIR"},
            AMMBTC:
                {infra: "BTC", supra: "AMM"},
            AMMETH:
                {infra: "ETH", supra: "AMM"},
            AMMUSD:
                {infra: "USD", supra: "AMM"},
            AMPBTC:
                {infra: "BTC", supra: "AMP"},
            ANTBTC:
                {infra: "BTC", supra: "ANT"},
            ARDRBTC:
                {infra: "BTC", supra: "ARDR"},
            ARNBTC:
                {infra: "BTC", supra: "ARN"},
            ARNETH:
                {infra: "ETH", supra: "ARN"},
            AXPBTC: {infra: "BTC", supra: "AXP"},
            AXPETH: {infra: "ETH", supra: "AXP"},
            ARTBTC:
                {infra: "BTC", supra: "ART"},
            ATBBTC:
                {infra: "BTC", supra: "ATB"},
            ATBETH:
                {infra: "ETH", supra: "ATB"},
            ATBUSD:
                {infra: "USD", supra: "ATB"},
            ATLBTC:
                {infra: "BTC", supra: "ATL"},
            ATMBTC:
                {infra: "BTC", supra: "ATM"},
            ATMETH:
                {infra: "ETH", supra: "ATM"},
            ATMUSD:
                {infra: "USD", supra: "ATM"},
            ATSBTC:
                {infra: "BTC", supra: "ATS"},
            ATSETH:
                {infra: "ETH", supra: "ATS"},
            AVHBTC:
                {infra: "BTC", supra: "AVH"},
            AVTETH:
                {infra: "ETH", supra: "AVT"},
            B2XBTC:
                {infra: "BTC", supra: "B2X"},
            B2XETH:
                {infra: "ETH", supra: "B2X"},
            B2XUSD:
                {infra: "USD", supra: "B2X"},
            BASETH:
                {infra: "ETH", supra: "BAS"},
            BCHBTC:
                {infra: "BTC", supra: "BCH"},
            BCHETH:
                {infra: "ETH", supra: "BCH"},
            BCHUSD:
                {infra: "USD", supra: "BCH"},
            BCNBTC:
                {infra: "BTC", supra: "BCN"},
            BCNETH:
                {infra: "ETH", supra: "BCN"},
            BCNUSD:
                {infra: "USD", supra: "BCN"},
            BETETH:
                {infra: "ETH", supra: "BET"},
            BKBBTC:
                {infra: "BTC", supra: "BKB"},
            BMCBTC:
                {infra: "BTC", supra: "BMC"},
            BMCETH:
                {infra: "ETH", supra: "BMC"},
            BMCUSD:
                {infra: "USD", supra: "BMC"},
            BMTBTC:
                {infra: "BTC", supra: "BMT"},
            BMTETH:
                {infra: "ETH", supra: "BMT"},
            BNTBTC:
                {infra: "BTC", supra: "BNT"},
            BNTETH:
                {infra: "ETH", supra: "BNT"},
            BNTUSD:
                {infra: "USD", supra: "BNT"},
            BOSBTC:
                {infra: "BTC", supra: "BOS"},
            BQXBTC:
                {infra: "BTC", supra: "BQX"},
            BQXETH:
                {infra: "ETH", supra: "BQX"},
            BQXUSD:
                {infra: "USD", supra: "BQX"},
            BTCABTC:
                {infra: "BTC", supra: "BTCA"},
            BTCAETH:
                {infra: "ETH", supra: "BTCA"},
            BTCAUSD:
                {infra: "USD", supra: "BTCA"},
            BTCUSD:
                {infra: "USD", supra: "BTC"},
            BTGBTC:
                {infra: "BTC", supra: "BTG"},
            BTGETH:
                {infra: "ETH", supra: "BTG"},
            BTGUSD:
                {infra: "USD", supra: "BTG"},
            BTMBTC:
                {infra: "BTC", supra: "BTM"},
            BTMETH:
                {infra: "ETH", supra: "BTM"},
            BTMUSD:
                {infra: "USD", supra: "BTM"},
            BTXBTC:
                {infra: "BTC", supra: "BTX"},
            BTXUSDT:
                {infra: "USD", supra: "BTX"},
            BUSBTC:
                {infra: "BTC", supra: "BUS"},
            C20BTC:
                {infra: "BTC", supra: "C20"},
            C20ETH:
                {infra: "ETH", supra: "C20"},
            CASBTC:
                {infra: "BTC", supra: "CAS"},
            CASETH:
                {infra: "ETH", supra: "CAS"},
            CASUSD:
                {infra: "USD", supra: "CAS"},
            CATBTC:
                {infra: "BTC", supra: "CAT"},
            CATETH:
                {infra: "ETH", supra: "CAT"},
            CATUSD:
                {infra: "USD", supra: "CAT"},
            CCTETH:
                {infra: "ETH", supra: "CCT"},
            CDTBTC:
                {infra: "BTC", supra: "CDT"},
            CDTETH:
                {infra: "ETH", supra: "CDT"},
            CDTUSD:
                {infra: "USD", supra: "CDT"},
            CDXETH:
                {infra: "ETH", supra: "CDX"},
            CFIBTC:
                {infra: "BTC", supra: "CFI"},
            CFIETH:
                {infra: "ETH", supra: "CFI"},
            CHATBTC:
                {infra: "BTC", supra: "CHAT"},
            CHATETH:
                {infra: "ETH", supra: "CHAT"},
            CHATUSD:
                {infra: "USD", supra: "CHAT"},
            CHSBBTC:
                {infra: "BTC", supra: "CHSB"},
            CHSBETH:
                {infra: "ETH", supra: "CHSB"},
            CLBTC:
                {infra: "BTC", supra: "CL"},
            CLDBTC:
                {infra: "BTC", supra: "CLD"},
            CLDETH:
                {infra: "ETH", supra: "CLD"},
            CLDUSD:
                {infra: "USD", supra: "CLD"},
            CLETH:
                {infra: "ETH", supra: "CL"},
            CLUSD:
                {infra: "USD", supra: "CL"},
            CNDBTC:
                {infra: "BTC", supra: "CND"},
            CNDETH:
                {infra: "ETH", supra: "CND"},
            CNDUSD:
                {infra: "USD", supra: "CND"},
            CNXBTC:
                {infra: "BTC", supra: "CNX"},
            COSSBTC:
                {infra: "BTC", supra: "COSS"},
            COSSETH:
                {infra: "ETH", supra: "COSS"},
            COVBTC:
                {infra: "BTC", supra: "COV"},
            COVETH:
                {infra: "ETH", supra: "COV"},
            CPAYETH:
                {infra: "ETH", supra: "CPAY"},
            CSNOBTC:
                {infra: "BTC", supra: "CSNO"},
            CTRBTC:
                {infra: "BTC", supra: "CTR"},
            CTRETH:
                {infra: "ETH", supra: "CTR"},
            CTRUSD:
                {infra: "USD", supra: "CTR"},
            CTXBTC:
                {infra: "BTC", supra: "CTX"},
            CTXETH:
                {infra: "ETH", supra: "CTX"},
            CVCUSD:
                {infra: "USD", supra: "CVC"},
            DASHBTC:
                {infra: "BTC", supra: "DASH"},
            DASHETH:
                {infra: "ETH", supra: "DASH"},
            DASHUSD:
                {infra: "USD", supra: "DASH"},
            DATABTC:
                {infra: "BTC", supra: "DATA"},
            DATAETH:
                {infra: "ETH", supra: "DATA"},
            DATAUSD:
                {infra: "USD", supra: "DATA"},
            DBIXBTC:
                {infra: "BTC", supra: "DBIX"},
            DCNETH:
                {infra: "ETH", supra: "DCN"},
            DCNUSD:
                {infra: "USD", supra: "DCN"},
            DCTBTC:
                {infra: "BTC", supra: "DCT"},
            DDFETH:
                {infra: "ETH", supra: "DDF"},
            DENTETH:
                {infra: "ETH", supra: "DENT"},
            DGBBTC:
                {infra: "BTC", supra: "DGB"},
            DGBETH:
                {infra: "ETH", supra: "DGB"},
            DGBUSD:
                {infra: "USD", supra: "DGB"},
            DGDBTC:
                {infra: "BTC", supra: "DGD"},
            DICEBTC:
                {infra: "BTC", supra: "DICE"},
            DICEETH:
                {infra: "ETH", supra: "DICE"},
            DIMBTC:
                {infra: "BTC", supra: "DIM"},
            DIMETH:
                {infra: "ETH", supra: "DIM"},
            DIMUSD:
                {infra: "USD", supra: "DIM"},
            DLTBTC:
                {infra: "BTC", supra: "DLT"},
            DNTBTC:
                {infra: "BTC", supra: "DNT"},
            DOGEBTC:
                {infra: "BTC", supra: "DOGE"},
            DOGEETH:
                {infra: "ETH", supra: "DOGE"},
            DOGEUSD:
                {infra: "USD", supra: "DOGE"},
            DOVBTC:
                {infra: "BTC", supra: "DOV"},
            DOVETH:
                {infra: "ETH", supra: "DOV"},
            DRPUBTC:
                {infra: "BTC", supra: "DRPU"},
            DRPUETH:
                {infra: "ETH", supra: "DRPU"},
            DRTETH:
                {infra: "ETH", supra: "DRT"},
            DRTUSDT:
                {infra: "USD", supra: "DRT"},
            DSHBTC:
                {infra: "BTC", supra: "DSH"},
            EBETETH:
                {infra: "ETH", supra: "EBET"},
            EBTCNEWBTC:
                {infra: "BTC", supra: "EBTC"},
            EBTCNEWETH:
                {infra: "ETH", supra: "EBTC"},
            EBTCNEWUSD:
                {infra: "USD", supra: "EBTC"},
            EBTCOLDBTC:
                {infra: "BTC", supra: "EBTCOLD"},
            EBTCOLDETH:
                {infra: "ETH", supra: "EBTCOLD"},
            EBTCOLDUSD:
                {infra: "USD", supra: "EBTCOLD"},
            ECHBTC:
                {infra: "BTC", supra: "ECH"},
            EDGBTC:
                {infra: "BTC", supra: "EDG"},
            EDOBTC:
                {infra: "BTC", supra: "EDO"},
            EDOETH:
                {infra: "ETH", supra: "EDO"},
            EDOUSD:
                {infra: "USD", supra: "EDO"},
            EETBTC:
                {infra: "BTC", supra: "EET"},
            EETETH:
                {infra: "ETH", supra: "EET"},
            EETUSD:
                {infra: "USD", supra: "EET"},
            EKOBTC:
                {infra: "BTC", supra: "EKO"},
            EKOETH:
                {infra: "ETH", supra: "EKO"},
            ELEBTC:
                {infra: "BTC", supra: "ELE"},
            ELMBTC:
                {infra: "BTC", supra: "ELM"},
            EMCBTC:
                {infra: "BTC", supra: "EMC"},
            EMCETH:
                {infra: "ETH", supra: "EMC"},
            EMCUSDT:
                {infra: "USD", supra: "EMC"},
            EMGOBTC:
                {infra: "BTC", supra: "EMGO"},
            EMGOUSD:
                {infra: "USD", supra: "EMGO"},
            ENGETH:
                {infra: "ETH", supra: "ENG"},
            ENJBTC:
                {infra: "BTC", supra: "ENJ"},
            ENJETH:
                {infra: "ETH", supra: "ENJ"},
            ENJUSD:
                {infra: "USD", supra: "ENJ"},
            EOSBTC:
                {infra: "BTC", supra: "EOS"},
            EOSETH:
                {infra: "ETH", supra: "EOS"},
            EOSUSD:
                {infra: "USD", supra: "EOS"},
            EROBTC:
                {infra: "BTC", supra: "ERO"},
            ETBSBTC:
                {infra: "BTC", supra: "ETBS"},
            ETCBTC:
                {infra: "BTC", supra: "ETC"},
            ETCETH:
                {infra: "ETH", supra: "ETC"},
            ETCUSD:
                {infra: "USD", supra: "ETC"},
            ETHBTC:
                {infra: "BTC", supra: "ETH"},
            ETHUSD:
                {infra: "USD", supra: "ETH"},
            ETPBTC:
                {infra: "BTC", supra: "ETP"},
            ETPETH:
                {infra: "ETH", supra: "ETP"},
            ETPUSD:
                {infra: "USD", supra: "ETP"},
            EVXBTC:
                {infra: "BTC", supra: "EVX"},
            EVXETH:
                {infra: "ETH", supra: "EVX"},
            EVXUSD:
                {infra: "USD", supra: "EVX"},
            EXNBTC:
                {infra: "BTC", supra: "EXN"},
            FCNBTC:
                {infra: "BTC", supra: "FCN"},
            FRDBTC:
                {infra: "BTC", supra: "FRD"},
            FUELBTC:
                {infra: "BTC", supra: "FUEL"},
            FUELETH:
                {infra: "ETH", supra: "FUEL"},
            FUELUSD:
                {infra: "USD", supra: "FUEL"},
            FUNBTC:
                {infra: "BTC", supra: "FUN"},
            FUNETH:
                {infra: "ETH", supra: "FUN"},
            FUNUSD:
                {infra: "USD", supra: "FUN"},
            FYNETH:
                {infra: "ETH", supra: "FYN"},
            FYPBTC:
                {infra: "BTC", supra: "FYP"},
            GAMEBTC:
                {infra: "BTC", supra: "GAME"},
            GNOBTC:
                {infra: "BTC", supra: "GNO"},
            GNOETH:
                {infra: "ETH", supra: "GNO"},
            GRMDBTC:
                {infra: "BTC", supra: "GRMD"},
            GUPBTC:
                {infra: "BTC", supra: "GUP"},
            GVTETH:
                {infra: "ETH", supra: "GVT"},
            HACBTC:
                {infra: "BTC", supra: "HAC"},
            HDGETH:
                {infra: "ETH", supra: "HDG"},
            HGTETH:
                {infra: "ETH", supra: "HGT"},
            HPCBTC:
                {infra: "BTC", supra: "HPC"},
            HSRBTC:
                {infra: "BTC", supra: "HSR"},
            HVNBTC:
                {infra: "BTC", supra: "HVN"},
            HVNETH:
                {infra: "ETH", supra: "HVN"},
            ICNBTC:
                {infra: "BTC", supra: "ICN"},
            ICOBTC:
                {infra: "BTC", supra: "ICO"},
            ICOSBTC:
                {infra: "BTC", supra: "ICOS"},
            ICOSETH:
                {infra: "ETH", supra: "ICOS"},
            ICOSUSD:
                {infra: "USD", supra: "ICOS"},
            ICXBTC:
                {infra: "BTC", supra: "ICX"},
            ICXETH:
                {infra: "ETH", supra: "ICX"},
            ICXUSD:
                {infra: "USD", supra: "ICX"},
            IDHBTC:
                {infra: "BTC", supra: "IDH"},
            IDHETH:
                {infra: "ETH", supra: "IDH"},
            IGNISETH:
                {infra: "ETH", supra: "IGNIS"},
            INDETH:
                {infra: "ETH", supra: "IND"},
            INDIBTC:
                {infra: "BTC", supra: "INDI"},
            IPLBTC:
                {infra: "BTC", supra: "IPL"},
            ITSBTC:
                {infra: "BTC", supra: "ITS"},
            IXTBTC:
                {infra: "BTC", supra: "IXT"},
            IXTETH:
                {infra: "ETH", supra: "IXT"},
            KBRBTC:
                {infra: "BTC", supra: "KBR"},
            KICKBTC:
                {infra: "BTC", supra: "KICK"},
            KMDBTC:
                {infra: "BTC", supra: "KMD"},
            KMDETH:
                {infra: "ETH", supra: "KMD"},
            KMDUSD:
                {infra: "USD", supra: "KMD"},
            LAETH:
                {infra: "ETH", supra: "LA"},
            LATBTC:
                {infra: "BTC", supra: "LAT"},
            LENDBTC:
                {infra: "BTC", supra: "LEND"},
            LENDETH:
                {infra: "ETH", supra: "LEND"},
            LIFEBTC:
                {infra: "BTC", supra: "LIFE"},
            LOCBTC:
                {infra: "BTC", supra: "LOC"},
            LOCETH:
                {infra: "ETH", supra: "LOC"},
            LOCUSD:
                {infra: "USD", supra: "LOC"},
            LRCBTC:
                {infra: "BTC", supra: "LRC"},
            LRCETH:
                {infra: "ETH", supra: "LRC"},
            LSKBTC:
                {infra: "BTC", supra: "LSK"},
            LSKETH:
                {infra: "ETH", supra: "LSK"},
            LSKUSD:
                {infra: "USD", supra: "LSK"},
            LTCBTC:
                {infra: "BTC", supra: "LTC"},
            LTCETH:
                {infra: "ETH", supra: "LTC"},
            LTCUSD:
                {infra: "USD", supra: "LTC"},
            LUNBTC:
                {infra: "BTC", supra: "LUN"},
            MAIDBTC:
                {infra: "BTC", supra: "MAID"},
            MAIDETH:
                {infra: "ETH", supra: "MAID"},
            MAIDUSD:
                {infra: "USD", supra: "MAID"},
            MANABTC:
                {infra: "BTC", supra: "MANA"},
            MANAETH:
                {infra: "ETH", supra: "MANA"},
            MANAUSD:
                {infra: "USD", supra: "MANA"},
            MCAPBTC:
                {infra: "BTC", supra: "MCAP"},
            MCOBTC:
                {infra: "BTC", supra: "MCO"},
            MCOETH:
                {infra: "ETH", supra: "MCO"},
            MCOUSD:
                {infra: "USD", supra: "MCO"},
            MIPSBTC:
                {infra: "BTC", supra: "MIPS"},
            MNEBTC:
                {infra: "BTC", supra: "MNE"},
            MSPETH:
                {infra: "ETH", supra: "MSP"},
            MTHBTC:
                {infra: "BTC", supra: "MTH"},
            MTHETH:
                {infra: "ETH", supra: "MTH"},
            MYBETH:
                {infra: "ETH", supra: "MYB"},
            NDCETH:
                {infra: "ETH", supra: "NDC"},
            NEBLBTC:
                {infra: "BTC", supra: "NEBL"},
            NEBLETH:
                {infra: "ETH", supra: "NEBL"},
            NEOBTC:
                {infra: "BTC", supra: "NEO"},
            NEOETH:
                {infra: "ETH", supra: "NEO"},
            NEOUSD:
                {infra: "USD", supra: "NEO"},
            NETETH:
                {infra: "ETH", supra: "NET"},
            NGCBTC:
                {infra: "BTC", supra: "NGC"},
            NGCETH:
                {infra: "ETH", supra: "NGC"},
            NGCUSD:
                {infra: "USD", supra: "NGC"},
            NTOBTC:
                {infra: "BTC", supra: "NTO"},
            NXCBTC:
                {infra: "BTC", supra: "NXC"},
            NXTBTC:
                {infra: "BTC", supra: "NXT"},
            NXTETH:
                {infra: "ETH", supra: "NXT"},
            NXTUSD:
                {infra: "USD", supra: "NXT"},
            OAXBTC:
                {infra: "BTC", supra: "OAX"},
            OAXETH:
                {infra: "ETH", supra: "OAX"},
            OAXUSD:
                {infra: "USD", supra: "OAX"},
            ODNBTC:
                {infra: "BTC", supra: "ODN"},
            OMGBTC:
                {infra: "BTC", supra: "OMG"},
            OMGETH:
                {infra: "ETH", supra: "OMG"},
            OMGUSD:
                {infra: "USD", supra: "OMG"},
            OPTBTC:
                {infra: "BTC", supra: "OPT"},
            ORMEBTC:
                {infra: "BTC", supra: "ORME"},
            OTNBTC:
                {infra: "BTC", supra: "OTN"},
            OTXBTC:
                {infra: "BTC", supra: "OTX"},
            PAYBTC:
                {infra: "BTC", supra: "PAY"},
            PAYETH:
                {infra: "ETH", supra: "PAY"},
            PINGBTC:
                {infra: "BTC", supra: "PING"},
            PIXBTC:
                {infra: "BTC", supra: "PIX"},
            PIXETH:
                {infra: "ETH", supra: "PIX"},
            PLBTBTC:
                {infra: "BTC", supra: "PLBT"},
            PLRBTC:
                {infra: "BTC", supra: "PLR"},
            PLRETH:
                {infra: "ETH", supra: "PLR"},
            PLRUSD:
                {infra: "USD", supra: "PLR"},
            PLUBTC:
                {infra: "BTC", supra: "PLU"},
            PLUETH:
                {infra: "ETH", supra: "PLU"},
            POEBTC:
                {infra: "BTC", supra: "POE"},
            POEETH:
                {infra: "ETH", supra: "POE"},
            POLLBTC:
                {infra: "BTC", supra: "POLL"},
            PPCBTC:
                {infra: "BTC", supra: "PPC"},
            PPCUSD:
                {infra: "USD", supra: "PPC"},
            PPTBTC:
                {infra: "BTC", supra: "PPT"},
            PPTETH:
                {infra: "ETH", supra: "PPT"},
            PREBTC:
                {infra: "BTC", supra: "PRE"},
            PRGBTC:
                {infra: "BTC", supra: "PRG"},
            PRGETH:
                {infra: "ETH", supra: "PRG"},
            PRGUSD:
                {infra: "USD", supra: "PRG"},
            PROETH:
                {infra: "ETH", supra: "PRO"},
            PTOYBTC:
                {infra: "BTC", supra: "PTOY"},
            PTOYETH:
                {infra: "ETH", supra: "PTOY"},
            QAUBTC:
                {infra: "BTC", supra: "QAU"},
            QAUETH:
                {infra: "ETH", supra: "QAU"},
            QCNBTC:
                {infra: "BTC", supra: "QCN"},
            QTUMBTC:
                {infra: "BTC", supra: "QTUM"},
            QTUMETH:
                {infra: "ETH", supra: "QTUM"},
            QTUMUSD:
                {infra: "USD", supra: "QTUM"},
            QVTETH:
                {infra: "ETH", supra: "QVT"},
            REPBTC:
                {infra: "BTC", supra: "REP"},
            REPETH:
                {infra: "ETH", supra: "REP"},
            REPUSDT:
                {infra: "USD", supra: "REP"},
            RKCETH:
                {infra: "ETH", supra: "RKC"},
            RLCBTC:
                {infra: "BTC", supra: "RLC"},
            RVTBTC:
                {infra: "BTC", supra: "RVT"},
            SANETH:
                {infra: "ETH", supra: "SAN"},
            SBDBTC:
                {infra: "BTC", supra: "SBD"},
            SBTCBTC:
                {infra: "BTC", supra: "SBTC"},
            SBTCETH:
                {infra: "ETH", supra: "SBTC"},
            SBTCUSDT:
                {infra: "USD", supra: "SBTC"},
            SCBTC:
                {infra: "BTC", supra: "SC"},
            SCLBTC:
                {infra: "BTC", supra: "SCL"},
            SISABTC:
                {infra: "BTC", supra: "SISA"},
            SISAETH:
                {infra: "ETH", supra: "SISA"},
            SKINBTC:
                {infra: "BTC", supra: "SKIN"},
            SMARTBTC:
                {infra: "BTC", supra: "SMART"},
            SMARTETH:
                {infra: "ETH", supra: "SMART"},
            SMARTUSD:
                {infra: "USD", supra: "SMART"},
            SMSBTC:
                {infra: "BTC", supra: "SMS"},
            SMSETH:
                {infra: "ETH", supra: "SMS"},
            SMSUSD:
                {infra: "USD", supra: "SMS"},
            SMTBTC:
                {infra: "BTC", supra: "SMT"},
            SMTETH:
                {infra: "ETH", supra: "SMT"},
            SMTUSD:
                {infra: "USD", supra: "SMT"},
            SNCBTC:
                {infra: "BTC", supra: "SNC"},
            SNCETH:
                {infra: "ETH", supra: "SNC"},
            SNCUSD:
                {infra: "USD", supra: "SNC"},
            SNGLSBTC:
                {infra: "BTC", supra: "SNGLS"},
            SNMETH:
                {infra: "ETH", supra: "SNM"},
            SNTBTC:
                {infra: "BTC", supra: "SNT"},
            SNTETH:
                {infra: "ETH", supra: "SNT"},
            SNTUSD:
                {infra: "USD", supra: "SNT"},
            SPFETH:
                {infra: "ETH", supra: "SPF"},
            STARETH:
                {infra: "ETH", supra: "STAR"},
            STEEMBTC:
                {infra: "BTC", supra: "STEEM"},
            STORMBTC:
                {infra: "BTC", supra: "STORM"},
            STRATBTC:
                {infra: "BTC", supra: "STRAT"},
            STRATETH:
                {infra: "ETH", supra: "STRAT"},
            STRATUSD:
                {infra: "USD", supra: "STRAT"},
            STUBTC:
                {infra: "BTC", supra: "STU"},
            STUETH:
                {infra: "ETH", supra: "STU"},
            STUUSD:
                {infra: "USD", supra: "STU"},
            STXBTC:
                {infra: "BTC", supra: "STX"},
            STXETH:
                {infra: "ETH", supra: "STX"},
            STXUSD:
                {infra: "USD", supra: "STX"},
            SUBBTC:
                {infra: "BTC", supra: "SUB"},
            SUBETH:
                {infra: "ETH", supra: "SUB"},
            SUBUSD:
                {infra: "USD", supra: "SUB"},
            SURBTC:
                {infra: "BTC", supra: "SUR"},
            SURETH:
                {infra: "ETH", supra: "SUR"},
            SURUSD:
                {infra: "USD", supra: "SUR"},
            SWFTCBTC:
                {infra: "BTC", supra: "SWFTC"},
            SWFTCETH:
                {infra: "ETH", supra: "SWFTC"},
            SWFTCUSD:
                {infra: "USD", supra: "SWFTC"},
            SWTBTC:
                {infra: "BTC", supra: "SWT"},
            SWTETH:
                {infra: "ETH", supra: "SWT"},
            TAASBTC:
                {infra: "BTC", supra: "TAAS"},
            TAASETH:
                {infra: "ETH", supra: "TAAS"},
            TBTBTC:
                {infra: "BTC", supra: "TBT"},
            TGTBTC:
                {infra: "BTC", supra: "TGT"},
            TIMEBTC:
                {infra: "BTC", supra: "TIME"},
            TIMEETH:
                {infra: "ETH", supra: "TIME"},
            TIOBTC:
                {infra: "BTC", supra: "TIO"},
            TIOETH:
                {infra: "ETH", supra: "TIO"},
            TIOUSD:
                {infra: "USD", supra: "TIO"},
            TIXETH:
                {infra: "ETH", supra: "TIX"},
            TKNBTC:
                {infra: "BTC", supra: "TKN"},
            TKRETH:
                {infra: "ETH", supra: "TKR"},
            TNTBTC:
                {infra: "BTC", supra: "TNT"},
            TNTETH:
                {infra: "ETH", supra: "TNT"},
            TNTUSD:
                {infra: "USD", supra: "TNT"},
            TRACETH:
                {infra: "ETH", supra: "TRAC"},
            TRSTBTC:
                {infra: "BTC", supra: "TRST"},
            TRXBTC:
                {infra: "BTC", supra: "TRX"},
            TRXETH:
                {infra: "ETH", supra: "TRX"},
            TRXUSD:
                {infra: "USD", supra: "TRX"},
            UETETH:
                {infra: "ETH", supra: "UET"},
            UGTBTC:
                {infra: "BTC", supra: "UGT"},
            UGTETH:
                {infra: "ETH", supra: "UGT"},
            UGTUSD:
                {infra: "USD", supra: "UGT"},
            ULTCBTC:
                {infra: "BTC", supra: "ULTC"},
            UTKBTC:
                {infra: "BTC", supra: "UTK"},
            UTKETH:
                {infra: "ETH", supra: "UTK"},
            UTKUSD:
                {infra: "USD", supra: "UTK"},
            UTTBTC:
                {infra: "BTC", supra: "UTT"},
            UTTETH:
                {infra: "ETH", supra: "UTT"},
            UTTUSD:
                {infra: "USD", supra: "UTT"},
            VENBTC:
                {infra: "BTC", supra: "VEN"},
            VENETH:
                {infra: "ETH", supra: "VEN"},
            VENUSD:
                {infra: "USD", supra: "VEN"},
            VERIBTC:
                {infra: "BTC", supra: "VERI"},
            VERIETH:
                {infra: "ETH", supra: "VERI"},
            VERIUSD:
                {infra: "USD", supra: "VERI"},
            VIBBTC:
                {infra: "BTC", supra: "VIB"},
            VIBEBTC:
                {infra: "BTC", supra: "VIBE"},
            VIBETH:
                {infra: "ETH", supra: "VIB"},
            VIBUSD:
                {infra: "USD", supra: "VIB"},
            VOISEBTC:
                {infra: "BTC", supra: "VOISE"},
            W3CBTC:
                {infra: "BTC", supra: "W3C"},
            W3CETH:
                {infra: "ETH", supra: "W3C"},
            WAVESBTC:
                {infra: "BTC", supra: "WAVES"},
            WAXBTC:
                {infra: "BTC", supra: "WAX"},
            WAXETH:
                {infra: "ETH", supra: "WAX"},
            WAXUSD:
                {infra: "USD", supra: "WAX"},
            WINGSBTC:
                {infra: "BTC", supra: "WINGS"},
            WMGOBTC:
                {infra: "BTC", supra: "WMGO"},
            WMGOUSD:
                {infra: "USD", supra: "WMGO"},
            WRCBTC:
                {infra: "BTC", supra: "WRC"},
            WRCETH:
                {infra: "ETH", supra: "WRC"},
            WRCUSD:
                {infra: "USD", supra: "WRC"},
            WTCBTC:
                {infra: "BTC", supra: "WTC"},
            XAURBTC:
                {infra: "BTC", supra: "XAUR"},
            XAURETH:
                {infra: "ETH", supra: "XAUR"},
            XDNBTC:
                {infra: "BTC", supra: "XDN"},
            XDNCOBTC:
                {infra: "BTC", supra: "XDNCO"},
            XDNETH:
                {infra: "ETH", supra: "XDN"},
            XDNUSD:
                {infra: "USD", supra: "XDN"},
            XEMBTC:
                {infra: "BTC", supra: "XEM"},
            XEMETH:
                {infra: "ETH", supra: "XEM"},
            XEMUSD:
                {infra: "USD", supra: "XEM"},
            XMRBTC:
                {infra: "BTC", supra: "XMR"},
            XMRETH:
                {infra: "ETH", supra: "XMR"},
            XMRUSD:
                {infra: "USD", supra: "XMR"},
            XRPBTC:
                {infra: "BTC", supra: "XRP"},
            XRPETH:
                {infra: "ETH", supra: "XRP"},
            XRPUSDT:
                {infra: "USD", supra: "XRP"},
            XTZBTC:
                {infra: "BTC", supra: "XTZ"},
            XTZETH:
                {infra: "ETH", supra: "XTZ"},
            XTZUSD:
                {infra: "USD", supra: "XTZ"},
            XUCBTC:
                {infra: "BTC", supra: "XUC"},
            XUCETH:
                {infra: "ETH", supra: "XUC"},
            XUCUSD:
                {infra: "USD", supra: "XUC"},
            XVGBTC:
                {infra: "BTC", supra: "XVG"},
            XVGETH:
                {infra: "ETH", supra: "XVG"},
            XVGUSD:
                {infra: "USD", supra: "XVG"},
            YOYOWBTC:
                {infra: "BTC", supra: "YOYOW"},
            ZAPBTC:
                {infra: "BTC", supra: "ZAP"},
            ZECBTC:
                {infra: "BTC", supra: "ZEC"},
            ZECETH:
                {infra: "ETH", supra: "ZEC"},
            ZECUSD:
                {infra: "USD", supra: "ZEC"},
            ZRCBTC:
                {infra: "BTC", supra: "ZRC"},
            ZRXBTC:
                {infra: "BTC", supra: "ZRX"},
            ZRXETH:
                {infra: "ETH", supra: "ZRX"},
            ZRXUSD:
                {infra: "USD", supra: "ZRX"},
            ZSCBTC:
                {infra: "BTC", supra: "ZSC"},
            ZSCETH:
                {infra: "ETH", supra: "ZSC"},
            ZSCUSD:
                {infra: "USD", supra: "ZSC"},
        },
        binance: {


            ADABTC:
                {infra: "BTC", supra: "ADA"},
            ADAETH:
                {infra: "ETH", supra: "ADA"},
            ADXBNB:
                {infra: "BNB", supra: "ADX"},
            ADXBTC:
                {infra: "BTC", supra: "ADX"},
            AEBTC: {infra: "BTC", supra: "AE"},
            AEBNB: {infra: "BNB", supra: "AE"},
            AEETH: {infra: "ETH", supra: "AE"},
            ADXETH:
                {infra: "ETH", supra: "ADX"},
            AIONBNB:
                {infra: "BNB", supra: "AION"},
            AIONBTC:
                {infra: "BTC", supra: "AION"},
            AIONETH:
                {infra: "ETH", supra: "AION"},
            AMBBNB:
                {infra: "BNB", supra: "AMB"},
            AMBBTC:
                {infra: "BTC", supra: "AMB"},
            AMBETH:
                {infra: "ETH", supra: "AMB"},
            APPCBNB:
                {infra: "BNB", supra: "APPC"},
            APPCBTC:
                {infra: "BTC", supra: "APPC"},
            APPCETH:
                {infra: "ETH", supra: "APPC"},
            ARKBTC:
                {infra: "BTC", supra: "ARK"},
            ARKETH:
                {infra: "ETH", supra: "ARK"},
            ARNBTC:
                {infra: "BTC", supra: "ARN"},
            ARNETH:
                {infra: "ETH", supra: "ARN"},
            ASTBTC:
                {infra: "BTC", supra: "AST"},
            ASTETH:
                {infra: "ETH", supra: "AST"},
            BATBNB:
                {infra: "BNB", supra: "BAT"},
            BATBTC:
                {infra: "BTC", supra: "BAT"},
            BATETH:
                {infra: "ETH", supra: "BAT"},
            BCCBNB:
                {infra: "BNB", supra: "BCH"},
            BCCBTC:
                {infra: "BTC", supra: "BCH"},
            BCCETH:
                {infra: "ETH", supra: "BCH"},
            BCCUSDT:
                {infra: "USD", supra: "BCH"},
            BCDBTC:
                {infra: "BTC", supra: "BCD"},
            BCDETH:
                {infra: "ETH", supra: "BCD"},
            BCPTBNB:
                {infra: "BNB", supra: "BCPT"},
            BCPTBTC:
                {infra: "BTC", supra: "BCPT"},
            BCPTETH:
                {infra: "ETH", supra: "BCPT"},
            BLZBNB:
                {infra: "BNB", supra: "BLZ"},
            BLZBTC:
                {infra: "BTC", supra: "BLZ"},
            BLZETH:
                {infra: "ETH", supra: "BLZ"},
            BNBBTC:
                {infra: "BTC", supra: "BNB"},
            BNBETH:
                {infra: "ETH", supra: "BNB"},
            BNBUSDT:
                {infra: "USD", supra: "BNB"},
            BNTBTC:
                {infra: "BTC", supra: "BNT"},
            BNTETH:
                {infra: "ETH", supra: "BNT"},
            BQXBTC:
                {infra: "BTC", supra: "BQX"},
            BQXETH:
                {infra: "ETH", supra: "BQX"},
            BRDBNB:
                {infra: "BNB", supra: "BRD"},
            BRDBTC:
                {infra: "BTC", supra: "BRD"},
            BRDETH:
                {infra: "ETH", supra: "BRD"},
            BTCUSDT:
                {infra: "USD", supra: "BTC"},
            BTGBTC:
                {infra: "BTC", supra: "BTG"},
            BTGETH:
                {infra: "ETH", supra: "BTG"},
            BTSBNB:
                {infra: "BNB", supra: "BTS"},
            BTSBTC:
                {infra: "BTC", supra: "BTS"},
            BTSETH:
                {infra: "ETH", supra: "BTS"},
            CDTBTC:
                {infra: "BTC", supra: "CDT"},
            CDTETH:
                {infra: "ETH", supra: "CDT"},
            CHATBTC:
                {infra: "BTC", supra: "CHAT"},
            CHATETH:
                {infra: "ETH", supra: "CHAT"},
            CMTBNB:
                {infra: "BNB", supra: "CMT"},
            CMTBTC:
                {infra: "BTC", supra: "CMT"},
            CMTETH:
                {infra: "ETH", supra: "CMT"},
            CNDBNB:
                {infra: "BNB", supra: "CND"},
            CNDBTC:
                {infra: "BTC", supra: "CND"},
            CNDETH:
                {infra: "ETH", supra: "CND"},
            CTRBTC:
                {infra: "BTC", supra: "CTR"},
            CTRETH:
                {infra: "ETH", supra: "CTR"},
            DASHBTC:
                {infra: "BTC", supra: "DASH"},
            DASHETH:
                {infra: "ETH", supra: "DASH"},
            DGDBTC:
                {infra: "BTC", supra: "DGD"},
            DGDETH:
                {infra: "ETH", supra: "DGD"},
            DLTBNB:
                {infra: "BNB", supra: "DLT"},
            DLTBTC:
                {infra: "BTC", supra: "DLT"},
            DLTETH:
                {infra: "ETH", supra: "DLT"},
            DNTBTC:
                {infra: "BTC", supra: "DNT"},
            DNTETH:
                {infra: "ETH", supra: "DNT"},
            EDOBTC:
                {infra: "BTC", supra: "EDO"},
            EDOETH:
                {infra: "ETH", supra: "EDO"},
            ELFBTC:
                {infra: "BTC", supra: "ELF"},
            ELFETH:
                {infra: "ETH", supra: "ELF"},
            ENGBTC:
                {infra: "BTC", supra: "ENG"},
            ENGETH:
                {infra: "ETH", supra: "ENG"},
            ENJBTC:
                {infra: "BTC", supra: "ENJ"},
            ENJETH:
                {infra: "ETH", supra: "ENJ"},
            EOSBTC:
                {infra: "BTC", supra: "EOS"},
            EOSETH:
                {infra: "ETH", supra: "EOS"},
            ETCBTC:
                {infra: "BTC", supra: "ETC"},
            ETCETH:
                {infra: "ETH", supra: "ETC"},
            ETHBTC:
                {infra: "BTC", supra: "ETH"},
            ETHUSDT:
                {infra: "USD", supra: "ETH"},
            EVXBTC:
                {infra: "BTC", supra: "EVX"},
            EVXETH:
                {infra: "ETH", supra: "EVX"},
            FUELBTC:
                {infra: "BTC", supra: "FUEL"},
            FUELETH:
                {infra: "ETH", supra: "FUEL"},
            FUNBTC:
                {infra: "BTC", supra: "FUN"},
            FUNETH:
                {infra: "ETH", supra: "FUN"},
            GASBTC:
                {infra: "BTC", supra: "GAS"},
            GTOBNB:
                {infra: "BNB", supra: "GTO"},
            GTOBTC:
                {infra: "BTC", supra: "GTO"},
            GTOETH:
                {infra: "ETH", supra: "GTO"},
            GVTBTC:
                {infra: "BTC", supra: "GVT"},
            GVTETH:
                {infra: "ETH", supra: "GVT"},
            GXSBTC:
                {infra: "BTC", supra: "GXS"},
            GXSETH:
                {infra: "ETH", supra: "GXS"},
            HSRBTC:
                {infra: "BTC", supra: "HSR"},
            HSRETH:
                {infra: "ETH", supra: "HSR"},
            ICNBTC:
                {infra: "BTC", supra: "ICN"},
            ICNETH:
                {infra: "ETH", supra: "ICN"},
            ICXBNB:
                {infra: "BNB", supra: "ICX"},
            ICXBTC:
                {infra: "BTC", supra: "ICX"},
            ICXETH:
                {infra: "ETH", supra: "ICX"},
            INSBTC:
                {infra: "BTC", supra: "INS"},
            INSETH:
                {infra: "ETH", supra: "INS"},
            IOSTBTC:
                {infra: "BTC", supra: "IOST"},
            IOSTETH:
                {infra: "ETH", supra: "IOST"},
            IOTABNB:
                {infra: "BNB", supra: "IOTA"},
            IOTABTC:
                {infra: "BTC", supra: "IOTA"},
            IOTAETH:
                {infra: "ETH", supra: "IOTA"},
            KMDBTC:
                {infra: "BTC", supra: "KMD"},
            KMDETH:
                {infra: "ETH", supra: "KMD"},
            KNCBTC:
                {infra: "BTC", supra: "KNC"},
            KNCETH:
                {infra: "ETH", supra: "KNC"},
            LENDBTC:
                {infra: "BTC", supra: "LEND"},
            LENDETH:
                {infra: "ETH", supra: "LEND"},
            LINKBTC:
                {infra: "BTC", supra: "LINK"},
            LINKETH:
                {infra: "ETH", supra: "LINK"},
            LRCBTC:
                {infra: "BTC", supra: "LRC"},
            LRCETH:
                {infra: "ETH", supra: "LRC"},
            LSKBNB:
                {infra: "BNB", supra: "LSK"},
            LSKBTC:
                {infra: "BTC", supra: "LSK"},
            LSKETH:
                {infra: "ETH", supra: "LSK"},
            LTCBNB:
                {infra: "BNB", supra: "LTC"},
            LTCBTC:
                {infra: "BTC", supra: "LTC"},
            LTCETH:
                {infra: "ETH", supra: "LTC"},
            LTCUSDT:
                {infra: "USD", supra: "LTC"},
            LUNBTC:
                {infra: "BTC", supra: "LUN"},
            LUNETH:
                {infra: "ETH", supra: "LUN"},
            MANABTC:
                {infra: "BTC", supra: "MANA"},
            MANAETH:
                {infra: "ETH", supra: "MANA"},
            MCOBNB:
                {infra: "BNB", supra: "MCO"},
            MCOBTC:
                {infra: "BTC", supra: "MCO"},
            MCOETH:
                {infra: "ETH", supra: "MCO"},
            MDABTC:
                {infra: "BTC", supra: "MDA"},
            MDAETH:
                {infra: "ETH", supra: "MDA"},
            MODBTC:
                {infra: "BTC", supra: "MOD"},
            MODETH:
                {infra: "ETH", supra: "MOD"},
            MTHBTC:
                {infra: "BTC", supra: "MTH"},
            MTHETH:
                {infra: "ETH", supra: "MTH"},
            MTLBTC:
                {infra: "BTC", supra: "MTL"},
            MTLETH:
                {infra: "ETH", supra: "MTL"},
            NANOBNB:
                {infra: "BNB", supra: "NANO"},
            NANOBTC:
                {infra: "BTC", supra: "NANO"},
            NANOETH:
                {infra: "ETH", supra: "NANO"},
            NAVBNB:
                {infra: "BNB", supra: "NAV"},
            NAVBTC:
                {infra: "BTC", supra: "NAV"},
            NAVETH:
                {infra: "ETH", supra: "NAV"},
            NEBLBNB:
                {infra: "BNB", supra: "NEBL"},
            NEBLBTC:
                {infra: "BTC", supra: "NEBL"},
            NEBLETH:
                {infra: "ETH", supra: "NEBL"},
            NEOBNB:
                {infra: "BNB", supra: "NEO"},
            NEOBTC:
                {infra: "BTC", supra: "NEO"},
            NEOETH:
                {infra: "ETH", supra: "NEO"},
            NEOUSDT:
                {infra: "USD", supra: "NEO"},
            NULSBNB:
                {infra: "BNB", supra: "NULS"},
            NULSBTC:
                {infra: "BTC", supra: "NULS"},
            NULSETH:
                {infra: "ETH", supra: "NULS"},
            OAXBTC:
                {infra: "BTC", supra: "OAX"},
            OAXETH:
                {infra: "ETH", supra: "OAX"},
            OMGBTC:
                {infra: "BTC", supra: "OMG"},
            OMGETH:
                {infra: "ETH", supra: "OMG"},
            OSTBNB:
                {infra: "BNB", supra: "OST"},
            OSTBTC:
                {infra: "BTC", supra: "OST"},
            OSTETH:
                {infra: "ETH", supra: "OST"},
            PIVXBNB:
                {infra: "BNB", supra: "PIVX"},
            PIVXBTC:
                {infra: "BTC", supra: "PIVX"},
            PIVXETH:
                {infra: "ETH", supra: "PIVX"},
            POEBTC:
                {infra: "BTC", supra: "POE"},
            POEETH:
                {infra: "ETH", supra: "POE"},
            POWRBNB:
                {infra: "BNB", supra: "POWR"},
            POWRBTC:
                {infra: "BTC", supra: "POWR"},
            POWRETH:
                {infra: "ETH", supra: "POWR"},
            PPTBTC:
                {infra: "BTC", supra: "PPT"},
            PPTETH:
                {infra: "ETH", supra: "PPT"},
            QSPBNB:
                {infra: "BNB", supra: "QSP"},
            QSPBTC:
                {infra: "BTC", supra: "QSP"},
            QSPETH:
                {infra: "ETH", supra: "QSP"},
            QTUMBTC:
                {infra: "BTC", supra: "QTUM"},
            QTUMETH:
                {infra: "ETH", supra: "QTUM"},
            RCNBNB:
                {infra: "BNB", supra: "RCN"},
            RCNBTC:
                {infra: "BTC", supra: "RCN"},
            RCNETH:
                {infra: "ETH", supra: "RCN"},
            RDNBNB:
                {infra: "BNB", supra: "RDN"},
            RDNBTC:
                {infra: "BTC", supra: "RDN"},
            RDNETH:
                {infra: "ETH", supra: "RDN"},
            REQBTC:
                {infra: "BTC", supra: "REQ"},
            REQETH:
                {infra: "ETH", supra: "REQ"},
            RLCBNB:
                {infra: "BNB", supra: "RLC"},
            RLCBTC:
                {infra: "BTC", supra: "RLC"},
            RLCETH:
                {infra: "ETH", supra: "RLC"},
            SALTBTC:
                {infra: "BTC", supra: "SALT"},
            SALTETH:
                {infra: "ETH", supra: "SALT"},
            SNGLSBTC:
                {infra: "BTC", supra: "SNGLS"},
            SNGLSETH:
                {infra: "ETH", supra: "SNGLS"},
            SNMBTC:
                {infra: "BTC", supra: "SNM"},
            SNMETH:
                {infra: "ETH", supra: "SNM"},
            SNTBTC:
                {infra: "BTC", supra: "SNT"},
            SNTETH:
                {infra: "ETH", supra: "SNT"},
            STEEMBNB:
                {infra: "BNB", supra: "STEEM"},
            STEEMBTC:
                {infra: "BTC", supra: "STEEM"},
            STEEMETH:
                {infra: "ETH", supra: "STEEM"},
            STORJBTC:
                {infra: "BTC", supra: "STORJ"},
            STORJETH:
                {infra: "ETH", supra: "STORJ"},
            STRATBTC:
                {infra: "BTC", supra: "STRAT"},
            STRATETH:
                {infra: "ETH", supra: "STRAT"},
            SUBBTC:
                {infra: "BTC", supra: "SUB"},
            SUBETH:
                {infra: "ETH", supra: "SUB"},
            TNBBTC:
                {infra: "BTC", supra: "TNB"},
            TNBETH:
                {infra: "ETH", supra: "TNB"},
            TNTBTC:
                {infra: "BTC", supra: "TNT"},
            TNTETH:
                {infra: "ETH", supra: "TNT"},
            TRIGBNB:
                {infra: "BNB", supra: "TRIG"},
            TRIGBTC:
                {infra: "BTC", supra: "TRIG"},
            TRIGETH:
                {infra: "ETH", supra: "TRIG"},
            TRXBTC:
                {infra: "BTC", supra: "TRX"},
            TRXETH:
                {infra: "ETH", supra: "TRX"},
            VENBNB:
                {infra: "BNB", supra: "VEN"},
            VENBTC:
                {infra: "BTC", supra: "VEN"},
            VENETH:
                {infra: "ETH", supra: "VEN"},
            VIABNB:
                {infra: "BNB", supra: "VIA"},
            VIABTC:
                {infra: "BTC", supra: "VIA"},
            VIAETH:
                {infra: "ETH", supra: "VIA"},
            VIBBTC:
                {infra: "BTC", supra: "VIB"},
            VIBEBTC:
                {infra: "BTC", supra: "VIBE"},
            VIBEETH:
                {infra: "ETH", supra: "VIBE"},
            VIBETH:
                {infra: "ETH", supra: "VIB"},
            WABIBNB:
                {infra: "BNB", supra: "WABI"},
            WABIBTC:
                {infra: "BTC", supra: "WABI"},
            WABIETH:
                {infra: "ETH", supra: "WABI"},
            WAVESBNB:
                {infra: "BNB", supra: "WAVES"},
            WAVESBTC:
                {infra: "BTC", supra: "WAVES"},
            WAVESETH:
                {infra: "ETH", supra: "WAVES"},
            WINGSBTC:
                {infra: "BTC", supra: "WINGS"},
            WINGSETH:
                {infra: "ETH", supra: "WINGS"},
            WTCBNB:
                {infra: "BNB", supra: "WTC"},
            WTCBTC:
                {infra: "BTC", supra: "WTC"},
            WTCETH:
                {infra: "ETH", supra: "WTC"},
            XLMBNB:
                {infra: "BNB", supra: "XLM"},
            XLMBTC:
                {infra: "BTC", supra: "XLM"},
            XLMETH:
                {infra: "ETH", supra: "XLM"},
            XMRBTC:
                {infra: "BTC", supra: "XMR"},
            XMRETH:
                {infra: "ETH", supra: "XMR"},
            XRPBTC:
                {infra: "BTC", supra: "XRP"},
            XRPETH:
                {infra: "ETH", supra: "XRP"},
            XVGBTC:
                {infra: "BTC", supra: "XVG"},
            XVGETH:
                {infra: "ETH", supra: "XVG"},
            XZCBNB:
                {infra: "BNB", supra: "XZC"},
            XZCBTC:
                {infra: "BTC", supra: "XZC"},
            XZCETH:
                {infra: "ETH", supra: "XZC"},
            YOYOBNB:
                {infra: "BNB", supra: "YOYO"},
            YOYOBTC:
                {infra: "BTC", supra: "YOYO"},
            YOYOETH:
                {infra: "ETH", supra: "YOYO"},
            ZECBTC:
                {infra: "BTC", supra: "ZEC"},
            ZECETH:
                {infra: "ETH", supra: "ZEC"},
            ZRXBTC:
                {infra: "BTC", supra: "ZRX"},
            ZRXETH:
                {infra: "ETH", supra: "ZRX"},
        },
        kraken: {
            XREPXXBT: {infra: "BTC", supra: "REP"},
            XICNXXBT: {infra: "BTC", supra: "ICN"},
            XXDGXXBT: {infra: "BTC", supra: "DOGE"},
            XZECXXBT: {infra: "BTC", supra: "ZEC"},
            XETCXXBT: {infra: "BTC", supra: "ETC"},
            USDTZUSD: {infra: "USD", supra: "USD"},
            XXRPZUSD: {infra: "USD", supra: "XRP"},
            GNOXBT: {infra: "BTC", supra: "GNO"},
            EOSXBT: {infra: "BTC", supra: "EOS"},
            XXRPXXBT: {infra: "BTC", supra: "XRP"},
            XZECZUSD: {infra: "USD", supra: "ZEC"},
            XETHZUSD: {infra: "USD", supra: "ETH"},
            XXBTZCAD: {infra: "CAD", supra: "BTC"},
            XMLNXXBT: {infra: "BTC", supra: "MLN"},
            DASHUSD: {infra: "USD", supra: "DASH"},
            XXMRXXBT: {infra: "BTC", supra: "XMR"},
            BCHXBT: {infra: "BTC", supra: "BCH"},
            XETCZUSD: {infra: "USD", supra: "ETC"},
            XETHXXBT: {infra: "BTC", supra: "ETH"},
            XXLMXXBT: {infra: "BTC", supra: "XLM"},
            XXMRZUSD: {infra: "USD", supra: "XMR"},
            XLTCXXBT: {infra: "BTC", supra: "LTC"},
            XXBTZUSD: {infra: "USD", supra: "BTC"},
            BCHUSD: {infra: "USD", supra: "BCH"},
            XLTCZUSD: {infra: "USD", supra: "LTC"},
            DASHXBT: {infra: "XBT", supra: "DASH"}
        }

    }


    brokersLinks = {
        "binance": {
            twitter_main: 'binance_2017',

            trade_screen: "https://www.binance.com/trade.html?symbol=",
            trade_screen_sep: "_",
            dbcode: "bin",
            signup: "https://www.binance.com/register.html",
            api: "https://www.binance.com/userCenter/createApi.html",
            infras: ['BTC', 'ETH', 'BNB', 'USDT'],
            ignoredPairs: ['123456'],
            fees: {
                withdraw: {
                    BTC: 0.001,
                    ETH: 0.01,
                    BCH: 0.001,
                    XRP: 0.25,
                    BTG: 0.001
                },
                trading: {
                    pc: 0.001
                },
                deposit: 0

            }
        },
        "kraken": {
            twitter_main: 'krakenfx',
            twitter_support: 'krakensupport',
            trade_screen: "https://trade.kraken.com/kraken/",
            trade_screen_sep: "",
            dbcode: "kra",
            api: "https://www.kraken.com/u/settings/api",
            signup: "https://www.kraken.com/en-us/signup",
            infras: ['USD', 'EUR', 'ETH', 'CAD', 'XBT', 'JPY', 'GBP'],
            ignoredPairs: []
        }, "hitbtc": {
            twitter_main: 'hitbtc',
            trade_screen: "https://hitbtc.com/exchange/",
            trade_screen_sep: "-to-",
            dbcode: "hit",
            api: "https://hitbtc.com/settings/api-keys",
            signup: "https://hitbtc.com/signupapp",
            infras: ['BTC', 'ETH', 'BNB', 'USD', 'USDT'],
            ignoredPairs: [],
            fees: {
                withdraw: {
                    BTC: 0.001,
                    ETH: 0.00958,
                    BCH: 0.0018,
                    XRP: 0.509,
                    BTG: 0.0005
                },
                trading: {
                    pc: 0.001

                },
                deposit: 0

            }
        }, "bitmex": {
            twitter_main: "BitMEXdotcom",
            dbcode: "bmx",
            api: "https://www.bitmex.com/app/apiKeys",
            signup: "https://www.bitmex.com/register",
            infras: ['BTC', 'ETH', 'BNB', 'USD', 'USDT'],
            ignoredPairs: []
        }, "bitfinex": {
            twitter_main: "bitfinex",
            dbcode: "bfn",
            api: "https://www.bitfinex.com",
            signup: "https://www.bitfinex.com",
            infras: ['BTC', 'ETH', 'BNB', 'USD', 'USDT'],
            ignoredPairs: []
            trade_screen: "https://www.bitfinex.com/t/",
            trade_screen_sep: ":",
        }, "kucoin": {
            twitter_main: "kucoincom",
            trade_screen: "https://www.kucoin.com/#/trade.pro/",
            trade_screen_sep: "_",
            dbcode: "kuc",
            api: "",
            signup: "https://www.kucoin.com/#/signup",
            infras: ['BTC', 'ETH', 'BNB', 'USD', 'USDT'],
            ignoredPairs: [],
            fees: {
                withdraw: {
                    BTC: 0.001,
                    ETH: 0.00958,
                    BCH: 0.0018,
                    XRP: 0.509,
                    BTG: 0.0005
                },
                trading: {
                    pc: 0.001

                },
                deposit: 0
            }
        }, "cryptopia": {
            twitter_main: "Cryptopia_NZ",
            trade_screen: "https://www.cryptopia.co.nz/Exchange/?market=",
            trade_screen_sep: "_",
            dbcode: "cry",
            api: "",
            signup: "https://www.cryptopia.co.nz/Register",
            infras: ['BTC', 'ETH', 'NZDT', 'DOGE', 'USD', 'USDT'],
            ignoredPairs: [],
            fees: {
                withdraw: {
                    BTC: 0.001,
                    ETH: 0.00958,
                    BCH: 0.0018,
                    XRP: 0.509,
                    BTG: 0.0005
                },
                trading: {
                    pc: 0.001

                },
                deposit: 0
            }
        }
    }
    ohlcColors = {
        orange: {
            lineColor: '#3e91a0',
            color: '#b18215',
            upColor: 'transparent',
            downColor: '#b18215'
        }
        , redgreen: {
            lineColor: '#3e91a0',
            color: '#b11a00',
            upColor: '#63c55b',
            downColor: '#b18215'
        },


        spec: {
            lineColor: '#becbcc',
            color: '#b12400',
            upColor: '#46c53e',
            downColor: '#b11c11'
        }

    }
    ;


    values = ["BTC", "ETH", "BCH", "XRP", "DASH", "XMR", "LTC", "ZEC"]
    valuesandglobal = ["GLOBAL"]
    formats = ["chart", "numeric"]
    listing = {
        GLOBA: {name: "Global", price: [], marketcap: ["aken"]},
        BTC: {name: "Bitcoin", price: ["kraken"], marketcap: ["cmc"]},
        ETH: {name: "Ethereum", price: ["kraken"], marketcap: ["cmc"]},
        XRP: {name: "Ripple", price: ["kraken"], marketcap: ["cmc"]},
        ZEC: {name: "ZCash", price: ["kraken"], marketcap: ["cmc"]},
        DASH: {name: "Dash", price: ["kraken"], marketcap: ["cmc"]},
        XMR: {name: "Monero", price: ["kraken"], marketcap: ["cmc"]},
        LTC: {name: "LiteCoin", price: ["kraken"], marketcap: ["cmc"]}
    }
    bases = ["USD", "EUR"]
    intervals = [1, 5, 15, 30, 60, 240, 1440]
    intervalNames = {1: "1m", 5: "5m", 15: "15m", 30: "30m", 60: "1H", 240: "4H", 1440: "1D"}
    sources = {kraken: "kraken.com", "ccc": "cryptocurrencychart.com", "cmc": "coinmarketcap.com"}
    lastNames = {"last24h": "Last day", "last7d": "Last week", "last30d": "Last month"}
    times = ["last24h", "last7d", "last30d"]
    widgetConfig = {
        "PRICE_CHANGE": {time: true, symbol: true},
        "VOLUME_CHANGE": {time: true, symbol: true},
        "LATEST_NEWS": {time: false, symbol: true},
        "LATEST_TWEETS": {time: false, symbol: true},
        "CHART_MARKETCAP": {time: false, symbol: true},
        "CHART_PRICE": {time: false, symbol: true},
        "CHART_VOLUME": {time: false, symbol: true},
        "RANKING_MARKETCAP": {time: false, symbol: false},
        "PERF_LASTWEEK": {time: false, symbol: true, format: true},
        "EVOL_MARKETCAP_MINI": {time: true, symbol: false},
        "BITCOIN_DOMINANCE": {time: false, symbol: false},
        "TOP_ENTRIES": {time: false, symbol: false}
    }
    specialPanels = [{id: 'SP_LISTING', type: "special", title: "Listing"}, {
        id: 'SP_SEPARATOR',
        type: "separator",
        title: "Separator"
    }]
    specialLinks = {'SP_LISTING': "/listing"}
    widgets = [
        {
            code: "PRICE_CHANGE",
            title: "Price change",
            size: "1x1",
            id: 1,

        }, {
            title: "Volume change",
            code: "VOLUME_CHANGE",


            size: "1x1",
            id: 2
        }, {
            title: "Latest news",
            code: "LATEST_NEWS",
            size: "2x4",
            id: 3
        }, {
            title: "Latest tweets",
            code: "LATEST_TWEETS",
            size: "2x4",
            id: 4
        }, {
            title: "Market Cap Chart",
            code: "CHART_MARKETCAP",
            size: "4x4",
            id: 5
        }, {
            title: "Volume Chart",
            code: "CHART_VOLUME",
            size: "4x4",
            id: 7
        }, {
            title: "Price Chart",
            code: "CHART_PRICE",
            size: "4x4",
            id: 6
        }, {
            title: "Market cap rankings",
            code: "RANKING_MARKETCAP",
            size: "4x2",
            id: 8
        }, {
            title: "Market cap evol",
            code: "EVOL_MARKETCAP_MINI",
            size: "1x2",
            id: 9
        }, {
            title: "Perf last week",
            code: "PERF_LASTWEEK",
            size: "1x4",
            id: 10
        }, {
            title: "Bitcoin Dominance",
            code: "BITCOIN_DOMINANCE",
            size: "1x1",
            id: 11
        }, {
            title: "Top entries",
            code: "TOP_ENTRIES",
            size: "1x1",
            id: 11
        }
    ];

    generateListing() {
        this.valuesandglobal.push.apply(this.valuesandglobal, this.values)
    }

    getDbCode(broker) {
        return this.brokersLinks[broker].dbcode;
    }

    getFeesPerBroker(broker) {
        return this.brokersLinks[broker].fees;
    }

    getPossibleInfrasPerBroker(b: string): string[] {
        Assert.exists(b)
        if (b)
            return this.brokersLinks[b].infras
        else
            return []
    }

    getIgnoredPairsPerBroker(b: string): string[] {
        Assert.exists(b)
        if (b)
            return this.brokersLinks[b].ignoredPairs
        else return []
    }

    getTradeScreen(broker: string, pair: string): string {

        console.log("open", broker, pair);

        let p = this.infrasuprainv[broker][pair];
        if (!p) {
            console.error("err pair", pair, "not found in infrasuprainv");
            return
        }
        let infra = p.infra;
        let supra = p.supra;
        let l = this.brokersLinks[broker].trade_screen + supra + this.brokersLinks[broker].trade_screen_sep + infra;
        return l
    }

    getPairCommonName(broker: string, paircode, sep: string = "") {
        if (!(broker in this.infrasuprainv)) return "**" + paircode
        if (!(paircode in this.infrasuprainv[broker])) return "**" + paircode;
        let str = this.infrasuprainv[broker][paircode];
        return str.supra + sep + str.infra;
    }
    getPairInfraSupra(broker: string, paircode) {
        if (!(broker in this.infrasuprainv)) return "**" + paircode
        if (!(paircode in this.infrasuprainv[broker])) return "**" + paircode;
        let str = this.infrasuprainv[broker][paircode];
        return str
    }

    getPairRawName(broker: string, paircode) {
        if (!(broker in this.infrasuprainv)) return "**" + paircode
        if (!(paircode in this.infrasuprainv[broker])) return "**" + paircode;
        let str = this.infrasuprainv[broker][paircode];

        return this.infrasupra[str.infra][str.supra][broker];
    }

    getTwitterMain(broker) {
        if (broker in this.brokersLinks)
            return this.brokersLinks[broker].twitter_main
    }
}
