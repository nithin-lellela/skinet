import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './Models/product';
import { IPagination } from './Models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client side';
  products: any = [];

  constructor(private http: HttpClient){

  }

  ngOnInit(): void{
    this.http.get("https://localhost:5001/api/products?pageSize=50").subscribe({
      next: (successResponse: any) => {
        console.log(successResponse.data);
        this.products = successResponse.data;
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {
      }
    });
  }
}
