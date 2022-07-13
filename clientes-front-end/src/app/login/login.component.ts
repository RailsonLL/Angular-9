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
    ) {
      localStorage.removeItem('access_token');
    }

  onSubmit() {
    if (!this.cadastrando){
      this.authService.tentarLogar(this.username, this.password).subscribe(
        response => {
          const access_token = JSON.stringify(response); //salva o JSON como string
          localStorage.setItem('access_token', access_token); //armazena o token JWT gerado no login em localStorage para utilizar na autentitação das APIs
          this.router.navigate(["/home"]);
        }, error => {
          this.mensagemSucesso = null;
          this.errors = ['Usuário e/ou senha incorreto(s).'];
        }
      )
    }
  }

  preparaCadastro(event) {
    event.preventDefault(); //impede que o evento padrão seja acionado - no caso o HREF
    this.cadastrando = true;
  }

  cancelarCadastro() {
    this.cadastrando = false;
    this.errors = [];
    this.mensagemSucesso = null;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe(
      response => {
        console.log(response);
        this.errors = [];
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.username = '';
        this.password = '';
        this.cadastrando = false;
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.mensagemSucesso = null;
      });
  }

}
