import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { SettingsComponent } from './settings/settings.component';
import { BookTrainSeatComponent } from './book-train-seat/book-train-seat.component';
import { BookedTicketsComponent } from './booked-tickets/booked-tickets.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'search-trains', component: SearchTrainsComponent, title: 'Train Tickets Search'},
    {path: 'settings', component: SettingsComponent, title: 'Settings'},
    {path: 'book-train-seats', component: BookTrainSeatComponent, title: 'Book Train Seat'},
    {path: 'my-tickets', component: BookedTicketsComponent, title: 'My tickets'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
