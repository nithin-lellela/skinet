import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IPagination } from '../shared/Models/pagination';
import { IProduct } from '../shared/Models/product';
import { IBrand } from '../shared/Models/productBrands';
import { IType } from '../shared/Models/productTypes';
import { ShopParams } from '../shared/Models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  searchInput: string = '';
  shopParams = new ShopParams();
  totalProductCount: number;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  sortOptions: [
    {name: "Alphabetical", value: "name"},
    {name: "Price: Low to High", value: "priceAsc"},
    {name: "Price: High to Low", value: "priceDesc"}
  ]


  constructor(private shopService: ShopService,
    private http: HttpClient) { }

  ngOnInit() {

    this.getProductsOnFilters(this.shopParams);
    this.getBrands();
    this.getTypes();

  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProductsOnFilters(this.shopParams);
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId= typeId;
    this.shopParams.pageNumber = 1;
    this.getProductsOnFilters(this.shopParams);
  }

  getProductsOnFilters(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId != 0){
      params = params.set("brandId", shopParams.brandId.toString())
      //params = params.append("brandId", brandId.toString());
    }
    if(shopParams.typeId != 0){
      params = params.set("typeId", shopParams.typeId.toString());
      //params = params.append("typeId", typeId.toString());
    }
    params = params.set("sort", shopParams.sort);
    params = params.set("pageIndex", shopParams.pageNumber.toString());
    params = params.set("pageSize", shopParams.pageSize.toString());
    if(shopParams.search){
      params = params.set("search", shopParams.search.toString());
    }
    //console.log(params);

    this.http.get<IPagination>("https://localhost:5001/api/products",{params})
    .subscribe({
      next: (successResponse) => {
        this.products = successResponse.data;
        this.totalProductCount = successResponse.count;
        //console.log(this.products);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });

  }

  /*getProducts(){

    this.http.get<IPagination>("https://localhost:5001/api/products?pageSize=50").subscribe({
      next: (successResponse) => {
        this.products = successResponse.data;
        this.totalProductCount = successResponse.count;
        console.log(this.products);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }*/

  getBrands(){
    this.http.get<IBrand []>("https://localhost:5001/api/products/brands").subscribe({
      next: (successResponse) => {
        this.brands = [{id: 0, name: "All"}, ...successResponse];
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }

  getTypes(){
    this.http.get<IType []>("https://localhost:5001/api/products/types").subscribe({
      next: (successResponse) => {
        this.types = [{id: 0, name: "All"}, ...successResponse];
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }

  onSortOption(sort: string){
    this.shopParams.sort = sort;
    this.getProductsOnFilters(this.shopParams);
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProductsOnFilters(this.shopParams);
    }
  }

  onSearch(event: any){
    this.searchInput = event.target.value;
    this.shopParams.pageNumber = 1;
    this.onClick();
  }
  onClick(){
    this.shopParams.search = this.searchInput;
    this.getProductsOnFilters(this.shopParams);
  }
  onReset(){
    this.searchInput = "";
    this.shopParams = new ShopParams();
    this.getProductsOnFilters(this.shopParams);

  }

}
