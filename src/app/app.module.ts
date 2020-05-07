import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AddFavouritesComponent } from './add-favourites/add-favourites.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AddFavouritesComponent,
    LoginComponent,
    MyFavouritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  entryComponents: [
    LoginComponent,
    UserComponent,
    AddFavouritesComponent,
    MyFavouritesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
