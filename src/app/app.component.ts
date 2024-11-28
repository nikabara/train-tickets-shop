import { FooterComponent } from './footer/footer.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from './navbar/navbar.component';
import Swal from 'sweetalert2';
import { SettingsComponent } from "./settings/settings.component";
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { LoaderService } from './services/loader.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SweetAlert2Module,
    SidebarComponent,
    NavbarComponent,
    SettingsComponent,
    MatProgressBarModule,
    CommonModule,
    FooterComponent
],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'train-tickets-shop';

  colorTheme: string = 'light';
  
  isBarHidden:boolean = true;

  constructor(public loaderService: LoaderService, private breakpointObserver: BreakpointObserver, private translateService: TranslateService) { }

  onThemeChange(theme: string) {
    console.log("Main " + theme + " Color theme " + this.colorTheme);
    this.colorTheme = theme;
  }

  ngOnInit() : void {
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('language')) {
      this.translateService.use('eng');
      localStorage.setItem('language', 'eng');
    }
    else if (typeof localStorage !== 'undefined') {
      this.translateService.use(localStorage.getItem('language') ?? 'eng');
    }

    this.breakpointObserver.observe(['(max-width: 1000px)']).subscribe(result => {
      if (result.matches) {
        this.isBarHidden = true;
      }
      else {
        this.isBarHidden = false;
      }
    })
  }


  ngOnDestroy() : void {

  }

}
