import { Component, Input } from '@angular/core';
import { Score } from '../../interfaces/score.interface';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  displayedColumns: string[] = ['round', 'player'];

  @Input() dataSource!: Score[];
}
