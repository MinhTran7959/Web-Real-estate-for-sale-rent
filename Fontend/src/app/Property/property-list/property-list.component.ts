// import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    SellRent=1;
    properties?: IPropertyBase[];
    Today = new Date();
    city = '';
    SearchCity = '';
    SortbyParam = '';
    SortDirection = 'asc';
    timeout: any;
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    searching: boolean = false;
    //
    contentArray = new Array(90).fill('');
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
            }
         else{
          this.properties= [];
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
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
