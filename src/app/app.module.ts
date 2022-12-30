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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    HomeComponent,
    ProductAddComponent,
    ProductEditComponent
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
