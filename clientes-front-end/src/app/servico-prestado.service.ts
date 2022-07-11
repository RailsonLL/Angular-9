import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + "/api/servicos";

  constructor( private http: HttpClient ) { }

  salvar(servico: ServicoPrestado): Observable<any> {
    return this.http.post(this.apiURL, servico);
  }

  buscar(nome: string, mes: number): Observable<any> {
    const httpParams = new HttpParams()
                             .set("nome", nome)
                             .set("mes", mes ? mes.toString() : '');

    const url = this.apiURL + "?" + httpParams.toString();
    return this.http.get(url);
  }

}
