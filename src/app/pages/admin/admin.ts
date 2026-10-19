import {
  Component,
  inject
} from '@angular/core';

import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule   // routerLink e routerLinkActive usados no admin.html
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {

  private authService = inject(AuthService);

  // Usadas no menu lateral e nos cartões do painel
  readonly categories = [
    {
      path: '/admin/soaps',
      name: 'Sabonetes',
      icon: '◈',
      tone: 'soap',
      description: 'Adiciona, edita e elimina os sabonetes da loja.',
      action: 'Gerir sabonetes'
    },
    {
      path: '/admin/candles',
      name: 'Velas',
      icon: '◉',
      tone: 'candle',
      description: 'Adiciona, edita e elimina as velas da loja.',
      action: 'Gerir velas'
    },
    {
      path: '/admin/arrangements',
      name: 'Arranjos',
      icon: '✿',
      tone: 'arrangement',
      description: 'Adiciona, edita e elimina os arranjos da loja.',
      action: 'Gerir arranjos'
    }
  ];

  logout(): void {
    this.authService.logout();
  }

}