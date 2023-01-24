import { Component ,ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent{
  public user: User;
  public stateMostrarContraseña: String;
  public url: string;
  public mensajeError: string;
  constructor(
    private _userService: UserService,
  ) { 
    this.user = new User('','','');
    this.stateMostrarContraseña = "false";
    this.url = Global.url;
    this.mensajeError = "";
  }

  onSubmit(form: any){
    this._userService.Login(this.user).subscribe(
      response => {
        // set token, id, user in localstorage
        if(response.token){
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.data._id);
          localStorage.setItem('user', response.data.user);
          // Swal para mostrar mensaje de exito
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: true,
            timer: 3000
          })
          // rederigimos a la pagina de inicio
          setTimeout(() => {
            window.location.href = "/";
          }, 3500);

        }else{
          // aca será codigo para un mensaje de error
          this.mensajeError = response.message;
          // Swal para mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: this.mensajeError,
            showConfirmButton: true,
            timer: 3000
          })
          // reseteamos el formulario
          form.reset();

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
