import { Component, ElementRef, Renderer2, ViewChild , OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CatalogoAngular';
  public autor: string;
  public iduser: string;
  public username: string;
  public token: string;
  @ViewChild('top')
  btnsubir!: ElementRef;
  constructor(
    private renderer2: Renderer2
  ) {
    this.autor = "Jonathan Lara Zatta";
    this.iduser = "";
    this.username = "";
    this.token = "";
    
  }

  ngOnInit(){
    this.iduser = localStorage.getItem('id') || '';
    this.username = localStorage.getItem('user') || '';
    this.token = localStorage.getItem('token') || '';
  }

  scrolltop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ocultar(){
    const btn=this.btnsubir.nativeElement;
    this.renderer2.addClass(btn,"d-none");
  }

  mostrar(){
    const btn=this.btnsubir.nativeElement;
    this.renderer2.removeClass(btn,"d-none");
  }

  cerrarsesion(){
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.iduser = "";
    this.username = "";
    this.token = "";
    // recargamos la pagina
    window.location.reload();
  }

  //usamos renderer2 para evento scroll

  ngAfterViewInit(){
    this.ocultar();
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.mostrar();
      } else {
        this.ocultar();
      }
    });
  }

}
