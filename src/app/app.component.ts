import { Component, OnInit } from '@angular/core';
import { Router, PreloadingStrategy } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AddFavouritesComponent } from './add-favourites/add-favourites.component';
import { LoginComponent } from './login/login.component';
import { NavbarService } from './services/navbar.service';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
  myFavouritesClicked=true
  addFavouritesClicked=false
  mobileNumber:string

  constructor(private router: Router, private navbarService: NavbarService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'user', component: UserComponent },
      { path: 'add-favourites', component: AddFavouritesComponent },
      { path: 'my-favourites', component: MyFavouritesComponent },
    );
  }

  loggedIn = false

  ngOnInit() {
    if(localStorage.getItem('mobileNumber')!='undefined' && localStorage.getItem('mobileNumber')!=null){
      this.mobileNumber = localStorage.getItem('mobileNumber');
      this.loggedIn = true
    }
  
  }

  login(){
    this.loggedIn = true;
    localStorage.setItem("mobileNumber", this.mobileNumber);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+this.mobileNumber)
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem("mobileNumber");
  }

  addFavourites() {
    this.myFavouritesClicked=false
    this.addFavouritesClicked=true
    this.router.navigate(['add-favourites']);
  
  }

  myFavourites(){
    this.myFavouritesClicked=true
    this.addFavouritesClicked=false
    this.router.navigate(['my-favourites']);

  }
}
