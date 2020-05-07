import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { IStocks } from './Stocks';
import { st } from '@angular/core/src/render3';

@Component({
  selector: 'app-admin',
  templateUrl: './add-favourites.component.html',
  styleUrls: ['./add-favourites.component.css']
})
export class AddFavouritesComponent implements OnInit {
  
  constructor(private fb: FormBuilder,private navbarService: NavbarService) { }

  stocks:{ id: any, name: any }[]=new Array()
  selectedStock:IStocks  
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable< IStocks[]>;

  displayFn(stock:IStocks): string {
    this.selectedStock = stock
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(this.selectedStock.name)
  
    return stock ? stock.id : stock;
}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => {
        let vv= this.getSymbols(value);
        return vv}
        )
    );
  }

  add(){
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%5")
    console.log(this.selectedStock.name)
  }

  getSymbols(value:string): IStocks[]{
    var stocks: IStocks[]= new Array()
    
    if(value.trim().length==0)
      return stocks;

    console.log("^^^^^"+value)
     this.navbarService.getStockList(value).subscribe(response1=>{

       response1 = response1.replace('suggest1(','')
       response1 = response1.replace(new RegExp('\\)' + '$'), '')
       var res= JSON.parse(response1);
      
        res.forEach(element => {
          stocks.push({id:element.pdt_dis_nm.split(',')[1],name:element.stock_name})
      
        })
      
       }
  
    );
    return stocks; 
  }

}

