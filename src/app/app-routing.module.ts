import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppDashboardPage} from "../pages/dashboard/component";
import {AppConfigAllPage} from "../pages/config-all/component";
import {AppAccountPage} from "../pages/account/component";
import  {AppGenericPage} from "../pages/generic/component"
import {AppSymbolAllPage} from "../pages/symbol-all/component";
import {AppPairItemPage} from "../pages/pair/component";
import {AppSymbolItemPage} from "../pages/symbol-item/component";
import {AppAllocationPage} from "../pages/allocation/component"

export const routes: Routes = [

  { path: '', component: AppGenericPage },
  { path: 'board/:id', component: AppGenericPage },
  { path: 'listing', component: AppSymbolAllPage },
  { path: 'dashboard', component: AppDashboardPage },
  { path: 'account', component: AppAccountPage },
  { path: 'config/all', component: AppConfigAllPage },
  { path: 'symbol/all', component: AppSymbolAllPage },
  { path: 'listing', component: AppSymbolAllPage },
  { path: 'allocation', component: AppAllocationPage },
  { path: 'generic', component: AppGenericPage },
  { path: 'symbol/:id', component: AppSymbolItemPage },
  { path: 'pair/:pairId', component: AppPairItemPage },
  { path: 'pair/:pairId/broker/:brokerId', component: AppPairItemPage },
];
@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
