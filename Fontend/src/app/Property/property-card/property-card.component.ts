import { Component, Input } from "@angular/core";
import { IPropertyBase } from "src/app/model/ipropertyBase";


@Component({
    selector:'app-property-card',
    // template:'<h1> I am card </h1>',
    templateUrl:'property-card.component.html',
   // styles:['h1{font-weight: 700}']
   styleUrls:['property-card.component.css']
}
)
export class PropertyCardComponent{
    @Input() property2! : IPropertyBase ;
    @Input() hideIcons! : boolean ;

}