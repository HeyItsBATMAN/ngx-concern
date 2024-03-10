# NgxConcern

<p align="center">
    <img src="https://raw.githubusercontent.com/HeyItsBATMAN/ngx-concern/master/logo.png" width="800">
</p>

A Angular library for creating simple, unstyled dialogs/modals and action-sheets/bottom-sheets.

## Requirements

This was only tested on Angular 17.2.0, so I do not know if it works on older versions.

## Installation

Install as usual using your package manager, e.g. when using `npm`:

`npm i ngx-concern`

Afterwards import in your `ApplicationConfig`:

```ts
import type { ApplicationConfig } from '@angular/core';
import { withConcernTheme } from 'ngx-concern'; // Import the provider function

export const appConfig: ApplicationConfig = {
  providers: [
    withConcernTheme('default'), // Add to providers of the ApplicationConfig
  ],
};
```

## Usage

The library currently provides three types of overlays:

- `ActionSheetComponent`
- `DialogComponent`
- `FullscreenDialogComponent`

Import any of them inside of the component you want to use it:

```ts
import { Component } from '@angular/core';
// Import the overlay components you want
import { ActionSheetComponent, DialogComponent, FullscreenDialogComponent } from 'ngx-concern';

@Component({
  selector: 'app-root',
  standalone: true,
  // Add them to the imports of your component
  imports: [ActionSheetComponent, DialogComponent, FullscreenDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

Add them to your HTML template and add content:

```html
<!-- Open the overlays using their open() method -->
<button (click)="actionSheet.open()">Open Action Sheet</button>
<button (click)="dialog.open()">Open Dialog</button>
<button (click)="fullscreenDialog.open()">Open Fullscreen Dialog</button>

<!-- Add content to the overlays -->
<concern-action-sheet #actionSheet>
  <h1 header>Bla bla</h1>
  <p>
    Fugiat ad ut proident Lorem elit elit dolore quis reprehenderit veniam tempor consequat.
    Excepteur do consectetur sunt duis esse anim mollit consectetur cillum veniam minim sit minim
    ad. Cupidatat enim duis velit do sit fugiat anim nisi in eiusmod minim.
  </p>
</concern-action-sheet>
<concern-dialog #dialog>
  <h1 header>Bla bla</h1>
  <p>
    Fugiat ad ut proident Lorem elit elit dolore quis reprehenderit veniam tempor consequat.
    Excepteur do consectetur sunt duis esse anim mollit consectetur cillum veniam minim sit minim
    ad. Cupidatat enim duis velit do sit fugiat anim nisi in eiusmod minim.
  </p>

  <button footer (click)="dialog.close()">Close</button>
</concern-dialog>
<concern-fullscreen-dialog #fullscreenDialog>
  <h1 header>Bla bla</h1>
  <p>
    Fugiat ad ut proident Lorem elit elit dolore quis reprehenderit veniam tempor consequat.
    Excepteur do consectetur sunt duis esse anim mollit consectetur cillum veniam minim sit minim
    ad. Cupidatat enim duis velit do sit fugiat anim nisi in eiusmod minim.
  </p>

  <button footer (click)="fullscreenDialog.close()">Close</button>
</concern-fullscreen-dialog>
```

Every overlay component has an `open()` and a `close()` method for opening and closing.
You can also close overlays by clicking on the backdrop.

## Styling

There are two ways to style the overlays:

- providing global CSS attributes to the `withConcernTheme` function
- providing CSS per component

### Global styling / withConcernTheme

The `withConcernTheme` can take any number of `TypeProvider`s with `InjectionToken`s to override the default theme. The value of each provider is just a `Partial<CSSStyleDeclaration>`.

```ts
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
```

### Local styling / CSS per component

If you need to use the components in a way where a uniform style cannot be used, you can override the styles per component by providing `CSSStyleDeclaration`s to the components.

```html
<concern-action-sheet
  #actionSheet
  [backdropStyle]="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
  [contentStyle]="{ backdropFilter: 'blur(4px)' }"
>
  <h1 header>Bla bla</h1>
  <p>
    Fugiat ad ut proident Lorem elit elit dolore quis reprehenderit veniam tempor consequat.
    Excepteur do consectetur sunt duis esse anim mollit consectetur cillum veniam minim sit minim
    ad. Cupidatat enim duis velit do sit fugiat anim nisi in eiusmod minim.
  </p>
</concern-action-sheet>
```

### Motivation

I wanted a simpler alternative to `@angular/material` and `@angular/cdk` for my projects.
