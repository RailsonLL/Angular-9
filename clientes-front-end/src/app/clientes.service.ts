import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor( private http: HttpClient ) { }

  salvar( cliente: Cliente ): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  atualizar( cliente: Cliente ): Observable<any> {
    return this.http.put(`${this.apiURL}/${cliente.id}`, cliente);
  }

  deletar( cliente: Cliente ): Observable<any> {
    return this.http.delete(`${this.apiURL}/${cliente.id}`);
  }

  getClientes(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  getClientesById( id: number ): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

}
