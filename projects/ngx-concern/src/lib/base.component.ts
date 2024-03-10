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
  signal,
} from '@angular/core';

export type State = 'prepare' | 'opening' | 'open' | 'closing' | 'closed';
export type ConcernSettings = {
  openDuration: number;
  closeDuration: number;
};
export type ConcernBackdropStyle = {
  backgroundColor: string;
} & Partial<CSSStyleDeclaration>;
export type ConcernActionSheetStyle = {
  backgroundColor: string;
  color: string;
  padding: string;
  maxHeight: string;
  maxWidth: string;
  borderRadius: string;
} & Partial<CSSStyleDeclaration>;
export type ConcernDialogStyle = {
  backgroundColor: string;
  color: string;
  padding: string;
  maxHeight: string;
  maxWidth: string;
  borderRadius: string;
} & Partial<CSSStyleDeclaration>;

export type ConcernFullscreenDialogStyle = {
  backgroundColor: string;
  color: string;
  padding: string;
  width: string;
  height: string;
  borderRadius: string;
} & Partial<CSSStyleDeclaration>;

export const CONCERN_BASE_SETTINGS = new InjectionToken<Partial<ConcernSettings>>(
  'CONCERN_BASE_SETTINGS',
);
export const CONCERN_DIALOG_STYLE = new InjectionToken<Partial<CSSStyleDeclaration>>(
  'CONCERN_DIALOG_STYLE',
);
export const CONCERN_FULLSCREEN_DIALOG_STYLE = new InjectionToken<Partial<CSSStyleDeclaration>>(
  'CONCERN_FULLSCREEN_DIALOG_STYLE',
);
export const CONCERN_ACTION_SHEET_STYLE = new InjectionToken<Partial<CSSStyleDeclaration>>(
  'CONCERN_ACTION_SHEET_STYLE',
);
export const CONCERN_BACKDROP_STYLE = new InjectionToken<Partial<CSSStyleDeclaration>>(
  'CONCERN_BACKDROP_STYLE',
);

const mergeWithMatchingProvider = (
  baseProvider: ValueProvider,
  providers: ValueProvider[],
): ValueProvider => {
  const other = providers.find(p => p.provide === baseProvider.provide);
  return other
    ? { provide: baseProvider.provide, useValue: { ...baseProvider.useValue, ...other.useValue } }
    : baseProvider;
};

export const withConcernTheme = (theme: string, ...providers: ValueProvider[]): Provider =>
  [
    {
      provide: CONCERN_BASE_SETTINGS,
      useValue: {
        openDuration: 300,
        closeDuration: 300,
      } satisfies ConcernSettings,
    },
    {
      provide: CONCERN_ACTION_SHEET_STYLE,
      useValue: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '8px 8px 0px 0px',
        padding: '16px',
        maxHeight: '80svh',
        maxWidth: '100svw',
      } satisfies ConcernActionSheetStyle,
    },
    {
      provide: CONCERN_DIALOG_STYLE,
      useValue: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '8px',
        padding: '16px',
        maxHeight: '80svh',
        maxWidth: '80svw',
      } satisfies ConcernDialogStyle,
    },
    {
      provide: CONCERN_FULLSCREEN_DIALOG_STYLE,
      useValue: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '0px',
        padding: '16px',
        width: '100svw',
        height: '100svh',
      } satisfies ConcernFullscreenDialogStyle,
    },
    {
      provide: CONCERN_BACKDROP_STYLE,
      useValue: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      } satisfies ConcernBackdropStyle,
    },
  ].map(p => mergeWithMatchingProvider(p, providers));

@Component({
  selector: 'lib-base',
  standalone: true,
  imports: [],
  template: '',
  styles: '',
})
export class BaseComponent {
  protected baseSettings = inject(CONCERN_BASE_SETTINGS);

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
