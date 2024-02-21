import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-datail',
  templateUrl: './property-datail.component.html',
  styleUrls: ['./property-datail.component.css']
})
export class PropertyDatailComponent implements OnInit {
[x: string]: any;
public propertyId!: number;
  property= new Property();
  constructor( private route :ActivatedRoute 
              ,private router : Router
              ,private HousingService: HousingService
               ) { }

  ngOnInit() {
    this.propertyId= +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data) => {
        this.property = data['prp'];
    });
    this.property.age = this.HousingService.getPropertyAge(this.property.estPossessionOn);
  
  }
  onSelectNext(){
    this.propertyId +=1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}

