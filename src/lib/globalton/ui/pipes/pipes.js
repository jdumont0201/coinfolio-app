"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isotodate_pipe_1 = require("./isotodate.pipe");
var usercurrency_pipe_1 = require("./usercurrency.pipe");
var countryname_pipe_1 = require("./countryname.pipe");
var location_pipe_1 = require("./location.pipe");
var calendar_pipe_1 = require("./calendar.pipe");
var toarray_pipe_1 = require("./toarray.pipe");
//import {CalendarPipe} from 'angular2-moment'; 
exports.CUSTOM_PIPES = [
    isotodate_pipe_1.IsoToDatePipe,
    calendar_pipe_1.CalendarPipe,
    location_pipe_1.LocationPipe,
    countryname_pipe_1.CountryNamePipe,
    usercurrency_pipe_1.UserCurrencyPipe,
    toarray_pipe_1.ToArrayPipe
];
//# sourceMappingURL=pipes.js.map