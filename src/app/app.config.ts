import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

const firebaseConfig: any = {
  apiKey: "AIzaSyD__hDZbmHZ-ce5KF5DCd9wZ9VuONn8Xj4",
  authDomain: "train-tickets-shop.firebaseapp.com",
  projectId: "train-tickets-shop",
  storageBucket: "train-tickets-shop.firebasestorage.app",
  messagingSenderId: "9211983301",
  appId: "1:9211983301:web:154c09b65d9bb8901707ac",
  measurementId: "G-ZM5Z98SFPE"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

