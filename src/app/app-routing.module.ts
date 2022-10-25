import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StocktransferComponent } from './stocktransfer/stocktransfer.component';
import { StockrecevingComponent } from './stockreceving/stockreceving.component';
import { NewvendorComponent } from './newvendor/newvendor.component';
import { IdctransferComponent } from './idctransfer/idctransfer.component';
import { IdcrecevingComponent } from './idcreceving/idcreceving.component';
import { ShipmentconsolidationComponent } from './shipmentconsolidation/shipmentconsolidation.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { TodoComponent } from './todo/todo.component';
import { TaskComponent } from './task/task.component';
import { ApprovalComponent } from './approval/approval.component';
import { InfoComponent } from './info/info.component';
import { Productassortment360viewComponent } from './productassortment360view/productassortment360view.component';
import { OnedfsmobileComponent } from './onedfsmobile/onedfsmobile.component';
import { ProductmapComponent } from './productassortment360view/productmap/productmap.component';
import { IntransitComponent } from './intransit/intransit.component';
import { ProtectedComponentComponent } from './protected-component/protected-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {ProductLookupComponent} from './product-lookup/product-lookup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {InventoryVarianceComponent} from './inventory-variance/inventory-variance.component';
import {PriceLookupComponent} from './price-lookup/price-lookup.component';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { OrderplannercreationComponent } from './orderplannercreation/orderplannercreation.component';
import { ProductAssortmentMetricsComponent } from './product-assortment-metrics/product-assortment-metrics.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stocktransfer', component: StocktransferComponent },
  { path: 'stockreceving', component: StockrecevingComponent },
  { path: 'newvendor', component: NewvendorComponent },
  { path: 'onedfsmobile', component: OnedfsmobileComponent },
  { path: 'idctransfer', component: IdctransferComponent },
  { path: 'idctransferin', component: IdcrecevingComponent },
  { path: 'shipmentconsolidation', component: ShipmentconsolidationComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'order-creation', component: OrderplannercreationComponent },
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      { path: 'task', component: TaskComponent },
      { path: 'approval', component: ApprovalComponent },
      { path: 'info', component: InfoComponent },
    ],
  },
  {
    path: 'categories',
    component: Productassortment360viewComponent,
  },
  {
    path: 'category',
    component: Productassortment360viewComponent,
  },
  {
    path: 'assortment-metrics',
    component: ProductAssortmentMetricsComponent,
  },
  {
    path: 'intransit',
    component: IntransitComponent,
  },
  {
    path: 'categorymap',
    component: ProductmapComponent,
  },
  {
    path: 'login',
    component: LoginComponentComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'product-lookup',
    component: ProductLookupComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
  {
    path: 'inventory-variance',
    component: InventoryVarianceComponent
  },
  {
    path: 'price-lookup',
    component: PriceLookupComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// export const routingComponents =[TodoComponent]
