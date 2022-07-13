import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; //pacote responsável pelas funcionalidades do token JWT

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/usuarios";
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( private http: HttpClient ) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean { //verifica se o token de autenticação JWT já expirou
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name; //retorna o usuário autenticado do token JWT
      return usuario;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  salvar( usuario: Usuario ): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }

  tentarLogar( username: string, password: string ): Observable<any> {
    const params = new HttpParams().set('username', username)
                                   .set('password', password)
                                   .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`), //btoa retorna a string codificada
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), { headers });
  }

}
