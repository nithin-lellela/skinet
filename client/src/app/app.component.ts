import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/Models/product';
import { IPagination } from './shared/Models/pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client side';

  constructor(private http: HttpClient, private basketServices: BasketService){

  }

  ngOnInit(): void{

    const baskedId = localStorage.getItem("basket_id");
    if(baskedId){
      this.basketServices.getBasket(baskedId).subscribe(() => {
        console.log('initialized basket');
        this.basketServices.basket$.subscribe(res => console.log(res));
      })
    }

  }
}
