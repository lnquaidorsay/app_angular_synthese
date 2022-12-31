import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionsTypes} from '../../../../state/product.state';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product|null=null;
  @Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});
  }

  alertConfirmation(product: Product) {
    Swal.fire({
      title: 'Suppression du produit : '+product.id.toString(),
      text: 'produit modifié avec succès !',
      icon: 'success',
      confirmButtonText: 'Voir les produits ?',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl("/products");
      }
    });
  }
}
