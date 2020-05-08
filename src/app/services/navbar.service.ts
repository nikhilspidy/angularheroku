import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor(private httpClient:HttpClient) {
    this.addItem({ text: 'Login', path: 'login' });
    this.isLoggedIn.next(false);
  }

  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.addItem({ text: 'Login', path: 'login' });
    }
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });

    if (role === 'user') {
      this.addItem({ text: 'User Board', path: 'user' });
    } else if (role === 'admin') {
      this.addItem({ text: 'Admin Board', path: 'admin' });
    }
    else if(role="favourites"){
      this.addItem({ text: 'Admin Board', path: 'favourites' });
    }
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }

  search(keyword:String):Observable<any> {
    return this.httpClient.get('http://127.0.0.1:8080/getStocksList/1')
    .pipe(
      tap((response) => {
        return response;
      })
      );
  }

  getStockList(keyword:string):any{
    let headers = new HttpHeaders({
'accept':'text/plain text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
'accept-encoding':'gzip, deflate, br',
'accept-language':'en-US,en;q=0.9',
'referer':'https://www.moneycontrol.com/india/stockpricequote/',
'sec-fetch-dest':'empty',
'sec-fetch-mode':'cors',
'sec-fetch-site':'same-origin',
'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
'x-requested-with':'XMLHttpRequest'
      
  });
    return this.httpClient.get("https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query="+keyword+"&type=1&format=json&callback=suggest1",{headers,responseType: 'text'})
    .pipe(
      tap((response) => {{
        
        response = response.replace('suggest1(','')
        response = response.replace(new RegExp('\\)' + '$'), '')
        var res= JSON.parse(response);
        return res;}
      })
      );
  }

  

  getStockPrice(mcId:string):any{
    let headers = new HttpHeaders({
'accept':'text/plain,text/javascript, application/json, application/ecmascript, application/x-ecmascript, */*; q=0.01',
'accept-encoding':'gzip, deflate, br',
'accept-language':'en-US,en;q=0.9',
'referer':'https://www.moneycontrol.com/india/stockpricequote/',
'sec-fetch-dest':'empty',
'sec-fetch-mode':'cors',
'sec-fetch-site':'same-origin',
'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
'x-requested-with':'XMLHttpRequest'
      
  });
    return this.httpClient.get("https://nikhil-stock-ms.herokuapp.com/getStockDetails/"+mcId,{headers,responseType: 'text'})
    .pipe(
      tap((response) => {{
        var res= JSON.parse(response);
        console.log("&!&@&@&*#&(@*&*^*&^&#%^$^%#^%^**()_(_)*)(*&^&%&^%^&%%^")
        console.log(res)
        return res;}
      })
      );
  }
}
