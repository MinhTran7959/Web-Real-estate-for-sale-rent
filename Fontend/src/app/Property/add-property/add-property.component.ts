import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { Property } from 'src/app/model/property';
import { AltertifyService } from 'src/app/services/altertify.service';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {


    @ViewChild('formTabs') formTabs?: TabsetComponent;
    // @ViewChild('Form') addPropertyForm!: NgForm;
    addPropertyForm!: FormGroup;
    nextClicked!: boolean;
    property = new Property();

  // will come form master
  propertyType : Array<String>= ['House','Apartment','Duplex' ]
  furnishType : Array<String>= ['Fully','Semi','Unfurnished' ]
  cityList?: any[];

  propertyPreview: IPropertyBase ={
    Id: null,
    Name : '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    RTM: null,
    BuiltArea: null,
    City: '',
    Image: null,

  };




  constructor(  private fb: FormBuilder
               ,private route: Router
               ,private housingServe: HousingService
               ,private alertify: AltertifyService
              ) { }

  ngOnInit() {
    this.createAddPropertyForm();
    this.housingServe.getAllCities().subscribe(data=>{
      // console.log(data);
      this.cityList = data;
    });
  }

  createAddPropertyForm(){
      this.addPropertyForm= this.fb.group({
        BasicInfo: this.fb.group({
          SellRent: ['1' , Validators.required],
          BHK: [null, Validators.required],
          PType: [null, Validators.required],
          FType: [null, Validators.required],
          Name: [null, Validators.required],
          City: [null, Validators.required]
        }),
        PriceInfo: this.fb.group({
          Price: [null, Validators.required],
          BuiltArea: [null, Validators.required],
          CarpetArea: [null],
          Security: [null],
          Maintenance: [null],
        }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
      });
  }

//#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
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
  
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
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
    this.route.navigate(['/'])
  }
  onSubmit(){

    this.nextClicked=true;
    if(this.allTabsVaild()){
      this.mapProperty();
      this.housingServe.addProperty(this.property)
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

        if(this.SellRent.value==='2'){
            this.route.navigate(['/rent-property'])
        }
        else{
          this.route.navigate(['/'])
        }
    }
    else{
      this.alertify.error('Pls!! review the form provide all vaild entries');
    }
  }

  mapProperty(): void{
    this.property.Id = this.housingServe.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
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
