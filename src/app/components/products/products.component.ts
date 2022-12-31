import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';
import {EventDriverService} from "../../state/event.driver.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products$:Observable<AppDataState<Product[]>> |null=null;
   readonly DataStateEnum=DataStateEnum;

   constructor(private productsService:ProductsService,
               private router:Router,
               private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
     let v=confirm("Etes vous sûre?");
     if(v==true)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT: this.alertConfirmation($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;
    }
  }

  alertConfirmation(p: Product) {
    Swal.fire({
      title: 'Etes vous sûre?',
      text: 'Le produit '+p.id.toString()+' va être supprimé.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, vas y.',
      cancelButtonText: 'Non,pas de suppression',
    }).then((result) => {
      if (result.value) {
        this.productsService.deleteProduct(p)
          .subscribe(data=>{
            this.onGetAllProducts();
          })
        Swal.fire('Supprimé!', 'Le produit a été supprimé.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'Le produit est conservé.)', 'error');
      }
    });
  }

}
