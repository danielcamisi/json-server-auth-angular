import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/auth.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { ProjetoService } from '../../core/projeto.service';
import { Projeto } from '../../core/projeto.models';
import { DataService } from '../../core/data.service';

interface Task {
  pending: string;
  tarefaalterada: string;
  desc: string;
  stats: string;
  id: number;
  completedDate?: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [MessageService]
})
export class LayoutComponent implements OnInit {
  itens: MenuItem[] | undefined;
  links: MenuItem[] | undefined;
  displayReminder: boolean = false;
  dailyReminderMessage: string = '';
  projetosFiltrados: Projeto[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService,
    private projetoService: ProjetoService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.links = [
      { label: 'Muito obrigado pelo acesso' }
    ];
  
    this.itens = [
      { label: 'Gerenciador de Projetos', icon: 'pi pi-home', routerLink: 'dashboard', command: () => this.Spinnerhow() },
      { label: 'Lista de Projetos', icon: 'pi pi-star', routerLink: 'projects', command: () => this.Spinnerhow() },
      { label: 'Agenda', icon: 'pi pi-star', routerLink: 'agenda', command: () => this.Spinnerhow()},
      { label: 'Entrar', icon: 'pi pi-star', routerLink: 'login', command: () => this.Spinnerhow() },
      { label: 'Registrar', icon: 'pi pi-star', routerLink: 'register', command: () => this.Spinnerhow() }
      
    ];
  
    this.primengConfig.setTranslation({ accept: 'Sim', reject: 'Não' });

    // Configurar o lembrete diário
    this.setupDailyReminder();
  }
  setupDailyReminder() {
    this.dataService.getPub().subscribe(data => {
      console.log('Dados recebidos:', data);
  
      const now = moment();
      const last24Hours = moment().subtract(24, 'hours');
  
      const recentTasks = data.filter((task: Task) => {  // Defina o tipo do parâmetro 'task' como 'Task'
        const taskCompletedDate = moment(task.completedDate);
        return taskCompletedDate.isAfter(last24Hours) && taskCompletedDate.isBefore(now);
      });
  
      let taskMessages = '';
      if (recentTasks.length > 0) {
        taskMessages = '<ul>' + recentTasks.map((task: Task) =>  // Defina o tipo do parâmetro 'task' como 'Task'
          `<li>Fulano, estou trabalhando na tarefa <strong>${task.tarefaalterada}</strong>. Ontem eu fiz <strong>${task.desc}</strong>, e ainda falta fazer <strong>${task.pending}</strong>.</li>`
        ).join('') + '</ul>';
      }
  
      this.projetoService.getProjetos().subscribe(projetos => {
        this.projetosFiltrados = projetos.filter(projeto =>
          projeto.status === 'Disponível' || projeto.status === 'Em processo'
        );
  
        let projectMessages = '';
        if (this.projetosFiltrados.length > 0) {
          projectMessages = '<ul>' + this.projetosFiltrados.map(projeto =>
            `<li>${projeto.nome} - ${projeto.status}</li>`
          ).join('') + '</ul>';
        }
  
        if (taskMessages || projectMessages) {
          this.dailyReminderMessage = `<h4>Tarefas Recentes</h4>${taskMessages}<h4>Projetos Disponíveis e Em Processo</h4>${projectMessages}`;
          this.displayReminder = true;
        }
      }, error => {
        console.error('Erro ao obter projetos:', error);
      });
    }, error => {
      console.error('Erro ao obter dados:', error);
    });
  }
  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Tem certeza de que deseja sair?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => { this.logout(); },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Você permanece logado',
          life: 3000
        });
      }
    });
  }

  Spinnerhow() {
    this.spinner.show();
    setTimeout(() => { this.spinner.hide(); }, 2000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}