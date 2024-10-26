import { Component, OnInit, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-language-options',
  standalone: true,
  providers: [NgModel],
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './language-options.component.html',
  styleUrl: './language-options.component.sass'
})
export class LanguageOptionsComponent implements OnInit {
  selected: string | null = null;

  ngOnInit(): void {
    this.selected = localStorage.getItem("language");
  }

}
