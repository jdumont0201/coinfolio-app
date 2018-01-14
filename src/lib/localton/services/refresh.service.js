"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Pool = (function () {
    function Pool(name, refreshService, eventService, consoleService) {
        this.name = name;
        this.refreshService = refreshService;
        this.eventService = eventService;
        this.consoleService = consoleService;
        this.active = false;
        this.event = new core_1.EventEmitter();
        this.outcome = -1;
    }
    Pool.prototype.isReady = function () {
        return this.delay && this.f;
    };
    Pool.prototype.isEnabled = function () {
        return this.active;
    };
    Pool.prototype.enable = function () {
        var _this = this;
        if (this.active)
            return;
        this.consoleService.refresh("POOL enable ", this.name);
        if (!this.isReady()) {
            this.consoleService.refresh("POOL error no f or delay");
            return;
        }
        this.active = true;
        var exec = function () {
            _this.consoleService.refresh("POOL run ", _this.name);
            if (!_this.refreshService.isRunning || !_this.active)
                _this.stop();
            else {
                _this.outcome = -1;
                _this.status = "EXECUTING";
                _this.f(function () {
                    _this.status = "WAITING";
                    _this.outcome = 1;
                    _this.lastTriggered = new Date();
                    _this.consoleService.eventSent("POOL-" + _this.name);
                    _this.event.emit({ refreshed: true, name: name });
                });
            }
        };
        if (this.refreshService.isRunning) {
            exec();
            clearInterval(this.interval);
            this.interval = setInterval(exec, this.delay);
        }
    };
    Pool.prototype.define = function (delay, f) {
        this.status = "READY";
        this.consoleService.refresh("POOL define ", this.name, delay);
        this.delay = delay;
        this.f = f;
        this.eventService.poolDefinedEvent.emit({ name: this.name, delay: this.delay });
    };
    Pool.prototype.stop = function () {
        this.consoleService.refresh("POOL " + this.name + " STOP");
        this.status = "STOPPED";
        this.active = false;
        clearInterval(this.interval);
    };
    __decorate([
        core_1.Output()
    ], Pool.prototype, "event", void 0);
    return Pool;
}());
exports.Pool = Pool;
var RefreshService = (function () {
    function RefreshService(authService, appConfigService, consoleService, eventService, logic) {
        //this.eventService.brokerLoadedEvent.subscribe((val) => this.brokerLoaded(val))
        this.authService = authService;
        this.appConfigService = appConfigService;
        this.consoleService = consoleService;
        this.eventService = eventService;
        this.logic = logic;
        this.isRunning = true;
        this.pools = {};
        this.init();
    }
    RefreshService.prototype.stopRefresh = function () {
        for (var k in this.pools)
            this.pools[k].stop();
    };
    RefreshService.prototype.startRefresh = function () {
        for (var k in this.pools)
            if (this.pools[k].active)
                this.pools[k].enable();
    };
    RefreshService.prototype.getPools = function () {
        return this.pools;
    };
    RefreshService.prototype.subscribe = function (key, f) {
        if (!this.getPool(key).delay || !this.getPool(key).f) {
            this.consoleService.refresh(" !!! pool subscribe but not defined", key);
            return null;
        }
        else {
            this.consoleService.refresh("pool" + key + " subscribed");
            return this.getPool(key).event.subscribe(f);
        }
    };
    RefreshService.prototype.getEventByKey = function (key) {
        if (key in this.pools)
            return this.pools[key].event;
        else {
            console.log("REFRSH notfound rs", this.pools, key);
        }
    };
    RefreshService.prototype.setTradingService = function (t) {
        var _this = this;
        this.tradingService = t;
        //this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => this.allBrokersLoaded(val))
        this.tradingService.TickerUpdatedEvent.subscribe(function (val) { return _this.tickerCreated(val); });
        this.tradingService.PortfolioUpdatedEvent.subscribe(function (val) { return _this.portfolioCreated(val); });
        this.tradingService.ListingUpdatedEvent.subscribe(function (val) { return _this.listingCreated(val); });
    };
    RefreshService.prototype.allBrokersLoaded = function (val) {
        var _this = this;
        var pool = "ticker";
        this.getPool(pool).define(5000, function (f) {
            _this.tradingService.enabledBrokers.forEach(function (b) {
                _this.tradingService.getBrokerByName(b).getPortfolio().refresh(function () {
                    _this.tradingService.getBrokerByName(b).getTicker().refresh(function () {
                        _this.tradingService.getBrokerByName(b).getPortfolio().setUSDValues(_this.tradingService.getBrokerByName(b).getTicker());
                        f();
                    });
                });
            });
        });
        this.getPool(pool).enable();
    };
    RefreshService.prototype.listingCreated = function (broker) {
        var _this = this;
        this.consoleService.eventReceived("listingUpdated --> refreshService", broker.key);
        var k = broker.key + "-bidask";
        this.getPool(k).define(4000, function (f) {
            var B = _this.tradingService.getBrokerByName(broker.key);
            B.getListing().refresh(function () {
                f();
            });
        });
    };
    RefreshService.prototype.getPool = function (k) {
        if (!(k in this.pools)) {
            console.log("!!! POOL" + k + " getPool pool not created");
            this.createPool(k);
        }
        return this.pools[k];
    };
    RefreshService.prototype.brokerLoaded = function (broker) {
        var _this = this;
        var k = broker.key + "-portfolio-ticker";
        this.getPool(k).define(10000, function (f) {
            var B = _this.tradingService.getBrokerByName(broker.key);
            B.getPortfolio().refresh(function () {
                B.getTicker().refresh(function () {
                    f();
                });
            });
        });
        this.getPool(k).enable();
    };
    RefreshService.prototype.portfolioCreated = function (val) {
        var _this = this;
        this.consoleService.eventReceived("portfolioUpdated --> refreshService", val);
        var k = val.broker + "-portfolio";
        this.getPool(k).define(5000, function (f) {
            var B = _this.tradingService.getBrokerByName(val.broker);
            B.getPortfolio().refresh(function () {
                f();
            });
        });
        this.getPool(k).enable();
    };
    RefreshService.prototype.tickerCreated = function (val) {
        var _this = this;
        this.consoleService.eventReceived("tickerUpdated --> refreshService", val);
        var k = val.broker + "-ticker";
        this.getPool(k).define(5000, function (f) {
            var B = _this.tradingService.getBrokerByName(val.broker);
            B.getTicker().refresh(function () {
                B.getPortfolio().setUSDValues(B.getTicker());
                f();
            });
        });
        this.getPool(k).enable();
    };
    RefreshService.prototype.createPool = function (key) {
        if (!(key in this.pools)) {
            this.consoleService.refresh("POOL " + key + " CREATE");
            this.pools[key] = new Pool(key, this, this.eventService, this.consoleService);
        }
        else
            this.consoleService.refresh("POOL " + key + " CREATING POOL BUT ALREADY EXISTING");
    };
    RefreshService.prototype.init = function () {
    };
    RefreshService = __decorate([
        core_1.Injectable()
    ], RefreshService);
    return RefreshService;
}());
exports.RefreshService = RefreshService;
