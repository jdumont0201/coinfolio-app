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
                if(!res) return
                this.authService.paymentExpiration = res.expiration;
                console.log("active", this.authService.isSubscriptionActive(), this.authService.authenticated, this.authService.paymentExpiration, this.authService.paymentExpiration > new Date().getTime() / 1000)
            })

    }

    isCustomDashboardEnabled = false;

    possibleBrokers: string[] = ["binance",  "hitbtc","kucoin"]


    infrasupra = {
        BTC: {
            USD: {
                binance: "BTCUSDT",
                hitbtc: "BTCUSD"
            }
        },

        LTC: {
            USD: {
                binance: "LTCUSDT",
                hitbtc: "LTCUSD"
            }
        },
        ADX: {
            BTC: {
                binance: "ADXBTC",
                hitbtc: "ADXBTC",
            }
        },
        ARN: {
            BTC: {
                binance: "ARNBTC",
                hitbtc: "ARNBTC",
            },
            ETH: {
                binance: "ARNETH",
                hitbtc: "ARNETH",
            },

        },
        BCH: {
            BTC: {
                binance: "BCCBTC",
                hitbtc: "BCHBTC",
            }, USD: {
                binance: "BCCUSDT",
                hitbtc: "BCHUSD",
            }, ETH: {
                binance: "BCCETH",
                hitbtc: "BCHETH",
            }

        },
        BNT: {
            BTC: {
                binance: "BNTBTC",
                hitbtc: "BNTBTC",
            }
        },
        BTG: {
            ETH: {
                binance: "BTGETH",
                hitbtc: "BTGETH",
            }
        },
        CDT: {
            BTC: {
                binance: "CDTBTC",
                hitbtc: "CDTBTC",
            }
        },
        CHAT: {
            ETH: {
                binance: "CHATETH",
                hitbtc: "CHATETH",
            }
        },
        CND: {
            BTC: {
                binance: "CNDBTC",
                hitbtc: "CNDBTC",
            }, ETH: {
                binance: "CNDETH",
                hitbtc: "CNDETH",
            }
        },
        CTR: {
            BTC: {
                binance: "CTRBTC",
                hitbtc: "CTRBTC",
            }, ETH: {
                binance: "CTRETH",
                hitbtc: "CTRETH",
            }
        },
        DASH: {
            BTC: {
                binance: "DASHBTC",
                hitbtc: "DASHBTC",
            }, ETH: {
                binance: "DASHETH",
                hitbtc: "DASHETH",
            }
        },
        DGD: {
            BTC: {
                binance: "DGDBTC",
                hitbtc: "DGDBTC",
            }
        },
        DNT: {
            BTC: {
                binance: "DNTBTC",
                hitbtc: "DNTBTC",
            }
        },
        DLT: {
            BTC: {
                binance: "DLTBTC",
                hitbtc: "DLTBTC",
            }
        },
        EDO: {
            BTC: {
                binance: "EDOBTC",
                hitbtc: "EDOBTC",
            }, ETH: {
                binance: "EDOETH",
                hitbtc: "EDOETH",
            },
        },
        ENG: {
            ETH: {
                binance: "ENGETH",
                hitbtc: "ENGETH",
            }
        },
        ENJ: {
            BTC: {
                binance: "ENJBTC",
                hitbtc: "ENJBTC",
            }
        },
        EOS: {
            BTC: {
                binance: "EOSBTC",
                hitbtc: "EOSBTC",
            }, ETH: {
                binance: "EOSETH",
                hitbtc: "EOSETH",
            },
        },
        ETC: {
            BTC: {
                binance: "ETCBTC",
                hitbtc: "ETCBTC",
            }, ETH: {
                binance: "ETCETH",
                hitbtc: "ETCETH",
            },
        },
        ETH: {
            USD: {
                binance: "ETHUSDT",
                hitbtc: "ETHUSD"
            }, BTC: {
                binance: "ETHBTC",
                hitbtc: "ETHBTC"
            }
        }, EVX: {
            BTC: {
                binance: "EVXBTC",
                hitbtc: "EVXBTC",
            }, ETH: {
                binance: "EVXETH",
                hitbtc: "EVXETH",
            },
        }, FUEL: {
            BTC: {
                binance: "FUELBTC",
                hitbtc: "FUELBTC",
            }, ETH: {
                binance: "FUELETH",
                hitbtc: "FUELETH",
            },
        }, FUN: {
            BTC: {
                binance: "FUNBTC",
                hitbtc: "FUNBTC",
            }, ETH: {
                binance: "FUNETH",
                hitbtc: "FUNETH",
            },
        }, GVT: {
            ETH: {
                binance: "GVTETH",
                hitbtc: "GVTETH",
            },
        }, HSR: {
            BTC: {
                binance: "HSRBTC",
                hitbtc: "HSRBTC",
            },
        }, ICN: {
            BTC: {
                binance: "ICNBTC",
                hitbtc: "ICNBTC",
            }
        }, ICX: {
            BTC: {
                binance: "ICXBTC",
                hitbtc: "ICXBTC",
            }, ETH: {
                binance: "ICXETH",
                hitbtc: "ICXETH",
            },
        }, KMD: {
            BTC: {
                binance: "KMDBTC",
                hitbtc: "KMDBTC",
            }, ETH: {
                binance: "KMDETH",
                hitbtc: "KMDETH",
            },
        }, LEND: {
            BTC: {
                binance: "LENDBTC",
                hitbtc: "LENDBTC",
            }, ETH: {
                binance: "LENDETH",
                hitbtc: "LENDETH",
            },
        }, LRC: {
            BTC: {
                binance: "LRCBTC",
                hitbtc: "LRCBTC",
            }, ETH: {
                binance: "LRCETH",
                hitbtc: "LRCETH",
            },
        }, LUN: {
            BTC: {
                binance: "LUNBTC",
                hitbtc: "LUNBTC",
            }
        }, MANA: {
            BTC: {
                binance: "MANABTC",
                hitbtc: "MANABTC",
            }, ETH: {
                binance: "MANAETH",
                hitbtc: "MANAETH",
            },
        }, MTH: {
            BTC: {
                binance: "MTHBTC",
                hitbtc: "MTHBTC",
            }
        },
        NEBL: {
            ETH: {
                binance: "NEBLETH",
                hitbtc: "NEBLETH",
            }
        }, NEO: {
            BTC: {
                binance: "NEOBTC",
                hitbtc: "NEOBTC",
            }, ETH: {
                binance: "NEOETH",
                hitbtc: "NEOETH"
            }, USD: {
                binance: "NEOUSDT",
                hitbtc: "NEOUSD"
            }
        }, OAX: {
            BTC: {
                binance: "OAXBTC",
                hitbtc: "OAXBTC",
            }, ETH: {
                binance: "OAXETH",
                hitbtc: "OAXETH",
            },
        },OMG: {
            ETH: {
                binance: "OMGETH",
                hitbtc: "OMGETH",
            },
        }, POE: {
            BTC: {
                binance: "POEBTC",
                hitbtc: "POEBTC",
            }, ETH: {
                binance: "POEETH",
                hitbtc: "POEETH",
            },
        },PPT: {
            ETH: {
                binance: "PPTETH",
                hitbtc: "PPTETH",
            },
        },QTUM: {
            BTC: {
                binance: "QTUMBTC",
                hitbtc: "QTUMBTC",
            },
        },RLC: {
            BTC: {
                binance: "RLCBTC",
                hitbtc: "RLCBTC",
            },
        },SNGLS: {
            BTC: {
                binance: "SNGLSBTC",
                hitbtc: "SNGLSBTC",
            },
        },SNT: {
            BTC: {
                binance: "SNTBTC",
                hitbtc: "SNTBTC",
            }, ETH: {
                binance: "SNTETH",
                hitbtc: "SNTETH",
            },
        } ,SNM: {
            ETH: {
                binance: "SNMETH",
                hitbtc: "SNMETH",
            },
        },STEEM: {
            BTC: {
                binance: "STEEMBTC",
                hitbtc: "STEEMBTC",
            },
        },STRAT: {
            BTC: {
                binance: "STRATBTC",
                hitbtc: "STRATBTC",
            }, ETH: {
                binance: "STRATETH",
                hitbtc: "STRATETH",
            },
        },SUB: {
            BTC: {
                binance: "SUBBTC",
                hitbtc: "SUBBTC",
            }, ETH: {
                binance: "SUBETH",
                hitbtc: "SUBETH",
            },
        },TNT: {
            BTC: {
                binance: "TNTBTC",
                hitbtc: "TNTBTC",
            }, ETH: {
                binance: "TNTETH",
                hitbtc: "TNTETH",
            },
        },TRX: {
            BTC: {
                binance: "TRXBTC",
                hitbtc: "TRXBTC",
            }, ETH: {
                binance: "TRXETH",
                hitbtc: "TRXETH",
            },
        },VEN: {
            BTC: {
                binance: "VENBTC",
                hitbtc: "VENBTC",
            }, ETH: {
                binance: "VENETH",
                hitbtc: "VENETH",
            },
        },VIB: {
            BTC: {
                binance: "VIBBTC",
                hitbtc: "VIBBTC",
            }, ETH: {
                binance: "VIBETH",
                hitbtc: "VIBETH",
            },
        },VIBE: {
            BTC: {
                binance: "VIBEBTC",
                hitbtc: "VIBEBTC",
            }
        },WAVES: {
            BTC: {
                binance: "WAVESBTC",
                hitbtc: "WAVESBTC",
            }
        },WINGS: {
            BTC: {
                binance: "WINGSBTC",
                hitbtc: "WINGSBTC",
            }
        },WTC: {
            BTC: {
                binance: "WTCBTC",
                hitbtc: "WTCBTC",
            }
        },XMR: {
            BTC: {
                binance: "XMRBTC",
                hitbtc: "XMRBTC",
            }, ETH: {
                binance: "XMRETH",
                hitbtc: "XMRETH",
            },
        },XRP: {
            BTC: {
                binance: "XRPBTC",
                hitbtc: "XRPBTC",
            }, ETH: {
                binance: "XRPETH",
                hitbtc: "XRPETH",
            },
        },XVG : {
            BTC: {
                binance: "XVGBTC",
                hitbtc: "XVGBTC",
            }, ETH: {
                binance: "XVGETH",
                hitbtc: "XVGETH",
            },
        },ZEC : {
            BTC: {
                binance: "ZECBTC",
                hitbtc: "ZECBTC",
            }
        },ZRC : {
            BTC: {
                binance: "ZRXBTC",
                hitbtc: "ZRXBTC",
            }, ETH: {
                binance: "ZRXETH",
                hitbtc: "ZRXETH",
            },
        },

    };
    infrasuprainv = {
        hitbtc: {

            ETHUSD: {infra: "USD", supra: "ETH"},
            LTCUSD: {infra: "USD", supra: "LTC"},

            ADXBTC: {infra: "BTC", supra: "ADX"},
            ARNBTC: {infra: "BTC", supra: "ARN"},
            ARNETH: {infra: "ETH", supra: "ARN"},

            BCHUSD: {infra: "USD", supra: "BCH"},
            BCHETH: {infra: "ETH", supra: "BCH"},
            BCHBTC: {infra: "BTC", supra: "BCH"},
            BNTBTC: {infra: "BTC", supra: "BNT"},
            BTCUSD: {infra: "USD", supra: "BTC"},
            BTGETH: {infra: "ETH", supra: "BTG"},

            CDTBTC: {infra: "BTC", supra: "CDT"},
            CHATETH: {infra: "ETH", supra: "CHAT"},
            CNDBTC: {infra: "BTC", supra: "CND"},
            CNDETH: {infra: "ETH", supra: "CND"},
            CTRETH: {infra: "ETH", supra: "CTR"},
            CTRBTC: {infra: "BTC", supra: "CTR"},


            DASHETH: {infra: "ETH", supra: "DASH"},
            DASHBTC: {infra: "BTC", supra: "DASH"},
            DGDBTC: {infra: "BTC", supra: "DGD"},
            DNTBTC: {infra: "BTC", supra: "DNT"},
            DLTBTC: {infra: "BTC", supra: "DLT"},

            EDOBTC: {infra: "BTC", supra: "EDO"},
            EDOETH: {infra: "ETH", supra: "EDO"},
            ENGETH: {infra: "ETH", supra: "ENG"},
            ENJBTC: {infra: "BTC", supra: "ENJ"},
            EOSBTC: {infra: "BTC", supra: "EOS"},
            EOSETH: {infra: "ETH", supra: "EOS"},
            ETCBTC: {infra: "BTC", supra: "ETC"},
            ETCETH: {infra: "ETH", supra: "ETC"},
            ETHBTC: {infra: "BTC", supra: "ETH"},
            ETHUSDT: {infra: "USD", supra: "ETH"},
            EVXBTC: {infra: "BTC", supra: "EVX"},
            EVXETH: {infra: "ETH", supra: "EVX"},
            FUELETH: {infra: "ETH", supra: "FUEL"},
            FUELBTC: {infra: "BTC", supra: "FUEL"},
            FUNETH: {infra: "ETH", supra: "FUN"},
            FUNBTC: {infra: "BTC", supra: "FUN"},

            GVTETH: {infra: "ETH", supra: "GVT"},

            HSRBTC: {infra: "BTC", supra: "HSR"},

            ICNBTC: {infra: "BTC", supra: "ICN"},
            ICXBTC: {infra: "BTC", supra: "ICX"},
            ICXETH: {infra: "ETH", supra: "ICX"},
            KMDETH: {infra: "ETH", supra: "KMD"},
            KMDBTC: {infra: "BTC", supra: "KMD"},
            LENDETH: {infra: "ETH", supra: "LEND"},
            LENDBTC: {infra: "BTC", supra: "LEND"},
            LRCETH: {infra: "ETH", supra: "LRC"},
            LRCBTC: {infra: "BTC", supra: "LRC"},
            LTCUSDT: {infra: "USD", supra: "LTC"},
            LTCBTC: {infra: "BTC", supra: "LTC"},
            LTCETH: {infra: "ETH", supra: "LTC"},
            LUNBTC: {infra: "BTC", supra: "LUN"},

            MANAETH: {infra: "ETH", supra: "MANA"},
            MANABTC: {infra: "BTC", supra: "MANA"},
            MTHBTC: {infra: "BTC", supra: "MTH"},

            NEBLETH: {infra: "ETH", supra: "NEBL"},
            NEOUSDT: {infra: "USD", supra: "NEO"},
            NEOBTC: {infra: "BTC", supra: "NEO"},
            NEOETH: {infra: "ETH", supra: "NEO"},

            OAXBTC: {infra: "BTC", supra: "OAX"},
            OAXETH: {infra: "ETH", supra: "OAX"},
            OMGETH: {infra: "ETH", supra: "OMG"},

            POEBTC: {infra: "BTC", supra: "POE"},
            POEETH: {infra: "ETH", supra: "POE"},
            PPTETH: {infra: "ETH", supra: "PPT"},

            QTUMBTC: {infra: "BTC", supra: "QTUM"},

            RLCBTC: {infra: "BTC", supra: "RLC"},

            SNGLSBTC: {infra: "BTC", supra: "SNGLS"},
            SNMETH: {infra: "ETH", supra: "SNM"},
            SNTBTC: {infra: "BTC", supra: "SNT"},
            SNTETH: {infra: "ETH", supra: "SNT"},
            STEEMBTC: {infra: "BTC", supra: "STEEM"},
            STRATBTC: {infra: "BTC", supra: "STRAT"},
            STRATETH: {infra: "ETH", supra: "STRAT"},
            SUBBTC: {infra: "BTC", supra: "SUB"},
            SUBETH: {infra: "ETH", supra: "SUB"},

            TNTBTC: {infra: "BTC", supra: "TNT"},
            TNTETH: {infra: "ETH", supra: "TNT"},
            TRXETH: {infra: "ETH", supra: "TRX"},
            TRXBTC: {infra: "BTC", supra: "TRX"},

            VENBTC: {infra: "BTC", supra: "VEN"},
            VENETH: {infra: "ETH", supra: "VEN"},
            VIBBTC: {infra: "BTC", supra: "VIB"},
            VIBEBTC: {infra: "BTC", supra: "VIBE"},
            VIBETH: {infra: "ETH", supra: "VIB"},

            WAVESBTC: {infra: "BTC", supra: "WAVES"},
            WINGSBTC: {infra: "BTC", supra: "WINGS"},
            WTCBTC: {infra: "BTC", supra: "WTC"},

            XMRBTC: {infra: "BTC", supra: "XMR"},
            XMRETH: {infra: "ETH", supra: "XMR"},
            XRPBTC: {infra: "BTC", supra: "XRP"},
            XRPETH: {infra: "ETH", supra: "XRP"},
            XVGETH: {infra: "ETH", supra: "XVG"},
            XVGBTC: {infra: "BTC", supra: "XVG"},
            ZECBTC: {infra: "BTC", supra: "ZEC"},
            ZRXBTC: {infra: "BTC", supra: "ZRX"},
            ZRXETH: {infra: "ETH", supra: "ZRX"}
        },
        binance: {


            ADXBTC: {infra: "BTC", supra: "ADX"},
            ARNBTC: {infra: "BTC", supra: "ARN"},
            ARNETH: {infra: "ETH", supra: "ARN"},

            BCCUSDT: {infra: "USD", supra: "BCH"},
            BCCETH: {infra: "ETH", supra: "BCH"},
            BCCBTC: {infra: "BTC", supra: "BCH"},
            BNTBTC: {infra: "BTC", supra: "BNT"},
            BTCUSDT: {infra: "USD", supra: "BTC"},
            BTGETH: {infra: "ETH", supra: "BTG"},

            CDTBTC: {infra: "BTC", supra: "CDT"},
            CHATETH: {infra: "ETH", supra: "CHAT"},
            CNDBTC: {infra: "BTC", supra: "CND"},
            CNDETH: {infra: "ETH", supra: "CND"},
            CTRETH: {infra: "ETH", supra: "CTR"},
            CTRBTC: {infra: "BTC", supra: "CTR"},

            DASHETH: {infra: "ETH", supra: "DASH"},
            DASHBTC: {infra: "BTC", supra: "DASH"},
            DGDBTC: {infra: "BTC", supra: "DGD"},
            DNTBTC: {infra: "BTC", supra: "DNT"},
            DLTBTC: {infra: "BTC", supra: "DLT"},

            EDOBTC: {infra: "BTC", supra: "EDO"},
            EDOETH: {infra: "ETH", supra: "EDO"},
            ENGETH: {infra: "ETH", supra: "ENG"},
            ENJBTC: {infra: "BTC", supra: "ENJ"},
            EOSBTC: {infra: "BTC", supra: "EOS"},
            EOSETH: {infra: "ETH", supra: "EOS"},
            ETCBTC: {infra: "BTC", supra: "ETC"},
            ETCETH: {infra: "ETH", supra: "ETC"},
            ETHBTC: {infra: "BTC", supra: "ETH"},
            ETHUSDT: {infra: "USD", supra: "ETH"},
            EVXBTC: {infra: "BTC", supra: "EVX"},
            EVXETH: {infra: "ETH", supra: "EVX"},
            FUELETH: {infra: "ETH", supra: "FUEL"},
            FUELBTC: {infra: "BTC", supra: "FUEL"},
            FUNETH: {infra: "ETH", supra: "FUN"},
            FUNBTC: {infra: "BTC", supra: "FUN"},

            GVTETH: {infra: "ETH", supra: "GVT"},

            HSRBTC: {infra: "BTC", supra: "HSR"},

            ICNBTC: {infra: "BTC", supra: "ICN"},
            ICXBTC: {infra: "BTC", supra: "ICX"},
            ICXETH: {infra: "ETH", supra: "ICX"},
            KMDETH: {infra: "ETH", supra: "KMD"},
            KMDBTC: {infra: "BTC", supra: "KMD"},
            LENDETH: {infra: "ETH", supra: "LEND"},
            LENDBTC: {infra: "BTC", supra: "LEND"},
            LRCETH: {infra: "ETH", supra: "LRC"},
            LRCBTC: {infra: "BTC", supra: "LRC"},
            LTCUSDT: {infra: "USD", supra: "LTC"},
            LTCBTC: {infra: "BTC", supra: "LTC"},
            LTCETH: {infra: "ETH", supra: "LTC"},
            LUNBTC: {infra: "BTC", supra: "LUN"},

            MANAETH: {infra: "ETH", supra: "MANA"},
            MANABTC: {infra: "BTC", supra: "MANA"},
            MTHBTC: {infra: "BTC", supra: "MTH"},

            NEBLETH: {infra: "ETH", supra: "NEBL"},
            NEOUSDT: {infra: "USD", supra: "NEO"},
            NEOBTC: {infra: "BTC", supra: "NEO"},
            NEOETH: {infra: "ETH", supra: "NEO"},

            OAXBTC: {infra: "BTC", supra: "OAX"},
            OAXETH: {infra: "ETH", supra: "OAX"},
            OMGETH: {infra: "ETH", supra: "OMG"},

            POEBTC: {infra: "BTC", supra: "POE"},
            POEETH: {infra: "ETH", supra: "POE"},
            PPTETH: {infra: "ETH", supra: "PPT"},

            QTUMBTC: {infra: "BTC", supra: "QTUM"},

            RLCBTC: {infra: "BTC", supra: "RLC"},

            SNGLSBTC: {infra: "BTC", supra: "SNGLS"},
            SNMETH: {infra: "ETH", supra: "SNM"},
            SNTBTC: {infra: "BTC", supra: "SNT"},
            SNTETH: {infra: "ETH", supra: "SNT"},
            STEEMBTC: {infra: "BTC", supra: "STEEM"},
            STRATBTC: {infra: "BTC", supra: "STRAT"},
            STRATETH: {infra: "ETH", supra: "STRAT"},
            SUBBTC: {infra: "BTC", supra: "SUB"},
            SUBETH: {infra: "ETH", supra: "SUB"},

            TNTBTC: {infra: "BTC", supra: "TNT"},
            TNTETH: {infra: "ETH", supra: "TNT"},
            TRXETH: {infra: "ETH", supra: "TRX"},
            TRXBTC: {infra: "BTC", supra: "TRX"},

            VENBTC: {infra: "BTC", supra: "VEN"},
            VENETH: {infra: "ETH", supra: "VEN"},
            VIBBTC: {infra: "BTC", supra: "VIB"},
            VIBEBTC: {infra: "BTC", supra: "VIBE"},
            VIBETH: {infra: "ETH", supra: "VIB"},

            WAVESBTC: {infra: "BTC", supra: "WAVES"},
            WINGSBTC: {infra: "BTC", supra: "WINGS"},
            WTCBTC: {infra: "BTC", supra: "WTC"},

            XMRBTC: {infra: "BTC", supra: "XMR"},
            XMRETH: {infra: "ETH", supra: "XMR"},
            XRPBTC: {infra: "BTC", supra: "XRP"},
            XRPETH: {infra: "ETH", supra: "XRP"},
            XVGETH: {infra: "ETH", supra: "XVG"},
            XVGBTC: {infra: "BTC", supra: "XVG"},
            ZECBTC: {infra: "BTC", supra: "ZEC"},
            ZRXBTC: {infra: "BTC", supra: "ZRX"},
            ZRXETH: {infra: "ETH", supra: "ZRX"}
        },
    }



    brokersLinks = {
        "binance": {
            dbcode:"bin",
            signup: "https://www.binance.com/register.html",
            api: "https://www.binance.com/userCenter/createApi.html",
            infras: ['BTC', 'ETH', 'BNB', 'USDT'],
            ignoredPairs: ['123456'],
            fees:{
                withdraw:{
                    BTC:0.001,
                    ETH:0.01,
                    BCH:0.001,
                    XRP:0.25,
                    BTG:0.001
                },
                trading:{
                    pc:0.001
                },
                deposit:0

            }
        },
        "kraken": {
            dbcode:"kra",
            api: "https://www.kraken.com/u/settings/api",
            signup: "https://www.kraken.com/en-us/signup",
            infras: ['USD', 'EUR','ETH', 'CAD', 'XBT', 'JPY', 'GBP'],
            ignoredPairs: []
        }, "hitbtc": {
            dbcode:"hit",
            api: "https://hitbtc.com/settings/api-keys",
            signup: "https://hitbtc.com/signupapp",
            infras: ['BTC', 'ETH', 'BNB', 'USD','USDT'],
            ignoredPairs: [],
            fees:{
                withdraw:{
                    BTC:0.001,
                    ETH:0.00958,
                    BCH:0.0018,
                    XRP:0.509,
                    BTG:0.0005
                },
                trading:{
                    pc:0.001

                },
                deposit:0

            }
        }, "bitmex": {
            dbcode:"bmx",
            api: "https://www.bitmex.com/app/apiKeys",
            signup: "https://www.bitmex.com/register",
            infras: ['BTC', 'ETH', 'BNB', 'USD','USDT'],
            ignoredPairs: []
        },"kucoin": {
            dbcode:"kuc",
            api: "",
            signup: "https://www.kucoin.com/#/signup",
            infras: ['BTC', 'ETH', 'BNB', 'USD','USDT'],
            ignoredPairs: [],
            fees:{
                withdraw:{
                    BTC:0.001,
                    ETH:0.00958,
                    BCH:0.0018,
                    XRP:0.509,
                    BTG:0.0005
                },
                trading:{
                    pc:0.001

                },
                deposit:0

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
    getDbCode(broker){
        return this.brokersLinks[broker].dbcode;
    }
    getFeesPerBroker(broker){
        return this.brokersLinks[broker].fees;
    }
    getPossibleInfrasPerBroker(b: string): string[] {
        Assert.exists(b)
        if(b)
        return this.brokersLinks[b].infras
        else
            return []
    }
    getIgnoredPairsPerBroker(b: string): string[] {
        Assert.exists(b)
        if(b)
        return this.brokersLinks[b].ignoredPairs
        else return []
    }

}
