import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { StocktransferComponent } from './stocktransfer/stocktransfer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogcardComponent } from './dialogcard/dialogcard.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StockdataService } from './stockdata.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { StockrecevingComponent } from './stockreceving/stockreceving.component';
import { StockrecevingdialogComponent } from './stockrecevingdialog/stockrecevingdialog.component';
import { AfterInitiateComponent } from './after-initiate/after-initiate.component';
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
import { Nav360Component } from './productassortment360view/nav360/nav360.component';
import { CategoriestypeComponent } from './productassortment360view/categoriestype/categoriestype.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { Nav3Component } from './productassortment360view/nav360/nav3/nav3.component';
import { CategorytypefilterComponent } from './productassortment360view/categorytypefilter/categorytypefilter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { OnedfsmobileComponent } from './onedfsmobile/onedfsmobile.component';
import { QuicktodosComponent } from './home/minis/quicktodos/quicktodos.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectSearchModule } from 'mat-select-search';
import { ProductmodalComponent } from './productassortment360view/productmodal/productmodal.component';
import { ProductmapComponent } from './productassortment360view/productmap/productmap.component';
import { ShipmentconsolidatemodaldialogComponent } from './shipmentconsolidatemodaldialog/shipmentconsolidatemodaldialog.component';
import { IntransitComponent } from './intransit/intransit.component';
import { DeliverymodaldialogcomponentComponent } from './deliverymodaldialogcomponent/deliverymodaldialogcomponent.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ProtectedComponentComponent } from './protected-component/protected-component.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app.config';
import { OrderplannercreationComponent } from './orderplannercreation/orderplannercreation.component';
import { ProductAssortmentMetricsComponent } from './product-assortment-metrics/product-assortment-metrics.component';
import { CartPageComponent } from './productassortment360view/cart-page/cart-page.component';
import { ProductLookupComponent } from './product-lookup/product-lookup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InventoryVarianceComponent } from './inventory-variance/inventory-variance.component';
import { PriceLookupComponent } from './price-lookup/price-lookup.component';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (oktaAuth: any, injector: Injector) => {
      const router = injector.get(Router);

      router.navigate(['/login']);
    },
  },
  myAppConfig.oidc
);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StocktransferComponent,
    DialogcardComponent,
    DialogComponent,
    StockrecevingComponent,
    StockrecevingdialogComponent,
    AfterInitiateComponent,
    NewvendorComponent,
    IdctransferComponent,
    IdcrecevingComponent,
    ShipmentconsolidationComponent,
    DeliveryComponent,
    TodoComponent,
    TaskComponent,
    ApprovalComponent,
    InfoComponent,
    Productassortment360viewComponent,
    Nav360Component,
    CategoriestypeComponent,
    Nav3Component,
    CategorytypefilterComponent,
    OnedfsmobileComponent,
    QuicktodosComponent,
    ProductmodalComponent,
    ProductmapComponent,
    ShipmentconsolidatemodaldialogComponent,
    IntransitComponent,
    DeliverymodaldialogcomponentComponent,
    LoginComponentComponent,
    ProtectedComponentComponent,
    OrderplannercreationComponent,
    ProductAssortmentMetricsComponent,
    CartPageComponent,
    ProductLookupComponent,
    ProductDetailsComponent,
    InventoryVarianceComponent,
    PriceLookupComponent,
    OpenDialogComponent,
    // DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    IvyCarouselModule,
    NgxSliderModule,
    NgxPaginationModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    NgSelectModule,
    MatSelectSearchModule,
    OktaAuthModule,
    NgxSpinnerModule
  ],

  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: oktaConfig,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogcardComponent],
})
export class AppModule {}
