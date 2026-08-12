import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTop } from "./shared/back-to-top/back-to-top";
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('maosdefraga');
}
