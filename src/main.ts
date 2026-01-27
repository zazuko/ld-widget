import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
}
  from '@angular/router';
import { AppComponent } from './app/app.component';

import { APP_ROUTES } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(),
    provideRouter(APP_ROUTES),
    provideHttpClient()
  ]
});
