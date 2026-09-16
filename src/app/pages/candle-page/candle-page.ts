import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Navbar } from '../../core/components/navbar/navbar';
import { RouterLink } from "@angular/router";
import { CandleService, Vela } from '../../services/candle';

@Component({
  selector: 'app-candle-page',
  standalone: true,
  imports: [Navbar, NgFor, RouterLink],
  templateUrl: './candle-page.html',
  styleUrl: './candle-page.scss',
})
export class CandlePage implements OnInit {

  candles = signal<Vela[]>([]);

  constructor(
    private velaService: CandleService,
    // private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.velaService.getVelas().subscribe({

      next: (data) => {
        console.log('Velas recebidas:', data);

        this.candles.set(data);

        // this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Erro ao carregar as velas:',
          error
        );
      }

    });

  }
}