import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from './navbar/navbar.component';
import Swal from 'sweetalert2';
import { SettingsComponent } from "./settings/settings.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SweetAlert2Module, SidebarComponent, NavbarComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'train-tickets-shop';

  colorTheme: string = 'light';

  onThemeChange(theme: string) {
    console.log("Main " + theme + " Color theme " + this.colorTheme);
    this.colorTheme = theme;
  }

}
