import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-about-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {  
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    document.querySelectorAll('.passo').forEach(item => {
      observer.observe(item);
    });
  }
}
