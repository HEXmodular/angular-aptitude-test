import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-docs-list',
  imports: [],
  templateUrl: './docs-list.html',
  styleUrl: './docs-list.scss',
})
export class DocsList {
  docs = input<any[]>();
  docSelected = output<number>(); 
}
