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

public propertyId!: number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
public photoList: any[] = [];
loggedInUserMatchesPostByName !: boolean ;
CheckLogin!: boolean;

  property= new Property();
  constructor( private route :ActivatedRoute 
              ,private router : Router
              ,private HousingService: HousingService
               ) { }

  ngOnInit() {
    this.loggedInUserMatchesPostByName= false;
    this.propertyId= +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data) => {
        this.property = data['prp'];
     
    });
    this.property.age = this.HousingService.getPropertyAge(this.property.estPossessionOn);
    
    const nameUserLogged = localStorage.getItem('userName');
    if(this.property.postByName === nameUserLogged){
      this.loggedInUserMatchesPostByName= true;
    }
   this.checkLoginUser();
  }
  onSelectNext(){
    this.propertyId +=1;
    this.router.navigate(['property-detail', this.propertyId]);
  }

  getPropertyPhotos() {
    if (this.property.photos ) {
      // Nếu property.photos tồn tại và không phải là undefined, thực hiện map và gán giá trị
      this.photoList = this.property.photos.map(photos => ({
        src: photos.imageUrl
      }));
    } else {
      // Nếu property.photos là undefined, gán photoList với một giá trị mặc định
      this.photoList = [{
        src: 'assets/Images/default.png' // Đường dẫn tới ảnh mặc định
      }];
    }
  
  }
  getPrimaryPhotoUrl(): string | undefined {
    if (this.property.photos) {
      const primaryPhoto = this.property.photos.find(photo => photo.isPrimary === true);
      return primaryPhoto ? primaryPhoto.imageUrl : undefined;
    }
    return undefined;
  }
  checkLoginUser(){
    this.CheckLogin= false;
    if(localStorage.getItem('userName')){
      this.CheckLogin= true;
    }
  }

  
}

