import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup!:FormGroup;
  submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
              private productsService:ProductsService,
              private fb:FormBuilder,
              private router:Router) {
    // @ts-ignore
    this.productId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup=this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })
      });
  }

  get f() { return this.productFormGroup.controls; }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        //alert("Success Product updated");
        //this.successNotification()
        //this.router.navigateByUrl("/products");
        this.alertConfirmation()
      });
  }

  successNotification() {
    Swal.fire('Salut !', 'produit modifié!', 'success');
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Modification du produit numero '+this.productId.toString(),
      text: 'produit modifié avec succès !',
      icon: 'success',
      confirmButtonText: 'Voir les produits ?',
    }).then((result) => {
      if (result.value) {
        //Swal.fire('Removed!', 'Product removed successfully.', 'success');
        this.router.navigateByUrl("/products");
      }
    });
  }

  alertConfirmation1() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}
