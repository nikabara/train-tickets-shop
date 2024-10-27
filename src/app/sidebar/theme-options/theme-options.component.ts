import { Component, OnInit, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-options',
  standalone: true,
  providers: [NgModel],
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './theme-options.component.html',
  styleUrl: './theme-options.component.sass'
})
export class ThemeOptionsComponent implements OnInit {
  selected: string | null | undefined = null;

  @Output() themeToSidebar = new EventEmitter<string>();

  changeTheme(theme: string) {
    console.log("Child " + theme + " | " + this.themeToSidebar.emit(theme))
    this.themeToSidebar.emit(theme);
  }

  ngOnInit(): void {
    const theme = localStorage.getItem("theme");
    this.selected = theme ? `${theme[0].toUpperCase()}${theme.slice(1)}` : '';
  }

}
