import type { ElementRef, OnInit } from '@angular/core';
import { Component, inject, viewChild } from '@angular/core';

import { BackdropComponent } from './backdrop.component';
import { BaseComponent } from './base.component';
import { applyStyles } from './utility';
import { CONCERN_BACKDROP_STYLE, CONCERN_FULLSCREEN_DIALOG_STYLE } from './provider';

@Component({
  selector: 'concern-fullscreen-dialog',
  standalone: true,
  template: `
    <lib-backdrop [visible]="showBackdrop()" (close)="close()" #backdrop />
    <div class="fullscreen-dialog-content" #content>
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000000;
      pointer-events: none;
    }

    @keyframes fullscreen-dialog-content-fade-in {
      from {
        transform: scale(0.9);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    div.fullscreen-dialog-content {
      width: fit-content;
      height: fit-content;
      display: block;
      box-sizing: border-box;
      z-index: 1000001;
      pointer-events: all;

      transform-origin: center;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    :host[data-state='closed'] div.fullscreen-dialog-content {
      display: none;
    }

    :host[data-state='prepare'],
    :host[data-state*='open'] div.fullscreen-dialog-content {
      display: block;
      animation: fullscreen-dialog-content-fade-in 0.3s ease;
    }

    :host[data-state*='open'] div.fullscreen-dialog-content {
      transform: scale(1);
      opacity: 1;
    }

    :host[data-state*='clos'] div.fullscreen-dialog-content {
      transform: scale(0.9);
      opacity: 0;
    }
  `,
  imports: [BackdropComponent],
})
export class FullscreenDialogComponent extends BaseComponent implements OnInit {
  content = viewChild.required<ElementRef<HTMLDivElement>>('content');
  backdrop = viewChild.required<BackdropComponent>('backdrop');

  #defaultDialogStyle = inject(CONCERN_FULLSCREEN_DIALOG_STYLE);
  #defaultBackdropStyle = inject(CONCERN_BACKDROP_STYLE);

  ngOnInit() {
    applyStyles(this.content().nativeElement, this.#defaultDialogStyle, this.contentStyle());
    applyStyles(this.backdrop().nativeElement, this.#defaultBackdropStyle, this.backdropStyle());
  }
}
