import { Component, output } from '@angular/core';

const COLORS = ['#ffeb3b', '#ff9800', '#f44336', '#9c27b0'];

@Component({
  selector: 'app-highlight-pannel',
  imports: [],
  templateUrl: './highlight-pannel.html',
  styleUrl: './highlight-pannel.scss',
})
export class HighlightPannel {
  underlineColorSelected = output<string>();
  highlightColorSelected = output<string>();

  colors = COLORS;
  selectedUnderlineColor: number = 0;
  selectedHighlightColor: number = 0;

  ngOnInit() {
    // Инициализация с дефолтными цветами
    this.underlineColorSelected.emit(COLORS[0]);
    this.highlightColorSelected.emit(COLORS[0] + '33'); // Прозрачный фон
  }

  selectUnderline(index: number) {
    this.selectedUnderlineColor = index;
    this.underlineColorSelected.emit(COLORS[index]);
  }

  selectHighlight(index: number) {
    this.selectedHighlightColor = index;
    this.highlightColorSelected.emit(COLORS[index] + '33');  // Прозрачный фон
  }
}
