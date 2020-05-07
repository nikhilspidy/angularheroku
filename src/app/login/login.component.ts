import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  role = '';

  constructor(private navbarService: NavbarService,private http:HttpClient) {
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
    
  }

  loginUser() {
    console.log("reached");
    this.http.get("http://jsonplaceholder.typicode.com/users").subscribe((data) => console.log(data));
    this.navbarService.updateNavAfterAuth('user');
    this.navbarService.updateLoginStatus(true);
    this.role = 'user';
  }

  
}
