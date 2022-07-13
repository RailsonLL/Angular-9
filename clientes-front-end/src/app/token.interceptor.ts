import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable() //serviço utilizado para interceptar todas as requisições e inserir o token jwt
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenString = localStorage.getItem('access_token'); //busca o token jwt salvo no localStorage

    const url = req.url;

    if (tokenString && !url.endsWith('/oauth/token')) { //verifica se o token foi carregado e adiciona no Header a autenticação
      const token = JSON.parse(tokenString); //transforma a string em um JSON
      const jwt = token.access_token;
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      })
    }

    return next.handle(req);
  }

}
