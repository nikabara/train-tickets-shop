import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'search-trains', component: SearchTrainsComponent, title: 'Train Tickets Search'},
    {path: 'settings', component: SettingsComponent, title: 'Settings'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
