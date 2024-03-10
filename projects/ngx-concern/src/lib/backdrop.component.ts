import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-backdrop',
  standalone: true,
  imports: [],
  template: '',
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100lvw;
      height: 100lvh;
      z-index: 1000000;

      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      &.visible {
        pointer-events: all;
        opacity: 1;
      }
    }
  `,
})
export class BackdropComponent {
  #ref = inject<ElementRef<HTMLDivElement>>(ElementRef);

  get nativeElement() {
    return this.#ref.nativeElement;
  }

  @Output()
  close = new EventEmitter<void>();

  @HostListener('click')
  onClick() {
    this.close.emit();
  }

  @HostBinding('class.visible')
  @Input('visible')
  visible = false;
}
