import {Component, Injectable, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {RefreshedPage} from "../../lib/localton/components/RefreshedPage/component";
import {EventService} from "../../lib/localton/services/event.service";
import {CryptoPair} from "../../lib/localton/structures/Listing";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {MatTableDataSource, MatSort} from '@angular/material';
import {Structures} from "../../lib/globalton/core/utils/utils";
import {Tick} from "../../lib/localton/structures/Ticker";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-page-arbitrage',
    templateUrl: 'template.html'

})
@Injectable()
export class AppArbitragePage extends PageWithTabs implements OnInit, OnDestroy {
    listing = new Array();
    supports = {}
    brokerOptions = {}
    isLoading = true;

    displayedColumnsRef = ['pair', 'broker', 'change', 'bid', 'ask', 'spread', 'spreadpct'];

    showGraphs = false;
    canShow = [];
    sortby = "name"
    possibleSorts = ["name", "bid_ask_volume_ratio", "has_some_in_portfolio", "has_been_traded"]
    possiblePriceviews = ["crypto", "fiat", "crypto_and_fiat"]
    priceview = "both"

    maxVolume = {}

    searchedText = "";
    done = 0;
    searched = []
    filteredData;


    lastListing = {};
    indexes = {}
    filterValue = "";
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort) sort: MatSort;

    constructor(public refreshService: RefreshService, public requestService: RequestService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService, public cd: ChangeDetectorRef) {
        super(refreshService, eventService, consoleService)
        this.firstloadData();
        this.dataSource = new MatTableDataSource(this.listing);

    }

    initPossibleBrokers() {

    }

    ngOnInit() {
        this.doSubscribe("searchUpdatedEvent", this.eventService.searchUpdatedEvent, (val) => {
            this.searchUpdated(val)
        })
        this.doSubscribe("EnabledBrokersLoadingFinishedEvent", this.tradingService.EnabledBrokersLoadingFinishedEvent, (val) => {
            this.brokerLoaded(val)
            this.tradingService.enabledBrokers.forEach((b) => {
                let f = () => {
                    this.loadDataByBroker(b);
                }
                this.subscribeToRefresh(b + "-ticker", f, true)
                this.brokerOptions[b] = {active: true}
            })
        })
        this.tradingService.enabledBrokers.forEach((b) => {
            let f = () => {
                this.loadDataByBroker(b);
            }
            this.subscribeToRefresh(b + "-ticker", f, true)
            this.brokerOptions[b] = {active: true}
        })

    }

    ngOnDestroy() {
        this.unsubscribeAndStopAllRefresh()
        this.unsubscribeAllEvents()
        this.appConfigService.possibleBrokers.forEach((b) => {
            let key = "public-" + b + "-ticker";
            this.refreshService.createPool(key);
            this.refreshService.getPool(key).stop();
        });

    }

    brokerLoaded(val: { key: string, loaded: boolean }) {
        this.loadData()
    }

    refreshData() {
        this.isRefreshing = true;
        this.loadData()
    }

    firstloadData() {
        this.isLoading = true;

        this.cd.markForCheck();
        this.loadData()
    }

    searchCallback() {

    }


    searchUpdated(filterValue) {
        console.log("search filter", filterValue, this, this.dataSource)

        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterValue = filterValue
        this.dataSource.filter = filterValue;
    }

    addToSearch(word: string) {
        //console.log("add", word)
        for (let i = 0; i < this.listing.length; ++i) {
            let a: string = this.listing[i].pair.toLowerCase();
            let b: string = word.toLowerCase();
            if (a.indexOf(b) > -1) {
                this.searched.push(this.listing[i])
            }
        }
    }


    loadData() {
        console.log("loaddata");
        let loadFromPublic = true;
        if (loadFromPublic) {
            this.loadPublicData();
        } else {
            console.log("loaddata", this.tradingService.enabledBrokers)
            if (this.tradingService.enabledBrokers)
                this.tradingService.enabledBrokers.forEach((b) => {
                    this.loadDataByBroker(b)
                })
        }
    }

    loadPublicData() {
        console.log("loadpublic")
        this.appConfigService.possibleBrokers.forEach((b) => {
            //if(b=="binance") return;
            let key = "public-" + b + "-ticker";
            this.refreshService.createPool(key);
            this.refreshService.getPool(key).define(5000, () => {
                this.loadPublicDataByBroker(b, () => {
                    this.cd.markForCheck()
                })
            })
            this.refreshService.getPool(key).enable();
            this.loadPublicDataByBroker(b, () => {
                this.cd.markForCheck()
            })
            let key2 = "public-" + b + "-change";
            this.refreshService.createPool(key2);
            this.refreshService.getPool(key2).define(10000, () => {
                this.loadPublicChangeByBroker(b, () => {
                    this.cd.markForCheck()
                })
            })
            this.refreshService.getPool(key2).enable();
            this.loadPublicChangeByBroker(b, () => {
                this.cd.markForCheck()
            })
        })
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loadpublicdata", this.listing)
    }

    show(r) {
        console.log("rshow", r)
    }

    loadPublicChangeByBroker(b: string, f: Function) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        this.logic.getPublicChange(b, (res) => {
            for (let i in res) {
                if (!(i in this.infrasuprainv[b])) {

                } else {
                    let is = this.infrasuprainv[b][i];
                    let infra = is.infra;
                    let supra = is.supra;
                    const key = supra + infra;
                    const r = res[i];
                    if (b in this.indexes && r.pair in this.indexes[b]) { //already added
                        const j: number = this.indexes[b][r.pair];

                        if (b in this.listing[key]) {
                            let L = this.listing[key][b];
                            L.changelastprice = 100 * L.p / r.close - 100;
                        }

                    } else {

                    }
                }
            }
            this.cd.markForCheck();
            this.dataSource = new MatTableDataSource(this.listing)
            this.dataSource.filter = this.filterValue;
            this.dataSource.sort = this.sort;
            f();
        });
    }

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

    loadPublicDataByBroker(b: string, f: Function) {
        console.log("broi", b, this.infrasupra, this.infrasuprainv)
        if (!(b in this.indexes))
            this.indexes[b] = {}
        this.logic.getFromPublic(b, "bidask", (res) => {

                for (let i in res) {
                    //console.log("broi",b,this.infrasupra,this.infrasuprainv[b],i)
                    if (!(i in this.infrasuprainv[b])) {
                        //console.log("notfound");

                    } else {
                        let is = this.infrasuprainv[b][i];
                        let infra = is.infra;
                        let supra = is.supra;
                        const key = supra + infra;
                        const r = res[i];
                        const linew: Tick = {broker: b, pair: i, volume: r.volume, bid: parseFloat(r.bid), ask: parseFloat(r.ask), p: parseFloat(r.last)}
                        if (b in this.indexes && linew.pair in this.indexes[b]) { //already added
                            const j: number = this.indexes[b][linew.pair];
                            let LL = this.listing[key]
                            let L = LL.brokers[b];
                            if (linew.ask < L.cheapestask) {
                                L.cheapestaskname = b;
                            }
                            if (linew.bid > L.mostexpensivebid) {
                                L.mostexpensivebidname = b;
                            }
                            L.cheapestask = Math.min(L.cheapestask, linew.ask)
                            L.mostexpensivebid = Math.max(L.mostexpensivebid, linew.bid);
                            L.spread = L.mostexpensivebid - L.cheapestask;
                            if (L.bid != linew.bid)
                                L.oldbid = L.bid;
                            if (L.ask != linew.ask)
                                L.oldask = L.ask;
                            L.ask = linew.ask;
                            L.bid = linew.bid;
                            if (L.ask > 0 && L.bid > 0) {
                                L.spread = L.ask - L.bid;
                                L.spreadpct = 100 * L.spread / L.ask;
                            } else {
                                L.spread = null;
                                L.spreadpct = null;
                            }
                            L.p = linew.p;
                        } else {
                            this.indexes[b][linew.pair] = this.listing.length;
                            if (linew.ask > 0 && linew.bid > 0) {
                                linew.spread = linew.ask - linew.bid;
                            } else {
                                linew.spread = null;
                                linew.spreadpct = null;
                            }
                            linew.changelastprice = Math.random()
                            if (!(key in this.listing)) {
                                console.log("addkey", key, linew);
                                this.listing[key] = {cheapestask: linew.ask, cheapestaskname: b, mostexpensivebidname: b, spread: -1, mostexpensivebid: linew.bid, brokers: {}};
                                this.listing[key].brokers[b] = linew;
                            } else {
                                let L = this.listing[key];
                                if (linew.ask < L.cheapestask) {
                                    L.cheapestaskname = b;
                                }
                                if (linew.bid > L.mostexpensivebid) {
                                    L.mostexpensivebidname = b;
                                }
                                L.cheapestask = Math.min(L.cheapestask, linew.ask)
                                L.mostexpensivebid = Math.max(L.mostexpensivebid, linew.bid);
                                L.spread = L.mostexpensivebid - L.cheapestask;

                                this.listing[key].brokers[b] = linew;
                            }
                        }
                    }
                }
                this.sortListing();
                console.log("list", this.listing)

                f();
            }
        );
    }
    sortedListing=[];
