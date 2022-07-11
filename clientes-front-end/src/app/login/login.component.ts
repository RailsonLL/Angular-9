import { Usuario } from './usuario';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  onSubmit() {
    //this.router.navigate(["/home"]);
  }

  preparaCadastro(event) {
    event.preventDefault(); //impede que o evento padrão seja acionado - no caso o HREF
    this.cadastrando = true;
  }

  cancelarCadastro() {
    this.cadastrando = false;
    this.errors = null;
    this.mensagemSucesso = null;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe(
      response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.errors = null;
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.mensagemSucesso = null;
      });
  }

}
