import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
