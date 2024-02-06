// import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';

import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/model/iproperty';



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
     if( this.route.snapshot.url.toString())
     {
      this.SellRent =2 ;
     }
   
     
      this.housingService.getAllproperties(this.SellRent).subscribe(
        data=>{
          this.properties=data;
          const newPropertyString = localStorage.getItem('newProp');
          const newProperty = newPropertyString ? JSON.parse(newPropertyString) : null;
          
          if(newProperty.SellRent === this.SellRent){
              this.properties= [newProperty, ...this.properties];
          }

        },Error => {
          console.log(Error);// trường hợp API không hoạt động
        }

      );
    }
}
