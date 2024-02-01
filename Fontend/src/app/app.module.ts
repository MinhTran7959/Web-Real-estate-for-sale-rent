import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from'@angular/common/http';
import { Routes, Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { NarbarComponent } from './narbar/narbar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { PropertyDatailComponent } from './Property/property-datail/property-datail.component';

const appRoutes: Routes=[
  {path: '' , component: PropertyListComponent},
  {path: 'rent-property' , component: PropertyListComponent},
  {path: 'add-property' , component: AddPropertyComponent},
  {path: 'property-detail/:id' , component: PropertyDatailComponent},
  {path: '**' , component: PropertyListComponent}

]

@NgModule({
  declarations: [	
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NarbarComponent,
    AddPropertyComponent,
    PropertyDatailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HousingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
