import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;

  constructor(private basketServices: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketServices.basket$;
  }

  onRemoveItem(item: IBasketItem){
    this.basketServices.removeItemFromBasket(item);
  }

  onIncrement(item: IBasketItem){
    this.basketServices.incrementItemQuantity(item);
  }

  onDecrement(item: IBasketItem){
    this.basketServices.decrementItemQuantity(item);
  }

}
