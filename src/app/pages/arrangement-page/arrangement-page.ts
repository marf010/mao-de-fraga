import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArrangementService, Arranjos } from '../../services/arrangement';

@Component({
  selector: 'app-arrangement-page',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './arrangement-page.html',
  styleUrl: './arrangement-page.scss',
})
export class ArrangementPage implements OnInit {

  arrangements = signal<Arranjos[]>([]);

  // Estado do menu hambúrguer (mobile)
  menuOpen = signal(false);

  constructor(
    private arranjoService: ArrangementService,
  ) {}

  ngOnInit(): void {

    this.arranjoService.getArranjos().subscribe({

      next: (data) => {
        this.arrangements.set(data);
      },

      error: (error) => {
        console.error(
          'Erro ao carregar os arranjos:',
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