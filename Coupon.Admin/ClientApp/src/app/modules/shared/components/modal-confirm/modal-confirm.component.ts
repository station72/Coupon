import { Component, TemplateRef, EventEmitter, Output, ViewChild, AfterViewInit, Input, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
  providers: [BsModalService]
})
export class ModalConfirmComponent implements AfterViewInit {
  public modalRef: BsModalRef;

  @Input()
  private showSubject: Subject<any>;

  @Input()
  public confirmText: string = "Вы уверены?";

  @Output()
  private confirm: EventEmitter<any> = new EventEmitter();

  @ViewChild('templ')
  private templ: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private elRef: ElementRef
  ) { 
  }

  ngAfterViewInit(): void {
    this.showSubject.subscribe((data)=>{
      this.openModal(this.templ);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onConfirm(){
    this.modalRef.hide();    
    this.confirm.next();
  }

  onDecline(){
    this.modalRef.hide();
  }
}
