import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CatalogoAngular';
  public autor: string;

  constructor(){
    this.autor = "Jonathan Lara Zatta";
  }
}
