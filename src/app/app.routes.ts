import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { SettingsComponent } from './settings/settings.component';
import { BookTrainSeatComponent } from './book-train-seat/book-train-seat.component';
import { BookedTicketsComponent } from './booked-tickets/booked-tickets.component';
import { TicketPdfComponent } from './ticket-pdf/ticket-pdf.component';
import { authGuardGuard } from './guards/auth-guard/auth-guard.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnderDevelopmentComponent } from './under-development/under-development.component';
import {NewsComponent} from "./news/news.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'home', component: HomeComponent, title: 'Home'},
  {
    path: 'news', 
    title: 'News',
    loadComponent: () => import('./news/news.component')
      .then((m) => m.NewsComponent), 
  },
  {path: 'sign-up', component: SignUpComponent, title: 'Sign Up'},
  {path: 'search-trains', component: SearchTrainsComponent, title: 'Train Tickets Search', canActivate: [authGuardGuard]},
  {path: 'settings', component: SettingsComponent, title: 'Settings', canActivate: [authGuardGuard]},
  {
    path: 'book-train-seats', 
    title: 'Book Train Seat', 
    canActivate: [authGuardGuard],
    loadComponent: () => import('./book-train-seat/book-train-seat.component')
      .then((m) => m.BookTrainSeatComponent), 
  },
  {
    path: 'my-tickets', 
    loadComponent: () => import('./booked-tickets/booked-tickets.component').then((m) => m.BookedTicketsComponent), 
    title: 'My tickets', 
    canActivate: [authGuardGuard]
  },
  {path: 'ticket-pdf', component: TicketPdfComponent, title: 'Ticket PDF', canActivate: [authGuardGuard]},
  {path: 'under-development', component: UnderDevelopmentComponent, title: 'Under Development'},
  {path: 'error', component: PageNotFoundComponent, title: 'Page Not Found'},
  {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'}
];
