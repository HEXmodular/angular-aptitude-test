import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsComponent } from './components/docs/docs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DocsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('docs-app');
}
