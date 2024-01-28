import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})

export class PropertyListComponent {
    properties: Array<any>=[
      {
      "Id":1,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":2,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":3,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":4,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":5,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":6,
      "Name":"A House",
      "Type":"House",
      "Price":12000
    },
  ]
}
