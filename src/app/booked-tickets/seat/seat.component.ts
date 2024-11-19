import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.sass'
})
export class SeatComponent implements OnInit {
  @Input() person!: any;

  ngOnInit(): void {
    console.log(this.person, 'seatInfo');
  }
}
