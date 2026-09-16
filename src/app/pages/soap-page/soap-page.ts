import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
// import { Navbar } from '../../core/components/navbar/navbar';
import { RouterLink } from "@angular/router";
import { SaboneteService, Sabonete } from '../../services/soap';

@Component({
  selector: 'app-soap-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './soap-page.html',
  styleUrl: './soap-page.scss',
})
export class SoapPage implements OnInit {

  soaps = signal<Sabonete[]>([]);

  constructor(
    private saboneteService: SaboneteService
  ) {}

  ngOnInit(): void {

    this.saboneteService.getSabonetes().subscribe({

      next: (data) => {
        console.log('Sabonetes recebidos:', data);

        this.soaps.set(data);
      },

      error: (error) => {
        console.error(
          'Erro ao carregar os sabonetes:',
          error
        );
      }

    });

  }

    menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}