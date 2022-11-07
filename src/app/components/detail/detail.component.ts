import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProductService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public product!: Product;
  public title!: string;
  public confirm: boolean;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
    this.title = "Detalle del producto";
    this.confirm = false;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params["id"];
      this.getProduct(id);
    });
  }

  getProduct(id: any){
    this._productService.getProduct(id).subscribe(
      response =>{
        if(response.producto){
          console.log(response.producto);
          this.product = response.producto;
        }else{
          this._router.navigate(['/productos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  deleteProduct(id: any){
    this._productService.deleteProduct(id).subscribe(
      response => {
        if(response.producto){
          this._router.navigate(['/productos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirm: any){
    this.confirm = confirm;
  }

}
