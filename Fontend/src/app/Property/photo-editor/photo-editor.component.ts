/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef ,} from '@angular/core';
import { photos } from 'src/app/model/Photo';
import { Property } from 'src/app/model/property';
import { AltertifyService } from 'src/app/services/altertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { environmentPublic } from 'src/environments/environment.prod';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() property!: Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  modalRef?: BsModalRef;
  selectedPhoto?: photos;
  message?: string;
  showDeleteModal = false;
  uploader!: FileUploader;
  baseUrl = environment.baseUrl;
  baseUrlPuclic = environmentPublic.baseUrl;
  maxAllowedFileSize= 10*1024*1024;
  hasBaseDropZoneOver!: boolean;
  constructor(private housingService: HousingService, private alertify: AltertifyService, private modalService: BsModalService) {}

 
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
}

initializeFileUploader() {
    this.uploader = new FileUploader({
        url: this.baseUrl +'property/add/photo/'+ String(this.property.id),
        authToken: 'Bearer '+ localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: true,
        maxFileSize:this.maxAllowedFileSize
    });

    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
            const photo = JSON.parse(response);
            if (!this.property.photos) {
              this.property.photos = [];
          }
          this.property.photos.push(photo);
        }
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
        let errorMessage = 'Some unknown error occured';
        if (status===401) {
            errorMessage ='Your session has expired, login again';
        }

        if (response) {
            errorMessage = response;
        }

        this.alertify.error(errorMessage);
    };
}
ngOnInit(): void {
  this.initializeFileUploader();
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


    mainPhotoChanged(url: string){
      this.mainPhotoChangedEvent.emit(url);
    }


  
}

