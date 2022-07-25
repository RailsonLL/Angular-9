import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { NumericoDirective } from '../shared/directives/numerico.directive';
import { MinimoValidatorDirective } from '../shared/directives/minimo-validator.directive';


@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent,
    NumericoDirective,
    MinimoValidatorDirective
  ],
  imports: [
    CommonModule,
    ServicoPrestadoRoutingModule,
    FormsModule,
    RouterModule
  ], exports: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent
  ]
})
export class ServicoPrestadoModule { }
