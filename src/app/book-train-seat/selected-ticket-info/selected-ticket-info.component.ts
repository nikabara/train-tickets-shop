import { Component, Input } from '@angular/core';
import { Seat } from '../../Interfaces/Seat.interface';

@Component({
  selector: 'app-selected-ticket-info',
  standalone: true,
  imports: [],
  templateUrl: './selected-ticket-info.component.html',
  styleUrl: './selected-ticket-info.component.sass'
})
export class SelectedTicketInfoComponent {
  @Input() seatData!: Seat;
}
