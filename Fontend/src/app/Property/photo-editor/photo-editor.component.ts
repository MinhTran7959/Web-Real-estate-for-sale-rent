/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { photos } from 'src/app/model/Photo';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() property!: Property;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
  }
  setPrimaryPhoto(propertyId: number, photo: photos) {
    this.housingService.setPrimaryPhoto(propertyId, photo.publicId).subscribe(() => {
        if (this.property && this.property.photos) {
            this.property.photos.forEach(p => {
                if (p.isPrimary) {
                    p.isPrimary = false;
                }
                if (p.publicId == photo.publicId) {
                    p.isPrimary = true;
                }
            });
        }
    });
  }

  deletePhoto(propertyId: number, photo: photos) {
    this.housingService.deletePhoto(propertyId, photo.publicId).subscribe(() => {
        this.property.photos= this.property.photos?.filter(p=>
          p.publicId !== photo.publicId
          )
    });
  }
}
