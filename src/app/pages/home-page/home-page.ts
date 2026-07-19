import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';

@Component({
  selector: 'app-home-page',
  imports: [Carousel],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
