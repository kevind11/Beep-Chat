import {ElementRef, HostListener, Directive, OnInit, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autoresize]',
})

export class AutoresizeDirective implements OnInit {

  @Output()
  resize : EventEmitter<Boolean>;
  
  @HostListener('ionChange', ['$event.target'])
  onChange(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  prevHeight : number;

  constructor(public element:ElementRef) {
    this.resize = new EventEmitter<Boolean>();
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    if(textArea.scrollHeight > 70){
      textArea.style.overflow = 'auto';
      return;
    }
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
    if (this.prevHeight && this.prevHeight != textArea.scrollHeight) {
      this.resize.emit(true);
    }
    this.prevHeight = textArea.scrollHeight;
  }
}
