import { Component, Input } from "@angular/core";
import { IProperty } from "../IProperty.interface";


@Component({
    selector:'app-property-card',
    // template:'<h1> I am card </h1>',
    templateUrl:'property-card.component.html',
   // styles:['h1{font-weight: 700}']
   styleUrls:['property-card.component.css']
}
)
export class PropertyCardComponent{
    @Input() property2! : IProperty ;
   
}