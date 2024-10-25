import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/auth.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService, MessageService]
})
export class LayoutComponent implements OnInit {
  itens: MenuItem[] | undefined;

  constructor(private authService: AuthService, 
     private router: Router, 
     private confirmationService: ConfirmationService,
     private messageService: MessageService,
     private primengConfig: PrimeNGConfig,
     private spinner: NgxSpinnerService
    )
  {}

  ngOnInit() {
    this.itens = [
      {
        label: 'Gerenciador de Projetos',
        icon: 'pi pi-home',
        routerLink: 'dashboard',
        command:() => this.Spinnerhow()
      },
      {
        label: 'Lista de Projetos',
        icon: 'pi pi-star',
        routerLink: 'projects',
        command:() => this.Spinnerhow()
      },
      {
        label: 'Logar',
        icon: 'pi pi-star',
        routerLink: 'login',
        command:() => this.Spinnerhow()
      },
      {
        label: 'Registrar',
        icon: 'pi pi-star',
        routerLink: 'register',
        command:() => this.Spinnerhow()
      }
    ];
  
    this.primengConfig.setTranslation({
      accept: 'Sim',
      reject: 'Não'
    });
  }

  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined, // Posiciona o popup junto ao botão
      message: 'Tem certeza de que deseja sair?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.logout(); // Executa o logout ao aceitar
      },
      reject: () => {
        this.messageService.add({
          severity: 'info', 
          summary: 'Cancelado', 
          detail: 'Você permanece logado',
          life: 3000
        }); // Exibe mensagem ao rejeitar
      }
    });
  }

  Spinnerhow(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    }, 3000)
  }
  
  logout() {
    this.authService.logout(); // Chama o serviço de logout
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}


