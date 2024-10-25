import type { Provider, ValueProvider } from '@angular/core';
import {
  Component,
  EventEmitter,
  HostBinding,
  InjectionToken,
  Output,
  computed,
  inject,
  input,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { CONCERN_BASE_SETTINGS, ConcernSettings, State } from './provider';

@Component({
  selector: 'lib-base',
  standalone: true,
  imports: [],
  template: '',
  styles: '',
})
export class BaseComponent {
  protected baseSettings: Partial<ConcernSettings> = inject(CONCERN_BASE_SETTINGS);

  @Output() closed = new EventEmitter<unknown>();
  @Output() opened = new EventEmitter<void>();

  public static openCount = 0;

  @HostBinding('attr.data-state') get __state() {
    return this.state();
  }

  @HostBinding('attr.data-index') get __index() {
    return this.index();
  }

  readonly contentStyle = input<Partial<CSSStyleDeclaration>>({});
  readonly backdropStyle = input<Partial<CSSStyleDeclaration>>({});

  readonly state = signal<State>('closed');
  readonly index = signal<number>(-1);
  readonly showBackdrop = computed(() => {
    return this.state() === 'opening' || this.state() === 'open';
  });
  open() {
    this.state.set('prepare');
    requestAnimationFrame(() => {
      this.state.set('opening');
      setTimeout(() => {
        BaseComponent.openCount++;
        this.index.set(BaseComponent.openCount);
        this.state.set('open');
        this.opened.emit();
      }, this.baseSettings.openDuration);
    });
  }

  close(emitResult?: unknown) {
    this.state.set('closing');
    setTimeout(() => {
      BaseComponent.openCount = Math.max(0, BaseComponent.openCount - 1);
      this.state.set('closed');
      this.index.set(-1);
      this.closed.emit(emitResult);
    }, this.baseSettings.closeDuration);
  }
}
