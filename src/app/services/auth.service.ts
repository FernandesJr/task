import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(creds: Credenciais): Observable<Token> {
    return this.http.post<Token>(
        `${API_CONFIG.baseUrl}/auth`,
        creds
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token'); // Obtém o token salvo

    if (!token) return false;
    var decode = this.jwtHelper.decodeToken(token);
    //Poderia fazer uma request para saber se este user contém no DB
    //Além de validar a expiração do token validaria o email, porém, a quantidade de consultas aumentaria significativamente
    var email = decode.sub;
    return !this.jwtHelper.isTokenExpired(token); // Verifica se o token está expirado
  }

  public successAuth(token: any) {
    localStorage.setItem("access_token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

}
