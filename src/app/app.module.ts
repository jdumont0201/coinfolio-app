import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GlobaltonCoreModule} from '../lib/globalton/core/core.module';
import {GlobaltonUIModule} from '../lib/globalton/ui/ui.module';
import {LocalModule} from "../lib/localton/local.module";

import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';

import highstock from 'highcharts/modules/stock.src';

import exporting from 'highcharts/modules/exporting.src';
import {HttpClientModule} from "@angular/common/http"
export function highchartsModules() {
  // apply Highstock Modules to this array
  return [ highstock, exporting ];
}

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { ErrorHandler } from '@angular/core';
/*MATERIAL*/
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {Logic} from "../logic/Logic";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material"
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs'
import {MatDialogModule} from '@angular/material/dialog';
/*PAGES*/
import {AppDashboardPage} from "../pages/dashboard/component";
import {AppAllocationPage} from "../pages/allocation-item/component";
import {AppNewsPage} from "../pages/news/component";
import {AppChartItemPage} from "../pages/chart-item/component";
import {AppConfigAllPage} from "../pages/config-all/component";
import {AppAccountPage} from "../pages/account/component";
import {AppImportPage} from "../pages/import/component";
import {AppImportCMCPage} from "../pages/import-cmc/component";
import {AppEvolutionPage} from "../pages/evolution-item/component";
import {AppMarketPage} from "../pages/market/component"
import {AppGenericPage} from "../pages/generic/component"

import {AppSymbolAllPage} from "../pages/symbol-all/component";
import {AppSymbolItemPage} from "../pages/symbol-item/component";
/*CANVAS*/
import {AppMenuList} from "../canvas/menu/component";

/*ROUTER*/
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router"
import {routes} from "./app-routing.module"

import { QRCodeModule } from 'angular2-qrcode';
//import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';

/*WIDGETS*/
import {AppTopPerformanceComponent} from "../widgets/top-performance/component"
import {AppTopPerformanceDailyComponent} from "../widgets/top-performance-daily/component";
import {AppEvolutionTableComponent} from "../widgets/evolution-table/component";
import {AppSortedPerformanceComponent} from "../widgets/sorted-perf/component";
import {AppMarketCapTableComponent} from "../widgets/market-table/component";
import {AppPerfLastWeekComponent} from "../widgets/perf-lastweek/component";
import {AppTrendingLastWeekComponent} from "../widgets/trending-lastweek/component";
import {AppCapLastWeekComponent} from "../widgets/cap-lastweek/component";
import {AppPriceComponent} from "../widgets/price/component";
import {AppMarketCapComponent} from "../widgets/marketcap/component";
import {AppPriceDivMarketComponent} from "../widgets/pricedivmarket/component";
import {AppVolumeComponent} from "../widgets/volume/component";
import {AppTwitterComponent} from "../widgets/twitter/component"
import {AppHeadlinesComponent} from "../widgets/headlines/component"

/*COMPONENTS*/
import {AppCryptoIconComponent} from "../components/cryptoicon/component"
import {AppMarketCapEvolComponent} from "../widgets/marketcap-evol/component"
import {AppLoginComponent} from "../components/login/component"
import {AppWelcomeComponent} from "../components/welcome/component"
import {AppSubscribeComponent} from "../components/subscribe/component"
import {AppVeilComponent} from "../components/veil/component"
import {MatStepperModule} from '@angular/material/stepper';
import {AppMarketCapEvolMiniComponent} from "../widgets/marketcap-evol-mini/component"
import {AppSubscriberFeatureComponent} from "../components/subscriber-feature/component";
import {AppRegisterComponent} from "../components/register/component";

import {AppConfigProfilePage} from "../pages/config-profile/component";

import {MatSnackBarModule} from '@angular/material/snack-bar'
/*DATA*/
import { DragDropDirectiveModule} from "angular4-drag-drop";

import {AppPanelCreatorComponent, AskNameDialog} from "../components/panel-creator/component";
import {DndModule} from 'ng2-dnd';
import{ RestangularModule, Restangular } from 'ngx-restangular';

import {GlobalErrorHandler} from "../lib/globalton/core/handlers/GlobalErrorHandler";
import { Angular2TokenService } from 'angular2-token';

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://34.242.69.165:3000');
  //RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtX3VzZXIifQ.V2Jh0ImjSe1TvDuImncT1nG9W0zh6FFkmh7UhWWeJnI'});
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params)=> {
    console.log("[REQ] ",url,"params",params,"headers",headers);
    return {
      params:params,
      headers: headers,
      element: element
    }
  });

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    console.log("error!!", response.status, subject)
    return false
  });
}

@NgModule({
  declarations: [
    AppComponent, AppMenuList,
    AskNameDialog,AppWelcomeComponent,AppVeilComponent,
    AppChartItemPage, AppDashboardPage,AppAllocationPage,AppNewsPage,AppAccountPage,AppConfigAllPage,AppImportPage,AppEvolutionPage,AppImportCMCPage,AppMarketPage,AppSymbolItemPage,AppSymbolAllPage,AppGenericPage,
  AppPanelCreatorComponent,AppLoginComponent,AppSubscriberFeatureComponent,AppSubscribeComponent,AppRegisterComponent,AppConfigProfilePage,
    AppCryptoIconComponent,AppMarketCapEvolComponent,AppMarketCapEvolMiniComponent,AppTopPerformanceComponent,AppTopPerformanceDailyComponent,AppHeadlinesComponent,AppTwitterComponent,AppEvolutionTableComponent,AppSortedPerformanceComponent,AppMarketCapTableComponent,AppPerfLastWeekComponent,AppCapLastWeekComponent,AppTrendingLastWeekComponent,AppVolumeComponent,AppPriceComponent,AppMarketCapComponent,AppPriceDivMarketComponent
  ],
  imports: [
    BrowserModule,
    //Ng4TwitterTimelineModule.forRoot(),
    BrowserAnimationsModule,FormsModule,ReactiveFormsModule,
    GlobaltonCoreModule,
    ChartModule,
    GlobaltonUIModule, LocalModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    RouterModule.forRoot(routes),
    HttpClientModule,DndModule.forRoot(),
    QRCodeModule,
    MatButtonModule,MatSidenavModule,MatSnackBarModule,MatTabsModule,MatMenuModule,MatIconModule,MatStepperModule,MatDialogModule,MatToolbarModule,MatListModule,MatTableModule,MatCheckboxModule,MatFormFieldModule, MatPaginatorModule, MatInputModule,MatCardModule,MatGridListModule,MatDatepickerModule,MatNativeDateModule,
    AppRoutingModule
  ],
  entryComponents: [AskNameDialog],
  providers: [Logic,Angular2TokenService,{provide: ErrorHandler, useClass: GlobalErrorHandler},
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
