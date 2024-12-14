import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.sass'
})
export class ExpansionPanelComponent {
  @Input() title!: string;
  @Input() content!: string;

  readonly panelOpenState = signal(false);
}
