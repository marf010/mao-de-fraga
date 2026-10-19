import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage implements AfterViewInit, OnDestroy {

  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  private observer?: IntersectionObserver;

  // Estado do menu hambúrguer (mobile)
  menuOpen = signal(false);

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

  // Os parágrafos ".passo" aparecem com animação ao entrarem no ecrã
  ngAfterViewInit(): void {

    // Só procura dentro deste componente (e não em todo o documento)
    const items = this.host.nativeElement.querySelectorAll('.passo');

    // Sem suporte (ex.: servidor), mostra tudo de imediato
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach(item => item.classList.add('show'));
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // já apareceu: deixa de ser observado
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    items.forEach(item => this.observer?.observe(item));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}