import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.token = response.accessToken;
        if (this.token) {
          localStorage.setItem('token', this.token); // Garante que this.token seja uma string
        }
      })
    );
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name });
  }

  isAuthenticated(): boolean {
    return this.token !== null || localStorage.getItem('token') !== null;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}