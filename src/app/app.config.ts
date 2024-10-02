import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};
