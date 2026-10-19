
import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  finalize,
  timeout
} from 'rxjs';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  login(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { name, password } = this.loginForm.getRawValue();

    this.authService
      .login(name, password)
      .pipe(
        timeout({ first: 10000 }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          // O AuthService trata do token e do redirecionamento.
        },

        error: (error) => {
          console.error('Erro no login:', error);

          if (error.status === 401) {
            this.errorMessage =
              'Nome ou password incorretos.';
          } else if (error.status === 400) {
            this.errorMessage =
              'Preencha todos os campos.';
          } else if (error.name === 'TimeoutError') {
            this.errorMessage =
              'O servidor demorou demasiado tempo a responder.';
          } else {
            this.errorMessage =
              'Não foi possível contactar o servidor. Verifique se o backend está ligado.';
          }
        }
      });
  }
}