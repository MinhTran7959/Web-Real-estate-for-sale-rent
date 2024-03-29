import { Component, Input } from "@angular/core";
import { IPropertyBase } from "src/app/model/ipropertyBase";
import { Property } from "src/app/model/property";


@Component({
    selector:'app-property-card',
    // template:'<h1> I am card </h1>',
    templateUrl:'property-card.component.html',
   // styles:['h1{font-weight: 700}']
   styleUrls:['property-card.component.css']
}
)
export class PropertyCardComponent{
    @Input() property2! : IPropertyBase | Property ;
    @Input() hideIcons! : boolean ;
    loggedInUserMatchesPostByName= false;

    ngOnInit() {
        const nameUserLogged = localStorage.getItem('userName');
        if(this.property2.postByName === nameUserLogged){
          this.loggedInUserMatchesPostByName= true;
        }
    
    }
}
