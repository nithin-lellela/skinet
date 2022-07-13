import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.http.get<IProduct>("https://localhost:5001/api/products/" + this.route.snapshot.paramMap.get('id')).subscribe({
      next: (successResponse) => {
        this.product = successResponse;
        console.log(successResponse);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }

  

}
