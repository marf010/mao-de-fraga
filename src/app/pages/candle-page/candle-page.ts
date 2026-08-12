import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Navbar } from "../../core/components/navbar/navbar";

@Component({
  selector: 'app-candle-page',
  imports: [Navbar, NgFor],
  templateUrl: './candle-page.html',
  styleUrl: './candle-page.scss',
})
export class CandlePage {
  products = [
      {
      name: 'Sabonete de Eucalipto',
      // description: '', 
      image: 'eucalipto.png'
    }
  ];

}
