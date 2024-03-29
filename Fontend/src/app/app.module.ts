import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http';
import { Routes,  RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';

import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { PropertyDatailComponent } from './Property/property-datail/property-datail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AltertifyService } from './services/altertify.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttperrorInterceptorService } from './services/httperror-interceptor.service';
import { DatePipe } from '@angular/common';
import { PhotoEditorComponent } from './Property/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MyPropertyComponent } from './Property/my-property/my-property.component';
import { UpdatePropertyComponent } from './Property/update-property/update-property.component';
import { PropertyDetailResolverService, PropertyUpdateResolverService } from './services/property-details-resolver.service';
import { FavoritesListComponent } from './Property/Favorites-list/Favorites-list.component';
import { FootersComponent } from './display/footer/footers/footers.component';
import { NarbarComponent } from './narbar/narbar.component';
import { CarouselComponent } from './display/Carousel/Carousel/Carousel.component';





const appRoutes: Routes=[
  {path: '' , component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'add-property' , component: AddPropertyComponent},
  {path: 'property-detail/:id' , component: PropertyDatailComponent, 
                      resolve:{prp:PropertyDetailResolverService }},
  {path: 'user/login' , component: UserLoginComponent},
  {path: 'user/register' , component: UserRegisterComponent},
  {path: 'myProperty' , component: MyPropertyComponent},
  {path: 'Favorites' , component: FavoritesListComponent},
  {path: 'update-Property/:id' , component: UpdatePropertyComponent
                                ,resolve: {
                                  prp: PropertyDetailResolverService,
                                  prp2: PropertyUpdateResolverService
                                }},
  {path: '**' , component: PropertyListComponent}

]

@NgModule({
  declarations: [	
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    AddPropertyComponent,
    PropertyDatailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
    PhotoEditorComponent,
    MyPropertyComponent,
    UpdatePropertyComponent,
    FavoritesListComponent,
    FootersComponent,
    NarbarComponent,
    CarouselComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorInterceptorService,
      multi: true,
    },
    DatePipe,
    HousingService,
    AltertifyService,
    AuthService,
    PropertyDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