sortListing(){
        let r=[];
        for(let k in this.listing){
            r.push({pair:k,spread:this.listing[k].spread/this.listing[k].cheapestask*100,list:this.listing[k]})
        }
        this.sortedListing=r.sort(function(a,b){
            let as=a.spread;
            let bs=b.spread;
            return bs-as;
        })

    console.log("thisso",this.sortedListing)
}
    changeSort() {
        console.log("changesort", this.sort)
        this.cd.markForCheck();
    }

    loadDataByBroker(b) {
        let B = this.tradingService.getBrokerByName(b);
        console.log("loaddata", b, B)
        if (!B) return;
        let L = B.getTicker().getList(this.sortby);//getList(this.sortby, "change");
        //update listing
        if (!(b in this.indexes))
            this.indexes[b] = {}
        L.forEach((li) => {
            if (b in this.indexes && li.pair in this.indexes[b]) { //already added
                let i = this.indexes[b][li.pair]
                this.listing[i] = li
            } else {
                this.indexes[b][li.pair] = this.listing.length;
                this.listing.push(li)
            }
        })
        this.maxVolume = B.getTicker().maxVolume;
        this.listing.forEach((l) => {
            if (l.infra && l.infra in this.maxVolume && l.volume) {
                l.relativeVolume = l.volume / this.maxVolume[l.infra];
            } else l.relativeVolume = -1
            this.supports[l.infra] = {symbol: l.infra, active: l.infra in this.supports ? (this.supports[l.infra].active) : true}
            this.brokerOptions[l.broker] = {active: l.broker in this.brokerOptions ? (this.brokerOptions[l.broker].active) : true}
        })
        //this.filterData()
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loaddata", this.listing)
    }

    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    filterData() {

        this.listing.forEach((l) => {
            let isBrokerSelected = this.brokerOptions[l.broker].active
            if (this.supports[l.infra].active)
                this.filteredData.push(l)
        })
        this.dataSource = new MatTableDataSource(this.filteredData);
    }


    canShowItem(index, s): boolean {
        return true
    }

    setGraphView() {
        this.showGraphs = !this.showGraphs
    }

    applyFilter(event) {
        console.log("target", event)
        let filterValue = event.target.value;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    getKeys(obj) {
        return Object.keys(obj)
    }
}
