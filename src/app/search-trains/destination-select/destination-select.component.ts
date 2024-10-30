import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-destination-select',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './destination-select.component.html',
  styleUrl: './destination-select.component.sass'
})
export class DestinationSelectComponent {
  @Input() purpose!: string;

  selection!: string;

  cities: any[] = [
    { value: 'Tbilisi', viewValue: 'Tbilisi' },
    { value: 'Batumi', viewValue: 'Batumi' },
    { value: 'Foti', viewValue: 'Foti' },
  ];

  onSelectionChange(event: any) : void {
    console.log(event.value);
    this.selection = event.value;
  }

  @Output() cityChange = new EventEmitter();

  onCityChange() {
    console.log(this.selection, "selection")
    this.cityChange.emit(this.selection);
  }
}
