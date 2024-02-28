import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IKeyValuePair } from 'src/app/model/IKeyValuePair';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { Property } from 'src/app/model/property';
import { AltertifyService } from 'src/app/services/altertify.service';
import { HousingService } from 'src/app/services/housing.service';
@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})

export class UpdatePropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs?: TabsetComponent;
  public propertyId!: number;
  property= new Property();
  //update
  UpdatePropertyForm!: FormGroup;
  nextClicked!: boolean;
  propertyType! : IKeyValuePair[] ;
  furnishType!: IKeyValuePair[];
  cityList?: any[];
  //
  propertyPreview!: Property;
  constructor( private route :ActivatedRoute 
              ,private router : Router
              ,private HousingService: HousingService
              , private fb: FormBuilder
              ,private alertify: AltertifyService
              , private datePipe: DatePipe
               ) { }

  ngOnInit() {

    this.propertyId= +this.route.snapshot.params['id'];
    const propertyUpdateData = this.route.snapshot.data['prp2'];
    this.propertyPreview = propertyUpdateData;
    console.log( this.propertyPreview);
    this.createUpdatePropertyForm();
    this.HousingService.getAllCities().subscribe(data=>{
   
      this.cityList = data;
    });

    this.HousingService.getPropertyType().subscribe(data=>{
      this.propertyType= data;
    })

    this.HousingService.getFurnishingType().subscribe(data=>{
      this.furnishType= data;
    })
  }

  
  createUpdatePropertyForm(){
    this.UpdatePropertyForm= this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [this.propertyPreview.sellRent , Validators.required],
        BHK: [this.propertyPreview.bhk, Validators.required],
        PType: [this.propertyPreview.propertyType, Validators.required],
        FType: [this.propertyPreview.furnishingType, Validators.required],
        Name: [this.propertyPreview.name, Validators.required],
        City: [this.propertyPreview.city, Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [this.propertyPreview.price, [Validators.max(999999999999999), Validators.required]],
        BuiltArea: [this.propertyPreview.builtArea, Validators.required],
        CarpetArea: [this.propertyPreview.carpetArea],
        Security: [this.propertyPreview.security],
        Maintenance: [this.propertyPreview.maintenance],
      }),

    AddressInfo: this.fb.group({
      FloorNo: [this.propertyPreview.floorNo],
      TotalFloor: [this.propertyPreview.totalFloors],
      Address: [this.propertyPreview.address, Validators.required],
      address2: [this.propertyPreview.address2],
    }),

    OtherInfo: this.fb.group({
      RTM: [this.propertyPreview.readyToMove, Validators.required],
      PossessionOn: [this.propertyPreview.estPossessionOn, Validators.required],
      AOP: [this.propertyPreview.age],
      Gated: [this.propertyPreview.gated],
      MainEntrance: [this.propertyPreview.mainEntrance],
      Description: [this.propertyPreview.description]
    })
    });
}

  
//#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.UpdatePropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.UpdatePropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.UpdatePropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.UpdatePropertyForm.controls['OtherInfo'] as FormGroup;
  }
// #endregion

//#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }
  
  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  
  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  
  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }
  
  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  
  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  
  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }
  
  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  
  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  
  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  
  get address2() {
    return this.AddressInfo.controls['address2'] as FormControl;
  }
  
  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  
  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }
  
  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  
  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  
  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  
  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  

//#endregion
//#endregion
  
  onBack(){
    this.router.navigate(['/'])
  }
  onSubmit(){
    this.propertyId= +this.route.snapshot.params['id'];
    this.nextClicked=true;
    if(this.allTabsVaild()){
      this.mapProperty();
      this.HousingService.updateProperty(this.property ,this.propertyId).subscribe(
        ()=>{
          this.alertify.success('Congrats, your property listed successfully on our website');
          console.log(this.UpdatePropertyForm);
    
            if(this.SellRent.value==='2'){
                this.router.navigate(['/rent-property'])
            }
            else{
              this.router.navigate(['/'])
            }
        }
      
      );

    }
    else{
      this.alertify.error('Pls!! review the form provide all vaild entries');
    }
  }

  mapProperty(): void{
    //this.property.id = this.HousingService.newPropID();
    this.property.sellRent = +this.SellRent.value;
    this.property.bhk = this.BHK.value;
    this.property.propertyTypeId = this.PType.value;
    this.property.name = this.Name.value;
    this.property.CityId = this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.address2.value;
    this.property.readyToMove = this.RTM.value;
    this.property.age = this.AOP.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.property.estPossessionOn = this.datePipe.transform(this.PossessionOn.value,'MM-dd-YYYY')!;

    this.property.description =this.Description.value;
    //this.property.PostedOn = new Date().toString();
  }

  allTabsVaild(): boolean{
    if (this.BasicInfo.invalid) {
      if (this.formTabs) {
        this.formTabs.tabs[0].active = true;
      }
      return false;
    }
    if (this.PriceInfo.invalid) {
      if (this.formTabs) {
        this.formTabs.tabs[1].active = true;
      }
      return false;

    }
    if (this.AddressInfo.invalid) {
      if (this.formTabs) {
        this.formTabs.tabs[2].active = true;
      }
      return false;

    }
    if (this.OtherInfo.invalid) {
      if (this.formTabs) {
        this.formTabs.tabs[3].active = true;
      }
      return false;

    }
    return true;
  }
  selectTab(tabId: number , IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (this.formTabs && IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
