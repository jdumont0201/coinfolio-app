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
        this.apiService.setApiUrl("http://user.coinamics.io/api/");
        this.apiService.setServerUrl("http://user.coinamics.io/");
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

    possibleBrokers: string[] = ["binance", "hitbtc", "kucoin", "kraken"]

    generateInfraSupra() {
        let res = {};
        let allc = {}
        for (let broker in this.infrasuprainv) {
            for (let pair in this.infrasuprainv[broker]) {
                let v = this.infrasuprainv[broker][pair];
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
        console.log("infrasupra", res);
        this.infrasupra = res;
    }

    allcryptos = [];
    infrasupra = {}
    infrasuprainv = {
        kucoin: {

            ACTBCH:
                {infra: "BCH", supra: "ACT"},
            ACTBTC:
                {infra: "BTC", supra: "ACT"},
            ACTETH:
                {infra: "ETH", supra: "ACT"},
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
            XREPXXBT: {infra: "BTC", supra: "XRP"},
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
            DASHXBT: {infra: "USD", supra: "DASH"}
        }

    }


    brokersLinks = {
        "binance": {
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
            dbcode: "kra",
            api: "https://www.kraken.com/u/settings/api",
            signup: "https://www.kraken.com/en-us/signup",
            infras: ['USD', 'EUR', 'ETH', 'CAD', 'XBT', 'JPY', 'GBP'],
            ignoredPairs: []
        }, "hitbtc": {
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
            dbcode: "bmx",
            api: "https://www.bitmex.com/app/apiKeys",
            signup: "https://www.bitmex.com/register",
            infras: ['BTC', 'ETH', 'BNB', 'USD', 'USDT'],
            ignoredPairs: []
        }, "kucoin": {
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
        let infra = p.infra;
        let supra = p.supra;
        let l = this.brokersLinks[broker].trade_screen + supra + this.brokersLinks[broker].trade_screen_sep + infra;
        return l
    }

    getPairCommonName(broker: string, paircode) {
        if (!(broker in this.infrasuprainv)) return "**" + paircode
        if (!(paircode in this.infrasuprainv[broker])) return "**" + paircode;
        let str = this.infrasuprainv[broker][paircode];
        return str.supra + "/" + str.infra;
    }
}
