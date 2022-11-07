import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { Global } from '../../services/global';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  public url: string;
  public products!: Product[];
  public title: string;
  public noResult: boolean = false;
  public busqueda!: string;
  constructor(
    private _productService: ProductService
  ) { 
    this.url = Global.url;
    this.title = "Listado de productos";
  }

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(){
    this._productService.getProducts().subscribe(
      response => {
        console.log(response);
        if(response.productos){
          this.products = response.productos;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  buscarProducto(form: any){
    this._productService.searchProduct(this.busqueda).subscribe(
      response => {
        console.log(response);
        if(response.productos){
          this.products = response.productos;
          //actualizamos la vista
          this.ngOnInit();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
