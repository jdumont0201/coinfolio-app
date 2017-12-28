
import {IsoToDatePipe} from "./isotodate.pipe"
import {UserCurrencyPipe} from "./usercurrency.pipe"
import {CountryNamePipe} from "./countryname.pipe"
import {LocationPipe} from "./location.pipe"
import {CalendarPipe} from "./calendar.pipe"
import {ToArrayPipe} from "./toarray.pipe"
//import {CalendarPipe} from 'angular2-moment'; 

export const CUSTOM_PIPES: any[] = [
  IsoToDatePipe,
  CalendarPipe,
  LocationPipe,
  CountryNamePipe,
  UserCurrencyPipe,
  ToArrayPipe
  ];
  