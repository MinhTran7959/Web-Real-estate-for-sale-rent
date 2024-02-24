/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, TemplateRef ,} from '@angular/core';
import { photos } from 'src/app/model/Photo';
import { Property } from 'src/app/model/property';
import { AltertifyService } from 'src/app/services/altertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() property!: Property;
  modalRef?: BsModalRef;
  selectedPhoto?: photos;
  message?: string;
  showDeleteModal = false;

  constructor(private housingService: HousingService, private alertify: AltertifyService, private modalService: BsModalService) {}

  ngOnInit(): void {}

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
        this.alertify.success('Change success');
      } else {
        this.alertify.error('error');
      }
    });
  }

  deletePhoto(propertyId: number, photo: photos) {
    this.housingService.deletePhoto(propertyId, photo.publicId).subscribe(() => {
      this.property.photos = this.property.photos?.filter(p => p.publicId !== photo.publicId);
    });
    //this.alertify.success('Change success');
  }

  openModal(template: TemplateRef<void>, photo: photos) {
    this.selectedPhoto = photo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if (this.selectedPhoto) {
      this.deletePhoto(this.property.id, this.selectedPhoto);
    }
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}

