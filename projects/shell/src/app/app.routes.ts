import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'sna',
        loadComponent: () =>
            loadRemoteModule('sna', './Component').then((m) => m.AppComponent),
    },
    {
        path: 'snt',
        loadComponent: () =>
            loadRemoteModule('snt', './AppComponent').then((m) => m.AppComponent),
    },
    {
        path: '**',
        component: HomeComponent,
    },
];