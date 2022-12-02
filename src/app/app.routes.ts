import { Routes } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: WidgetComponent
    },
    {
        path: 'config',
        loadComponent: () => 
        import('./config/config.component').then(m => m.ConfigComponent)
    },
];
