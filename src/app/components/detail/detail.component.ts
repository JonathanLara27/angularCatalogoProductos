import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Swal from 'sweetalert2';
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
  public token: string;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
    this.title = "Detalle del producto";
    this.token = localStorage.getItem('token') || '';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params["id"];
      this.getProduct(id);
    });
  }

  getProduct(id: any) {
    this._productService.getProduct(id).subscribe(
      response => {
        if (response.producto) {
          this.product = response.producto;
        } else {
          this._router.navigate(['/productos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteProduct(id: any) {
    this._productService.deleteProduct(id,this.token).subscribe(
      response => {
        if (response.producto) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Producto eliminado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this._router.navigate(['/productos']);
          }, 1500);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  mostrarConfirmacion(id: any) {
    Swal.fire({
      title: '¿Estás seguro de Eliminar el producto?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(id);
      }
    })
  }

}
