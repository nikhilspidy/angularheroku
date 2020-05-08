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
  currentPrice:string

priceCurrent :string;
priceChange :Number;
pricePercentageChange :Number;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable< IStocks[]>;

  displayFn(stock:IStocks): string {
    //this.selectedStock = stock
    return stock ? stock.name : stock;
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
    console.log(this.selectedStock.name)
  }

  onSelect(option){
console.log("@@@@@@@@@@@@@@@@@@@@")
this.navbarService.getStockPrice(option.mcId).subscribe(res=>{
  res= JSON.parse(res)
  console.log("@@@@@^^^^^^^^^^^^^@@@@@@@@@@@@@@@")
  console.log(res);
  this.selectedStock = option
  console.log(res.data.pricecurrent)
  this.priceCurrent = res.data.pricecurrent
  this.priceChange = res.data.pricechange
  this.pricePercentageChange = res.data.pricepercentagechange
}
);

  }

  getSymbols(value:string): IStocks[]{
    this.selectedStock = undefined
    var stocks: IStocks[]= new Array()
     this.navbarService.getStockList(value).subscribe(response1=>{

       response1 = response1.replace('suggest1(','')
       response1 = response1.replace(new RegExp('\\)' + '$'), '')
       var res= JSON.parse(response1);
      
        res.forEach(element => {
          stocks.push({id:element.pdt_dis_nm.split(',')[1],name:element.stock_name,mcId:element.sc_id})
      
        })
      
       }
  
    );
    return stocks; 
  }

}

