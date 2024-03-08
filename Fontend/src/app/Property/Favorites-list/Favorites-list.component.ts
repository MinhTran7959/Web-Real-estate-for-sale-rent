/* eslint-disable @angular-eslint/component-selector */

import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-Favorites-list',
  templateUrl: './Favorites-list.component.html',
  styleUrls: ['./Favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
  city = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  timeout: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  total!: number;
  pageNumber=6;

  searching = false;
  constructor(private service:HousingService) { }
  properties?: IPropertyBase[];
  ngOnInit() {
    const name: string | undefined = localStorage.getItem("userName") ?? undefined;

    if (name){
      this.service.getFavoritesList(name).subscribe(data => {
        if(data && data.length>0){
          this.properties = data;
          //console.log(this.properties);
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


