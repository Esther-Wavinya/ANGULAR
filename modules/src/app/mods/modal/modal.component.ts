import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.body.appendChild(this.el.nativeElement);

  }

  ngOnDestroy(): void {
    
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.el.nativeElement.remove();
  }

 

  onCloseClick() {
    this.close.emit();
  }

}
