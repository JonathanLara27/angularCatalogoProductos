import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { Global } from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProductService, UploadService]
})
export class EditComponent implements OnInit {
  public url: string;
  public title: string;
  public product!: Product;
  public save_product: any;
  public DetallesGenerales: string;
  public DetallesEspecificos: string;
  public filesToUpload!: Array<File>;
  public token: string;
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Editar producto";
    //product vacio
    this.DetallesGenerales = "false";
    this.DetallesEspecificos = "false";
    this.url = Global.url;
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
        this.product = response.producto;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  onSubmit(form: any) {
    // mostrar swal de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar producto!'
    }).then((result) => {
      if (result.isConfirmed) {
        // editar producto
        this._productService.updateProduct(this.product, this.token).subscribe(
          response => {
            if (response.producto) {
              //Subir la imagen
              if (this.filesToUpload) {
                this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.producto._id, [], this.filesToUpload, 'imagen')
                  .then((result: any) => {
                    this.save_product = result.producto;
                    // mensaje Swal de exito
                    Swal.fire({
                      icon: 'success',
                      title: 'Producto editado exitosamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    // redireccionar a producto editado
                    setTimeout(() => {
                      this._router.navigate(['/producto', this.save_product._id]);
                    }, 1500);
    
                  });
              } else {
                this.save_product = response.producto;
                // mensaje Swal de exito
                Swal.fire({
                  icon: 'success',
                  title: 'Producto editado exitosamente',
                  showConfirmButton: false,
                  timer: 1500
                })
                // redireccionar a producto editado
                setTimeout(() => {
                  this._router.navigate(['/producto', this.save_product._id]);
                }, 1500);;
    
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Algo salio mal, intentalo de nuevo',
                showConfirmButton: false,
                timer: 1500
              })
              // redireccionar a producto editado
              setTimeout(() => {
                this._router.navigate(['/producto', this.save_product._id]);
              }, 1500);
            }
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: error,
              showConfirmButton: false,
              timer: 1500
            })
            // redireccionar a producto editado
            setTimeout(() => {
              this._router.navigate(['/producto', this.save_product._id]);
            }, 1500);
          }
        );
      }
    })

  }
  mostrarDG(value: string) {
    this.DetallesGenerales = value;
  }
  mostrarDE(value: string) {
    this.DetallesEspecificos = value;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
