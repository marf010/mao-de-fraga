import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'https://mao-de-fraga.onrender.com/';

  isAuthenticated = signal(
    !!localStorage.getItem('admin_token')
  );

  login(name: string, password: string) {

    console.log('A tentar fazer login...');

    return this.http
      .post<{ token: string }>(
        `${this.apiUrl}/admin/login`,
        {
          name,
          password
        }
      )
      .pipe(

        tap(({ token }) => {

          console.log('Login aceite pelo backend');

          localStorage.setItem(
            'admin_token',
            token
          );

          this.isAuthenticated.set(true);

          this.router.navigate(['/admin']);

        })

      );
  }

  logout() {

    localStorage.removeItem(
      'admin_token'
    );

    this.isAuthenticated.set(false);

    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {

    return this.isAuthenticated();

  }

}