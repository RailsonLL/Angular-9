import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private activatedRoute: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit() {
    let params = this.activatedRoute.params;
    params.subscribe(
      param => {
        this.id = param.id;
      }
    );

    if (this.id > 0) {
      this.service.getClientesById(this.id).subscribe(
              response => this.cliente = response
            );
    }
  }

  onSubmit() {
    if (this.id) {

      this.service.atualizar(this.cliente).subscribe(
        response => {
          this.success = true;
          this.errors = null;
        },
        errorResponse => {
          this.success = false;
          this.errors = ['Erro ao atualizar o cliente.'];
        }
        )
    } else {

      this.service.salvar(this.cliente).subscribe(
        response => { //primeiro callback retorna success
          this.success = true;
          this.errors = null;
          this.cliente = response;
        },
        errorResponse => { //segundo callback retorna quando ocorreu algum erro
          console.log(errorResponse);
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
        )
    }

  }

}
