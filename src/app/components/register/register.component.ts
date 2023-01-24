import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user!: User;
  public token: string;
  constructor() { 
    this.token = localStorage.getItem('token') || '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
  }

}
