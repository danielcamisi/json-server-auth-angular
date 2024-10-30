import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),                  //configurações de animção fadeInOut
      transition(':enter, :leave', [
        animate(500)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,       //serviço injetados direto no constructor para não utilizar o @inject OBS: ocorre erro ao utilizar @Inject com 'return's no código
    private router: Router,
    private messageService: MessageService,
  ) 
{}

ngOnInit(): void {
  this.loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]], // Corrigido: validadores em array
    password: ['', Validators.required]
  });
}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(  //aqui o methodo login efetua uma verificação no db.json através do serviço authService, para encontrar o usuário já presente no db
        response => {;
          this.messageService.add({
            severity:'success',
            summary: 'Sucesso',
            detail: 'Você foi Logado com Sucesso!',
            life: 3000
          });
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.messageService.add({
            severity: 'error', 
            summary: 'Erro', 
            detail: 'O Usuário não foi encontrado ou credenciais inválidas', 
            life: 3000
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Atenção', 
        detail: 'Por favor, preencha todos os campos corretamente', 
        life: 3000
      });
    }
  }
}