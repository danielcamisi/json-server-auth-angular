import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service'; // Importe o serviço de autenticação

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService, // Injete o serviço de autenticação
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.email], // Adicione validação de email
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        response => {
          alert('Logado com Sucesso');
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert('O Usuário não foi encontrado ou credenciais inválidas');
          console.error('Erro de login:', error);
        }
      );
    } else {
      alert('Por favor, preencha o formulário corretamente');
    }
  }
}