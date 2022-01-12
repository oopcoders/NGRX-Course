import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
  show(component) {
    this.modalRef = this.modalService.show(component, {
      class: 'modal-lg',
    });
  }
}
