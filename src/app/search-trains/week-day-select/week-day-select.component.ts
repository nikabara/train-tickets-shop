import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-week-day-select',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './week-day-select.component.html',
  styleUrl: './week-day-select.component.sass'
})
export class WeekDaySelectComponent {
  @Input() purpose!: string;

  selection!: string;

  // days: any[] = [
  //   { value: 'Monday', viewValue: 'Monday' },
  //   { value: 'Thuesday', viewValue: 'Thuesday' },
  //   { value: 'Wednesday', viewValue: 'Wednesday' },
  //   { value: 'Thursday', viewValue: 'Thursday' },
  //   { value: 'Friday', viewValue: 'Friday' },
  //   { value: 'Saturday', viewValue: 'Saturday' },
  //   { value: 'Sunday', viewValue: 'Sunday' },
  // ];

  days: any[] = [
    { value: 'ორშაბათი', viewValue: 'ორშაბათი' },
    { value: 'სამშაბათი', viewValue: 'სამშაბათი' },
    { value: 'ოთხშაბათი', viewValue: 'ოთხშაბათი' },
    { value: 'ხუთშაბათი', viewValue: 'ხუთშაბათი' },
    { value: 'პარასკევი', viewValue: 'პარასკევი' },
    { value: 'შაბათი', viewValue: 'შაბათი' },
    { value: 'კვირა', viewValue: 'კვირა' },
  ];

  onSelectionChange(event: any) : void {
    console.log(event.value);
    this.selection = event.value;
  }

  @Output() dayChange = new EventEmitter();

  onDayChange() {
    console.log(this.selection, "selection")
    this.dayChange.emit(this.selection);
  }
}
