import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-datail',
  templateUrl: './property-datail.component.html',
  styleUrls: ['./property-datail.component.css']
})
export class PropertyDatailComponent implements OnInit {
public propertyId!: number;
  
  constructor( private route :ActivatedRoute , private router : Router ) { }

  ngOnInit() {
    this.propertyId= +this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (parmas)=>{
        this.propertyId =+ parmas['id'];
      }
    )
  }
  onSelectNext(){
    this.propertyId +=1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}

// note

// (1)route :ActivatedRoute danh cho bien dong (id)

// (2)params là một thuộc tính của đối tượng ActivatedRoute. Nó đại diện cho tất cả các tham số được truyền qua trong URL.

// (3)subscribe là một phương thức được sử dụng để theo dõi các sự kiện hoặc thay đổi trong Angular, 
//    chẳng hạn như các thay đổi trong các tham số địa chỉ URL.
//    Trong context của routing, subscribe được sử dụng để theo dõi các thay đổi trong params.

// (4)snapshot là một thuộc tính của ActivatedRoute và là một cách để lấy giá trị hiện tại của params mà 
//    không cần phải theo dõi các sự kiện thay đổi.
//    Tuy nhiên, snapshot chỉ cung cấp giá trị tại thời điểm cụ thể khi component được khởi tạo.