/******************************************* CORE *********************************************/
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorHandler} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router"


/*MATERIAL*/
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material"
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatProgressBarModule} from '@angular/material/progress-bar';
/**************************************** EXTERNAL *******************************************/
import {QRCodeModule} from 'angular2-qrcode';

import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import highstock from 'highcharts/modules/stock.src';
import exporting from 'highcharts/modules/exporting.src';
import {HttpClientModule} from "@angular/common/http"
export function highchartsModules() {
    return [highstock, exporting];
}

import {DndModule} from 'ng2-dnd';
import{RestangularModule, Restangular} from 'ngx-restangular';
export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://34.242.69.165:3000');
    //RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtX3VzZXIifQ.V2Jh0ImjSe1TvDuImncT1nG9W0zh6FFkmh7UhWWeJnI'});
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        console.log("[REQ] ", url, "params", params, "headers", headers);
        return {            params: params,            headers: headers,            element: element        }
    });
    RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
        console.log("error!!", response.status, subject)
        return false
    });
}


/****************************************** LIB  *********************************************/
import {GlobaltonCoreModule} from '../lib/globalton/core/core.module';
import {GlobaltonUIModule} from '../lib/globalton/ui/ui.module';
import {LocalModule} from "../lib/localton/local.module";


/******************************************* APP *********************************************/
import {AppComponent} from './app.component';
/*PAGES*/
import {AppDashboardPage} from "../pages/dashboard/component";
import {AppConfigAllPage} from "../pages/config-all/component";
import {AppAccountPage} from "../pages/account/component";

import {AppSocialPage} from "../pages/social/component"
import {AppNewsPage} from "../pages/news/component"
import {AppAdminPage} from "../pages/admin-all/component"
import {AppAllocationPage} from "../pages/allocation/component"
import {AppGenericPage} from "../pages/generic/component"
import {AppSymbolAllPage} from "../pages/listing/component";
import {AppTradesPage} from "../pages/trades/component";
import {AppSymbolItemPage} from "../pages/symbol-item/component";
import {AppPairItemPage} from "../pages/pair/component";
import {AppPositionsPage}from "../pages/positions/component"
import {AppConfigBrokersPage} from "../pages/config-brokers/component"

import {AppConfigFavoritesPage} from "../pages/config-favorites/component";
import {AppConfigWorkersPage} from "../pages/config-workers/component";
import {AppConfigSubscriptionPage} from "../pages/config-subscription/component";
import {AppConfigImportsPage} from "../pages/config-imports/component";
import {AppConfigInterfacePage} from "../pages/config-interface/component";
/*CANVAS*/
import {AppMenuList} from "../canvas/menu/component";
import {AppTicker} from "../canvas/ticker/component";

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
import {AppBitcoinDominanceMiniWidget} from "../widgets/bitcoin-dominance/component"
import {AppWidgetTopEntriesWidget} from "../widgets/top-entries/component"
import {AppLivePriceWidget} from "../widgets/liveprice/component"
import {AppDepthWidget} from "../widgets/depth/component"
import {AppMyTradesWidget} from "../widgets/trades/component"

/*COMPONENTS*/
import {AppCryptoIconComponent} from "../components/cryptoicon/component"
import {AppMarketCapEvolComponent} from "../widgets/marketcap-evol/component"
import {AppLoginComponent} from "../components/login/component"
import {AppBrokerConnectionsComponent} from "../components/broker-connections/component"
import {AppWelcomeComponent} from "../components/welcome/component"
import {AppLoadingComponent} from "../components/loading/component"
import {AppConfigureBrokerComponent} from "../components/configure-broker/component"
import {AppPairTickComponent} from "../components/pair-tick/component"
import {AppSubscribeComponent} from "../components/subscribe/component"
import {AppWorkersComponent} from "../components/workers/component"
import {AppVeilComponent} from "../components/veil/component"
import {AppDisconnectedComponent} from "../components/disconnected/component"
import {AppMarketCapEvolMiniComponent} from "../widgets/marketcap-evol-mini/component"
import {AppSubscriberFeatureComponent} from "../components/subscriber-feature/component";
import {AppRegisterComponent} from "../components/register/component";
import {AppPanelCreatorComponent, AskNameDialog} from "../components/panel-creator/component";
import {AppPortfolioRecapComponent} from "../components/portfolio-recap/component"
import {GlobalErrorHandler} from "../lib/globalton/core/handlers/GlobalErrorHandler";
import {AppPortfolioValueComponent} from "../components/portfolio-value/component"

/*ROUTER*/
import {AppRoutingModule, routes} from './app-routing.module';

/* LOGIC */
import {Logic} from "../logic/Logic";
import {AppConfigProfilePage} from "../pages/config-profile/component";


@NgModule({
    declarations: [
        AppComponent, AppMenuList,AppDisconnectedComponent,AppConfigBrokersPage,AppPositionsPage,AppPortfolioValueComponent,AppConfigureBrokerComponent,
        AskNameDialog, AppWelcomeComponent, AppVeilComponent,AppLoadingComponent,AppAdminPage,AppAllocationPage,AppTicker,AppPairTickComponent,AppConfigFavoritesPage, AppConfigInterfacePage,AppConfigImportsPage,AppConfigProfilePage,AppConfigSubscriptionPage,
        AppWidgetTopEntriesWidget,AppPairItemPage,AppLivePriceWidget,AppDepthWidget,AppTradesPage,AppMyTradesWidget,AppPortfolioRecapComponent,AppNewsPage,AppSocialPage,
         AppDashboardPage, AppAccountPage, AppConfigAllPage, AppSymbolItemPage, AppSymbolAllPage, AppGenericPage,AppBrokerConnectionsComponent,AppConfigWorkersPage,AppWorkersComponent,
        AppPanelCreatorComponent, AppLoginComponent, AppSubscriberFeatureComponent, AppSubscribeComponent, AppRegisterComponent, AppBitcoinDominanceMiniWidget,
        AppCryptoIconComponent, AppMarketCapEvolComponent, AppMarketCapEvolMiniComponent, AppTopPerformanceComponent, AppTopPerformanceDailyComponent, AppHeadlinesComponent, AppTwitterComponent, AppEvolutionTableComponent, AppSortedPerformanceComponent, AppMarketCapTableComponent, AppPerfLastWeekComponent, AppCapLastWeekComponent, AppTrendingLastWeekComponent, AppVolumeComponent, AppPriceComponent, AppMarketCapComponent, AppPriceDivMarketComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        RestangularModule.forRoot(RestangularConfigFactory),
        ChartModule,
        DndModule.forRoot(),
        QRCodeModule,
        GlobaltonCoreModule,GlobaltonUIModule, LocalModule,        AppRoutingModule,
        MatSlideToggleModule,MatTooltipModule,MatChipsModule,MatButtonModule,MatProgressBarModule, MatExpansionModule,MatSidenavModule, MatSnackBarModule, MatTabsModule, MatMenuModule, MatIconModule, MatStepperModule, MatDialogModule, MatToolbarModule, MatListModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatCardModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule
    ],
    entryComponents: [AskNameDialog],
    providers: [
        Logic,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
        {provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
