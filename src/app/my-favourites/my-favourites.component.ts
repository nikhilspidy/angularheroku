import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }
  filteredOptions = [1,2,3,4]
  listOfMyStocksDetails = []
  loading = false;
  priceCurrent :string;
  priceChange :Number; 
  mobileNumber:string;
  showAlert=false;

  ngOnInit() {
    this.mobileNumber = localStorage.getItem('mobileNumber');
    if(this.mobileNumber!='undefined' && this.mobileNumber!= null ){
      console.log("nikhil --------------------"+typeof this.mobileNumber)
      this.getMyStockList()
    }else{
      this.showAlert = true;
    }
      
  }

  listOfAPIs = new Array()
    getMyStockList(){

  
  this.loading = true;

  this.navbarService.getMyStockList(this.mobileNumber).subscribe(
    response=>{
      let res = JSON.parse(response);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
      console.log(res.stockList)
   
if(res.stockList == 'undefined' || res.stockList == null){
 alert("You dont hve stcks added")
  return
}
      res.stockList.split(",").forEach(stockId => {
        this.listOfAPIs.push(this.navbarService.getStockPrice(stockId));

        console.log("@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^@@@@@@@@@@@@@@")
        console.log(this.listOfAPIs)
        });

        forkJoin(this.listOfAPIs).subscribe(
          result=>{
            this.loading = false
            console.log("***(((*(*(*HDJHDDJSMNBDHBJHGSJHSDGHJDSJVDJHDSVHVDJ")
            result.forEach(
              res=>{console.log(res);
              this.listOfMyStocksDetails.push(JSON.parse(res))
            }
            )
      
          }
      
        )

    }
  );



}

  

}
