import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./components/home/home.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductsComponent} from "./components/products/products.component";
import {HttpClientModule} from "@angular/common/http";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {ProductsListComponent} from "./components/products/products-list/products-list.component";
import {ProductItemComponent} from "./components/products/products-list/product-item/product-item.component";
import {ProductsNavBarComponent} from "./components/products/products-nav-bar/products-nav-bar.component";
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    HomeComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductsNavBarComponent,
    ProductsListComponent,
    ProductItemComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
