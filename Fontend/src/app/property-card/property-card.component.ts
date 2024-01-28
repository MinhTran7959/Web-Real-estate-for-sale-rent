import { Component } from "@angular/core";

@Component({
    selector:'app-property-card',
    // template:'<h1> I am card </h1>',
    templateUrl:'property-card.component.html',
   // styles:['h1{font-weight: 700}']
   styleUrls:['property-card.component.css']
}
)
export class PropertyCardComponent{
    property: any={
        "Id":1,
        "Name":"A House",
        "Type":"House",
        "Price":12000
    }
}