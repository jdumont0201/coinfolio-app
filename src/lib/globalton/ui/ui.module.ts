import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {equired,RequiredFormError} from "./directives/elements/Forms"



import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/locales/', '.json');
}
import {IsoToDatePipe} from './pipes/isotodate.pipe';
import {CountryNamePipe} from './pipes/countryname.pipe';
import {CalendarPipe} from './pipes/calendar.pipe';
import {LocationPipe} from './pipes/location.pipe';
import {LoaderPipe} from './pipes/loader.pipe';
import {FormErrorsPipe} from './pipes/formerrors.pipe';
import {ToArrayPipe} from './pipes/toarray.pipe';
import {UserCurrencyPipe} from './pipes/usercurrency.pipe';
import {MessagePanel} from "./components/messagepanel";
import {SanitizeHtmlPipe} from "./pipes/sanitize.pipe";

import {PopUp} from "./directives/PopUp";
import {ProtectedDirective} from "./directives/ProtectedDirective";


@NgModule({
    imports: [CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
//        IonicModule.forRoot(null)
    ],
    declarations: [
        //IonRequired,
        MessagePanel,PopUp,
      //RequiredFormError,
        IsoToDatePipe,ToArrayPipe,
        LocationPipe,
        ProtectedDirective,LoaderPipe,
        UserCurrencyPipe,
        CountryNamePipe,
        CalendarPipe,SanitizeHtmlPipe,
        FormErrorsPipe

    ],
    exports: [
        //IonRequired,RequiredFormError,
        MessagePanel,
        IsoToDatePipe,ToArrayPipe,
        LocationPipe,LoaderPipe,
        UserCurrencyPipe,
        CountryNamePipe,SanitizeHtmlPipe,PopUp,ProtectedDirective,
        CalendarPipe,
        FormErrorsPipe],
    entryComponents:[],
    providers: []
})
export class GlobaltonUIModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GlobaltonUIModule,
            providers: []
        }
    }
}
