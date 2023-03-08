import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user : string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickSubmit(user : string){
    this.user = user;
    sessionStorage.setItem('user', user);
    console.log(this.user);
    this.router.navigate(['dashboard']);
  }

}
