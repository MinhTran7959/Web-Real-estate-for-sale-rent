/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HttpClient} from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})

export class PropertyListComponent implements OnInit {
  @ViewChild('template') template!: TemplateRef<any>;
  @ViewChild('pageTop') pageTop: any;
  modalRef?: BsModalRef;
    SellRent=1;
    properties?: IPropertyBase[];
    propertiesView?: IPropertyBase[];
    Today = new Date();
    city = '';
    name='';
    postByName='';
    price=''
    SearchCity = '';
    SortbyParam = '';
    SortDirection = 'asc';
    timeout: any;
    search:any;
    //load
    searching = false;
    dataLoaded = false;
    Btnclear = false
    //load
    
    contentArray = new Array(6).fill('');
    returnedArray?: string[];
    total!: number;
    pageNumber=6;
    constructor( private route:ActivatedRoute, private housingService: HousingService,private modalService: BsModalService){

    }
    ngOnInit(): void {
      
       
            if (this.route.snapshot.url.toString()) {
              this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
            }
          
            this.housingService.getAllproperties(this.SellRent).subscribe(
                data => {
                  if(data && data.length>0){    
                    this.openModal();
                    setTimeout(() => {
                      this.properties = data;           
                      this.contentArray = this.properties;
                      this.total=  this.contentArray.length;
                      this.returnedArray = this.contentArray.slice(0, this.pageNumber);
                      this.dataLoaded = true;
                      this.closeModal();
                      if (this.pageTop && this.SellRent == 2) {
                        this.pageTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
                      }
                      //console.log(this.returnedArray);
                    }, 500); // Mở modal sau 0.5 giây    
                      
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
      
      this.Btnclear = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.onCityFilter();
      }, 500);
    }
  
    onCityFilter() {
      // Thực hiện tìm kiếm ở đây
      this.SearchCity = this.search;
      
      this.searching = false; // Kết thúc tìm kiếm, ẩn thanh tải
    }

  onCityFilterClear() {
    this.SearchCity = '';
    this.city = '';
    this.name = '';
    this.Btnclear = false;
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

    openModal() {
      this.modalRef = this.modalService.show(this.template);
  }
  closeModal() {
    this.modalRef?.hide(); // Không cần truyền tham chiếu đến template
  }
}