import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { SettingsComponent } from './settings/settings.component';
import { BookTrainSeatComponent } from './book-train-seat/book-train-seat.component';
import { BookedTicketsComponent } from './booked-tickets/booked-tickets.component';
import { TicketPdfComponent } from './ticket-pdf/ticket-pdf.component';
import { authGuardGuard } from './guards/auth-guard/auth-guard.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'search-trains', component: SearchTrainsComponent, title: 'Train Tickets Search', canActivate: [authGuardGuard]},
    {path: 'settings', component: SettingsComponent, title: 'Settings'},
    {path: 'book-train-seats', component: BookTrainSeatComponent, title: 'Book Train Seat', canActivate: [authGuardGuard]},
    {path: 'my-tickets', component: BookedTicketsComponent, title: 'My tickets', canActivate: [authGuardGuard]},
    {path: 'ticket-pdf', component: TicketPdfComponent, title: 'Ticket PDF', canActivate: [authGuardGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
