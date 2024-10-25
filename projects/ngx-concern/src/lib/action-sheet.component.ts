import { ElementRef, OnInit } from '@angular/core';
import { Component, inject, viewChild } from '@angular/core';

import { BackdropComponent } from './backdrop.component';
import { BaseComponent } from './base.component';
import { applyStyles } from './utility';
import { CONCERN_ACTION_SHEET_STYLE, CONCERN_BACKDROP_STYLE } from './provider';

@Component({
  selector: 'concern-action-sheet',
  standalone: true,
  template: `
    <lib-backdrop [visible]="showBackdrop()" (close)="close()" #backdrop />
    <div class="action-sheet-content" #content>
      <ng-content />
    </div>
  `,
  styles: `
    div.action-sheet-content {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: fit-content;
      box-sizing: border-box;
      z-index: 1000001;
      overflow-y: auto;

      transition: transform 0.3s ease;
      transform: translateY(100%);
    }

    :host[data-state='closed'] div.action-sheet-content {
      display: none !important;
    }

    :host[data-state='prepare'],
    :host[data-state*='open'] div.action-sheet-content {
      display: block;
    }

    :host[data-state*='open'] div.action-sheet-content {
      transform: translateY(0);
    }

    :host[data-state*='clos'] div.action-sheet-content {
      transform: translateY(100%);
    }
  `,
  imports: [BackdropComponent],
})
export class ActionSheetComponent extends BaseComponent implements OnInit {
  content = viewChild.required<ElementRef<HTMLDivElement>>('content');
  backdrop = viewChild.required<BackdropComponent>('backdrop');

  #defaultActionSheetStyle = inject(CONCERN_ACTION_SHEET_STYLE);
  #defaultBackdropStyle = inject(CONCERN_BACKDROP_STYLE);

  ngOnInit() {
    const enableScrolling = (enabled: boolean) => {
      document.body.style.overflow = enabled ? '' : 'hidden';
    };

    this.content().nativeElement.addEventListener('touchstart', () => enableScrolling(false));
    this.content().nativeElement.addEventListener('touchend', () =>
      setTimeout(() => enableScrolling(true), 100),
    );
    this.content().nativeElement.addEventListener('scrollend', () =>
      setTimeout(() => enableScrolling(true), 100),
    );

    applyStyles(this.content().nativeElement, this.#defaultActionSheetStyle, this.contentStyle());
    applyStyles(this.backdrop().nativeElement, this.#defaultBackdropStyle, this.backdropStyle());
  }
}
