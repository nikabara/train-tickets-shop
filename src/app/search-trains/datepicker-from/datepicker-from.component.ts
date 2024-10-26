import { Component, Input } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter(), NgModel],
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './datepicker-from.component.html',
  styleUrl: './datepicker-from.component.sass'
})
export class DatepickerComponent {
  // @Output() calendarComponentData = new EventEmitter<string>();
  // sendData() {
    //   console.log("first")
    //   this.calendarComponentData.emit(this.selectedDate ?? '');
    // }
    
  @Input() purpose: string = '';
  
  selectedDate: string | null = null;

}
