import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [                         //configurações de animção fadeInOut
        animate(500)                                  
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  public signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,                           
    private http: HttpClient,        //serviço injetados direto no constructor para não utilizar o @inject OBS: ocorre erro ao utilizar @Inject com 'return's no código
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],                            //validação de todos os campos necessário para o registro de usuário
      password1: ["", Validators.required]                           
    }, { validators: this.samething });
  }

  samething(group: FormGroup) {
    const senha1 = group.get('password')?.value;                    //etapa de validação de confirmação de senha
    const senha2 = group.get('password1')?.value;
    return senha1 === senha2 ? null : { notMatching: true };
  }

  signUp() {
    if (this.signUpForm.valid) { // Verificar validade do formulário
      this.http.post<any>("http://localhost:3000/users", this.signUpForm.value)        //execução do metodo post direto no db.json /backend usando a verificação como parâmetro
      .subscribe(_res => {                                                             //do outro method criado signUpForm, logo se ele for válido o usuário será criado.
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Você foi registrado com Sucesso',              //exibição de mensagens de sucesso ou erro
          life: 3000
        });
        this.signUpForm.reset();
        this.router.navigate(["login"]);
      }, err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Houve algum erro',
          life: 5000
        });
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Formulário inválido',
        life: 3000
      });
    }
  }
}