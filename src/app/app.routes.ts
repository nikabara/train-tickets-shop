import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'search-trains', component: SearchTrainsComponent, title: 'Train Tickets Search'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
