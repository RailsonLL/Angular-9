import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { CaixaAltaPipe } from '../shared/pipes/caixa-alta.pipe';


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListaComponent,
    CaixaAltaPipe
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule
  ],
  exports: [
    ClientesFormComponent,
    ClientesListaComponent
  ]
})
export class ClientesModule { }
