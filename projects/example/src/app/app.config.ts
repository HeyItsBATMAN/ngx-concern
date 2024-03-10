import type { ApplicationConfig } from '@angular/core';
import { CONCERN_BACKDROP_STYLE, CONCERN_DIALOG_STYLE, withConcernTheme } from 'ngx-concern';

export const appConfig: ApplicationConfig = {
  providers: [
    withConcernTheme(
      'default',
      {
        provide: CONCERN_BACKDROP_STYLE,
        useValue: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        } satisfies Partial<CSSStyleDeclaration>,
      },
      {
        provide: CONCERN_DIALOG_STYLE,
        useValue: {
          maxWidth: '80vw',
          maxHeight: '80vh',
          minWidth: '50vw',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        } satisfies Partial<CSSStyleDeclaration>,
      },
    ),
  ],
};
