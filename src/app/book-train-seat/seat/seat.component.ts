import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Seat } from '../../Interfaces/Seat.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.sass'
})
export class SeatComponent {
  @Input() seatInfo!: Seat; 
  @Input() vagonClass!: string;

  @Output() onSeatData: EventEmitter<Seat> = new EventEmitter();


  seatChecked: boolean = false;

  toggleSeatCheck() : void {
    this.seatChecked = !this.seatChecked;
  }


  public emitSeatData() : void {
    this.onSeatData.emit(this.seatInfo);
  }

  public dataLog() {
    console.log(this.seatInfo);
  }
}



