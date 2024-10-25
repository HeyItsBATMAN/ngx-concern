import { InjectionToken, Provider, ValueProvider } from '@angular/core';

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
  const other = providers.find(p => p.provide.toString() === baseProvider.provide.toString());
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
