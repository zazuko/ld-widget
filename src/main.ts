import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { 
    provideRouter,
} 
from '@angular/router';
import { AppComponent } from './app/app.component';

import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(),
    provideRouter(APP_ROUTES)
  ]
});
