/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from '@angular/router';
import { AltertifyService } from 'src/app/services/altertify.service';
import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.css']
})

export class MyPropertyComponent implements OnInit {
  UserNameLogged!: string |null; 
  properties?: IPropertyBase[];
  //list
  city = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  timeout: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  total!: number;
  pageNumber=6;

  searching: boolean = false;
  //end list
  constructor(private houseService: HousingService 
    ,private alertify: AltertifyService 
    ,private router: Router) { }

    ngOnInit() {
      this.UserNameLogged = localStorage.getItem('userName') || ''; // Đặt giá trị mặc định là chuỗi rỗng

  
      if(!localStorage.getItem('userName')){
        this.alertify.error('You must be looged in to add aproperty');
        this.router.navigate(['/user/login'])
      }
      else 
      {
        this.houseService.getMyproperties(this.UserNameLogged).subscribe(data => {
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
     );}
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
