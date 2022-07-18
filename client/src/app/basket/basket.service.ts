import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Models/basket';
import { IProduct } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get("https://localhost:5001/api/basket?id=" + id)
    .pipe(
      map((basket : IBasket) => {
        this.basketSource.next(basket);
        this.calculateBasketTotal();
      })
    )
  }

  setBasket(basket: IBasket){
    return this.http.post("https://localhost:5001/api/basket", basket).subscribe({
      next: (response: IBasket) => {
        this.basketSource.next(response);
        console.log(response);
        this.calculateBasketTotal();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    console.log("You incremented");
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity += 1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity -= 1;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x => x.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);
      console.log(basket);
      if(basket.items.length > 0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket){
    return this.http.delete("https://localhost:5001/api/basket?id=" + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem("basket_id");
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    });
  }

  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private calculateBasketTotal(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemsToAdd: IBasketItem, quantity: number): IBasketItem[]{
    const index = items.findIndex(i => i.id === itemsToAdd.id);
    if(index === -1){
      itemsToAdd.quantity = quantity;
      items.push(itemsToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket{
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem{
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
