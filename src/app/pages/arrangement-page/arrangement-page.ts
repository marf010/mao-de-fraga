import { Component, signal } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { NgFor } from '@angular/common';
import { ArrangementService, Arranjos } from '../../services/arrangement';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-arrangement-page',
  imports: [Navbar, NgFor, RouterLink],
  templateUrl: './arrangement-page.html',
  styleUrl: './arrangement-page.scss',
})
export class ArrangementPage {

  arrangements = signal<Arranjos[]>([]);

  constructor(
    private arranjoService: ArrangementService,
  ) {}

  ngOnInit(): void {

    this.arranjoService.getArranjos().subscribe({

      next: (data) => {
        console.log('Arranjos recebidas:', data);

        this.arrangements.set(data);

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
