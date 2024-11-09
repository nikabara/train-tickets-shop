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

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
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

