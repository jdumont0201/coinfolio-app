import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppDashboardPage} from "../pages/dashboard/component";
import {AppConfigAllPage} from "../pages/config-all/component";
import {AppAccountPage} from "../pages/account/component";
import  {AppGenericPage} from "../pages/generic/component"
import {AppSymbolAllPage} from "../pages/listing/component";
import {AppPairItemPage} from "../pages/pair/component";
import {AppTradesPage} from "../pages/trades/component";
import {AppSymbolItemPage} from "../pages/symbol-item/component";
import {AppAllocationPage} from "../pages/allocation/component"
import {AppConfigBrokersPage} from "../pages/config-brokers/component"
import {AppConfigWorkersPage} from "../pages/config-workers/component";
import {AppPositionsPage}from "../pages/positions/component"
import {AppCalendarPage}from "../pages/calendar/component"
import {AppAuthPage}from "../pages/auth-login/component"
import {AppConfigFavoritesPage} from "../pages/config-favorites/component";
import {AppPairChartPage} from "../pages/pair-chart/component";
import {AppAuthResetpassword}from "../pages/auth-resetpassword/component"
import {AppConfigSubscriptionPage} from "../pages/config-subscription/component";
import {AppConfigImportsPage} from "../pages/config-imports/component";
import {AppConfigInterfacePage} from "../pages/config-interface/component";
import {AppArbitragePage} from "../pages/arbitrage/component";
import {AppConfigProfilePage} from "../pages/config-profile/component";

import {AppAuthBrokersPage} from "../pages/auth-brokers/component"
import {AppArbitrageCalculatorPage} from "../pages/arbitrage-calculator/component"
import {AppSocialPage} from "../pages/social/component"
import {AppNewsPage} from "../pages/news/component"
import {AppWelcomePage} from "../pages/welcome/component"
import {AppDashboardNowPage} from "../pages/dashboard-now/component"
import {AppConfigLoadingPage} from "../pages/config-loading/component";
import {AppConfigAPIPage} from "../pages/config-api/component";
export const routes: Routes = [

  { path: '', component: AppWelcomePage },
  { path: 'board/:id', component: AppGenericPage },
  { path: 'listing', component: AppSymbolAllPage },
  { path: 'dashboard/today', component: AppDashboardPage },
  { path: 'arbitrage/calculator', component: AppArbitrageCalculatorPage },
  { path: 'arbitrage', component: AppArbitragePage },
  { path: 'account', component: AppAccountPage },
  { path: 'social/twitter', component: AppSocialPage },
  { path: 'news', component: AppNewsPage },
  { path: 'dashboard/now', component: AppDashboardNowPage },
  { path: 'auth', component: AppAuthPage },
  { path: 'auth/passwordreset/token/:token', component: AppAuthResetpassword },
  { path: 'config/all', component: AppConfigAllPage },
  { path: 'calendar', component: AppCalendarPage },
  { path: 'config/brokers', component: AppConfigBrokersPage},
  { path: 'config/loading', component: AppConfigLoadingPage},
  { path: 'config/api', component: AppConfigAPIPage},
  { path: 'config/favorites', component: AppConfigFavoritesPage},
  { path: 'config/subscription', component: AppConfigSubscriptionPage},
  { path: 'config/imports', component: AppConfigImportsPage},
  { path: 'config/interface', component: AppConfigInterfacePage},
  { path: 'config/workers', component: AppConfigWorkersPage},
  { path: 'config/profile', component: AppConfigProfilePage},

  { path: 'symbol/all', component: AppSymbolAllPage },
  { path: 'listing', component: AppSymbolAllPage },
  { path: 'allocation/:broker', component: AppAllocationPage },
  { path: 'allocation', component: AppAllocationPage },
  { path: 'trades', component: AppTradesPage },
  { path: 'signup/brokers', component: AppAuthBrokersPage },
  { path: 'positions', component: AppPositionsPage },
  { path: 'generic', component: AppGenericPage },
  { path: 'symbol/:id', component: AppSymbolItemPage },
  { path: 'pair/:pairId/broker/:broker', component: AppPairItemPage },
  { path: 'chart/:pairId/broker/:broker', component: AppPairChartPage },
];
@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
