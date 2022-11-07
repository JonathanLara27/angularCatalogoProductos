import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { Global } from "./global";

@Injectable()
export class ProductService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular';
    }

    saveProduct(product: Product): Observable<any>{
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-product', params, {headers: headers});
    }

    getProducts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'products', {headers: headers});
    }

    getProduct(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'product/'+id, {headers: headers});
    }

    deleteProduct(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'product/'+id, {headers: headers});
    }

    updateProduct(product: Product): Observable<any>{
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'product/'+product._id, params, {headers: headers});
    }

    searchProduct(search: any): Observable<any>{
        let params = JSON.stringify(search);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'products/'+search, params, {headers: headers});
    }


    
}