import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { Global } from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
declare var $: any;
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
  public status! : string;
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService

  ) { 
    this.title = "Crear producto";
    this.DetallesGenerales= "false";
    this.DetallesEspecificos= "false";
    this.product=new Product('','','','',0,0,'','',0,0,0,'',0,'','','','','','','','',0,0,0,0);
  }

  ngOnInit(): void {
    console.log(this.DetallesGenerales);
  }

  onSubmit(form: any){
    this._productService.saveProduct(this.product).subscribe(
      response => {
        if(response.producto){
          //Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.producto._id, [], this.filesToUpload, 'imagen')
            .then((result: any) => {
              this.save_product = result.producto;
              this.status = 'success';
              form.reset();
            });
        }else{
          this.save_product = response.producto;
          this.status = 'success';
          form.reset();
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
