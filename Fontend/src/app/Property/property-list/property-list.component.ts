// import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})

export class PropertyListComponent implements OnInit {
    SellRent=1;
    properties!: IProperty[];
    constructor( private route:ActivatedRoute, private housingService: HousingService){

    }
    ngOnInit(): void {
      // gọi services housing
     if( this.route.snapshot.url.toString()){
      this.SellRent =2 ;
     }
   
     
      this.housingService.getAllproperties(this.SellRent).subscribe(
        data=>{
          this.properties=data;
        },Error => {
          console.log(Error);// trường hợp API không hoạt động
        }

      );
    }
}
