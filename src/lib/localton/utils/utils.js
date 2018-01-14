"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = (function () {
    function Crypto() {
    }
    Crypto.getSymbolsFromPair = function (pair) {
        var a, b;
        if (!pair)
            return;
        var n = pair.length;
        var right = pair.substring(n - 3, n);
        var rightB = pair.substring(n - 4, n);
        if (right === "BTC") {
            a = pair.substring(0, n - 3);
            b = right;
        }
        else if (right === "ETH") {
            a = pair.substring(0, n - 3);
            b = right;
        }
        else if (right === "BNB") {
            a = pair.substring(0, n - 3);
            b = right;
        }
        else if (rightB === "USDT") {
            a = pair.substring(0, n - 4);
            b = rightB;
        }
        else
            console.log("UNKNOWN infra", pair);
        return { supra: a, infra: b };
    };
    Crypto.getNbFormat = function (p) {
        var n;
        if (p > 10000) {
            n = 1;
        }
        else if (p > 1000) {
            n = 2;
        }
        else if (p > 100) {
            n = 3;
        }
        else if (p > 10) {
            n = 4;
        }
        else if (p > 1) {
            n = 5;
        }
        else if (p > 0.1) {
            n = 6;
        }
        else if (p > 0.01) {
            n = 7;
        }
        else {
            n = 7;
        }
        return "1." + n + "-" + n;
    };
    return Crypto;
}());
exports.Crypto = Crypto;
