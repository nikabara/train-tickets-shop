import { FooterComponent } from './footer/footer.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { HomeComponent } from './home/home.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SweetAlert2Module,
    SidebarComponent,
    NavbarComponent,
    // SettingsComponent,
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
  @ViewChild(HomeComponent) homeComponent!: HomeComponent;

  callHomeFunction(): void {
    if (this.homeComponent) {
      this.homeComponent.swalSignInWindow(); // Call the specific function
    } else {
      console.warn('HomeComponent is not initialized');
    }
  }

  // title = 'train-tickets-shop';

  colorTheme: string = 'light';
  
  isBarHidden:boolean = true;

  constructor(public loaderService: LoaderService, 
    private breakpointObserver: BreakpointObserver, 
    private translateService: TranslateService,
    private title: Title,
    private meta: Meta 
  ) { }

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

    this.title.setTitle("railwaytickets")

    this.meta.addTags([
      { name: "author", content: "Nikoloz Baratashvili" },
      { name: "description", content: "#1 Railway tickets selling web-app in Georgia" },
      { name: "keywords", content: "Railway, Tickets, Train, Georgia, Buy tickets online, რკინიგზა" },
      { name: "robots", content: "index, follow" }, // Allows search engines to index the page
      { name: "viewport", content: "width=device-width, initial-scale=1" }, // Responsive design
      { name: "theme-color", content: "#ffffff" }, // Custom browser theme color (use your brand color)
      { name: "language", content: "en" }, // Specify content language
      { name: "geo.region", content: "GE" }, // Geo-specific (ISO 3166 country code)
      { name: "geo.placename", content: "Tbilisi" }, // Location
      { name: "geo.position", content: "41.7151;44.8271" }, // Latitude/Longitude
      { name: "ICBM", content: "41.7151, 44.8271" }, // Alternate Geo meta for old systems
    ]);
    
  }


  ngOnDestroy() : void { }



}
