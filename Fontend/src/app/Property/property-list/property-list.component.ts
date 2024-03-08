/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})

export class PropertyListComponent implements OnInit {

  @ViewChild('pageTop') pageTop: any;
    SellRent=1;
    properties?: IPropertyBase[];
    propertiesView?: IPropertyBase[];
    Today = new Date();
    city = '';
    name='';
    SearchCity = '';
    SortbyParam = '';
    SortDirection = 'asc';
    timeout: any;
    //load
    searching = false;
    dataLoaded = false;
    //load
    
    contentArray = new Array(6).fill('');
    returnedArray?: string[];
    total!: number;
    pageNumber=6;
    constructor( private route:ActivatedRoute, private housingService: HousingService){

    }
    ngOnInit(): void {
      if (this.route.snapshot.url.toString()) {
        this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
      }
    
      this.housingService.getAllproperties(this.SellRent).subscribe(
          data => {
            if(data && data.length>0){        
                this.properties = data;           
                this.contentArray = this.properties;
                this.total=  this.contentArray.length;
                this.returnedArray = this.contentArray.slice(0, this.pageNumber);
                this.dataLoaded = true;
            }
         else{
          this.properties= [];
         }
        }, error => {
          console.log('httperror:');
          console.log(error);
        }
      );
      this.housingService.getAllpropertiesView().subscribe(
        data => {
          if(data && data.length>0){
           this.propertiesView = data; 
          }
       else{
        this.propertiesView= [];
       }
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
    }
    pageChanged(event: PageChangedEvent): void {
      const startItem = (event.page - 1) * event.itemsPerPage;
      const endItem = event.page * event.itemsPerPage;
      if (this.pageTop) {
        this.pageTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', duration: 3500 });
      }
      this.returnedArray = this.contentArray.slice(startItem, endItem);
     
    }

    onInputChange() {
      this.searching = true; // Bắt đầu tìm kiếm, hiển thị thanh tải
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.onCityFilter();
      }, 500);
    }
  
    onCityFilter() {
      // Thực hiện tìm kiếm ở đây
      this.SearchCity = this.city;
      this.searching = false; // Kết thúc tìm kiếm, ẩn thanh tải
    }

  onCityFilterClear() {
    this.SearchCity = '';
    this.city = '';
    this.name = '';

  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
