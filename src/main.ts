import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// (process as any).env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// "options": {
//   "proxyConfig": "proxy.conf.json"
// },