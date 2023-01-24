import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { Global } from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProductService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public product: Product;
  public save_product: any; 
  public DetallesGenerales: string;
  public DetallesEspecificos: string;
  public filesToUpload!: Array<File>;
  public token: string;
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService

  ) { 
    this.title = "Crear producto";
    this.DetallesGenerales= "false";
    this.DetallesEspecificos= "false";
    this.product=new Product('','','','',0,0,'','',0,0,0,'',0,'','','','','','','','',0,0,0,0);
    this.token = localStorage.getItem('token') || '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._productService.saveProduct(this.product, this.token).subscribe(
      response => {
        if(response.producto){
          //Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.producto._id, [], this.filesToUpload, 'imagen')
            .then((result: any) => {
              this.save_product = result.producto;
              // mensaje Swal de exito
              Swal.fire({
                icon: 'success',
                title: 'Producto creado con éxito',
                showConfirmButton: true,
                timer: 1500
              })
              form.reset();
              this.scrolltop();
            });
        }else{
          this.save_product = response.producto;
          Swal.fire({
            icon: 'success',
            title: 'Producto creado con éxito',
            showConfirmButton: true,
            timer: 1500
          })
          form.reset();
          this.scrolltop();
        }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Ops!',
            text: 'No se pudo crear el producto',
            showConfirmButton: true,
            timer: 1500
          })
          this.scrolltop();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  mostrarDG(value: string){
    this.DetallesGenerales = value;
  }
  mostrarDE(value: string){
    this.DetallesEspecificos = value;
  }
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  scrolltop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
