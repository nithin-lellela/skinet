import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/Models/product';
import { IBrand } from 'src/app/shared/Models/productBrands';
import { IType } from 'src/app/shared/Models/productTypes';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct;
  @Input() brands: IBrand;
  @Input() types: IType;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  onAddItemToBasket(){
    console.log(this.product);
    this.basketService.addItemToBasket(this.product);
  }

}
