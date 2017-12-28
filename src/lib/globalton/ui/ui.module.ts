import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonRequired,RequiredFormError} from "./directives/elements/Forms"



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
import {FormErrorsPipe} from './pipes/formerrors.pipe';
import {UserCurrencyPipe} from './pipes/usercurrency.pipe';
import {MessagePanel} from "./components/messagepanel";
import {SanitizeHtmlPipe} from "./pipes/sanitize.pipe";


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
        IonRequired,MessagePanel,
      RequiredFormError,
        IsoToDatePipe,
        LocationPipe,
        UserCurrencyPipe,
        CountryNamePipe,
        CalendarPipe,SanitizeHtmlPipe,
        FormErrorsPipe

    ],
    exports: [IonRequired,RequiredFormError,MessagePanel,
        IsoToDatePipe,
        LocationPipe,
        UserCurrencyPipe,
        CountryNamePipe,SanitizeHtmlPipe,
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
