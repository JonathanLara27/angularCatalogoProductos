import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { Global } from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public status! : string;
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = "Editar producto";
    //product vacio
    this.DetallesGenerales= "false";
    this.DetallesEspecificos= "false";
    this.url = Global.url;
  }
  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params["id"];
      this.getProduct(id);
    });
  }

  getProduct(id: any){
    this._productService.getProduct(id).subscribe(
      response => {
        console.log(response);
        this.product = response.producto;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  onSubmit(form: any){
    this._productService.updateProduct(this.product).subscribe(
      response => {
        console.log(response);
        if(response.producto){
          //Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.producto._id, [], this.filesToUpload, 'imagen')
            .then((result: any) => {
              this.save_product = result.producto;
              this.status = 'success';

            });
        }else{
          this.save_product = response.producto;
          this.status = 'success';

        }
        }else{
          console.log(response);
          this.status = 'failed';
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
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
