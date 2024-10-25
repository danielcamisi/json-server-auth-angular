import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(500)
      ])
    ])
  ]
})
export class RegisterComponent {
  public signUpForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private messageService: MessageService

  )
{}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [""],
      email: [""],
      password: [""]
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/users",this.signUpForm.value)
    .subscribe(_res=>{
     this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Você foi registrado com Sucesso',
      life: 3000
     });
      this.signUpForm.reset()
      this.router.navigate(["login"])
    },err=>{
      this.messageService.add({
        severity:'error',
        summary: 'Erro',
        detail: 'Algo aconteceu de erro',
        life: 5000
      });
    });
  }
}