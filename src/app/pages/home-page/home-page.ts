import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Carousel } from '../../components/carousel/carousel';

@Component({
  selector: 'app-home-page',
  imports: [Carousel],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  constructor(private router: Router) {}

  irParaColecao() {
    this.router.navigate(['/velas']);
  }

  irParaSobre() {
    this.router.navigate(['/sobre']);
  }
}