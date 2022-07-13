import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/Models/basket';
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

}
