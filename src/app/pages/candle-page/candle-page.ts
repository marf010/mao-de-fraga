import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CandleService, Vela } from '../../services/candle';

@Component({
  selector: 'app-candle-page',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './candle-page.html',
  styleUrl: './candle-page.scss',
})
export class CandlePage implements OnInit {

  candles = signal<Vela[]>([]);

  // Estado do menu hambúrguer (mobile)
  menuOpen = signal(false);

  constructor(
    private velaService: CandleService
  ) {}

  ngOnInit(): void {

    this.velaService.getVelas().subscribe({

      next: (data) => {
        this.candles.set(data);
      },

      error: (error) => {
        console.error(
          'Erro ao carregar as velas:',
          error
        );
      }

    });

  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  // Tecla Esc fecha o menu
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}