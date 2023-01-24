import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Global } from "./global";

@Injectable()
export class UserService {
    public url: string;

    constructor ( private _http: HttpClient ) {
        this.url = Global.url;
    }

    /*
    router.post('/user/registraradmin',UserController.crearAdministrador);
router.post('/user/login', UserController.login);
router.get('/user/administradores', UserController.mostrarAdministradores);
router.put('/user/editaradmin/:id', UserController.editarAdministrador);
router.delete('/user/eliminaradmin/:id', UserController.eliminarAdministrador);
*/
    createAdmin(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/user/registraradmin', params, {headers: headers});
    }

    Login(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/user/login', params, {headers: headers});
    }

    getAdmins(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'/user/administradores', {headers: headers});
    }

    updateAdmin(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'/user/editaradmin/'+user._id, params, {headers: headers});
    }

    deleteAdmin(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'/user/eliminaradmin/'+id, {headers: headers});
    }
}