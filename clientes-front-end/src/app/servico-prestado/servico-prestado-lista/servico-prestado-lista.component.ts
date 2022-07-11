import { ServicoPrestadoService } from './../../servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  listaServicos: ServicoPrestadoBusca[];
  mensagem: string;


  constructor( private service: ServicoPrestadoService ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit() {
  }

  consultar() {
    this.service.buscar(this.nome, this.mes).subscribe(
      response => {
        this.listaServicos = response
        if (this.listaServicos.length <= 0) {
          this.mensagem = "Nenhum registro encontrado."
        } else {
          this.mensagem = null;
        }
      }
    );
  }

}


