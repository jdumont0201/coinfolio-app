import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppChartItemPage }      from '../pages/chart-item/component';
import {AppDashboardPage} from "../pages/dashboard/component";
import {AppAllocationPage} from "../pages/allocation-item/component";
import {AppNewsPage} from "../pages/news/component";
import {AppConfigAllPage} from "../pages/config-all/component";
import {AppAccountPage} from "../pages/account/component";
import {AppImportPage} from "../pages/import/component";
import {AppImportCMCPage} from "../pages/import-cmc/component";
import {AppEvolutionPage} from "../pages/evolution-item/component";
import  {AppMarketPage} from "../pages/market/component"
import  {AppGenericPage} from "../pages/generic/component"
import {AppSymbolAllPage} from "../pages/symbol-all/component";
import {AppSymbolItemPage} from "../pages/symbol-item/component";
import {AppConfigProfilePage} from "../pages/config-profile/component";
export const routes: Routes = [
  { path: 'charts', component: AppChartItemPage },

  { path: '', component: AppGenericPage },
  { path: 'board/:id', component: AppGenericPage },
  { path: 'listing', component: AppSymbolAllPage },
  { path: 'dashboard', component: AppDashboardPage },
  { path: 'allocation', component: AppAllocationPage },
  { path: 'account', component: AppAccountPage },
  { path: 'evolution', component: AppEvolutionPage },
  { path: 'market', component: AppMarketPage},
  { path: 'config/all', component: AppConfigAllPage },
  { path: 'config/profile', component: AppConfigProfilePage },
  { path: 'news', component: AppNewsPage },
  { path: 'symbol/all', component: AppSymbolAllPage },
  { path: 'generic', component: AppGenericPage },
  { path: 'symbol/:id', component: AppSymbolItemPage },

  { path: 'admin/import', component: AppImportPage }  ,

  { path: 'admin/import/marketcap', component: AppImportCMCPage }
];
@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
