import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { EditorComponent } from '../editor/editor.component';

export interface Status {
  name: string;
  key: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(500) // Configurações de animação fadeInOut
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  projetos$: Observable<Projeto[]> = of([]); // Inicializa com um Observable de um array vazio
  nomeProjeto: string = '';
  descProjeto: string = '';
  statusSelecionado: Status = { name: '', key: '' };

  status: Status[] = [
    { name: 'Disponível', key: 'C' },
    { name: 'Em processo', key: 'E' },
    { name: 'Concluído', key: 'F' }
  ];

  constructor(
    private projetoService: ProjetoService,
    public dialog: DialogService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService // Serviços injetados diretamente no constructor
  ) {
    this.primengConfig.setTranslation({
      accept: 'Sim',
      reject: 'Não' // Configurações de tradução para os componentes do PrimeNG
    });
  }

  ngOnInit() {
    this.carregarProjetos(); // Carrega a lista de projetos ao inicializar o componente
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos().pipe(
      defaultIfEmpty([]) // Garante que o Observable sempre emita um array, mesmo que vazio
    );
  }

  addProjeto() {
    if (!this.nomeProjeto || !this.descProjeto || !this.statusSelecionado.key) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Todos os campos devem estar preenchidos',
        life: 3000
      });
      return;
    }
  
    const novoProjeto: Projeto = {
      id: 0, // ou outro valor padrão
      nome: 'Novo Projeto',
      descprojeto: 'Descrição do projeto',
      status: 'Disponível', // ou outro status inicial
      subtarefas: [] // Inicialmente vazio
    };
  
    this.projetoService.addProjeto(novoProjeto).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Projeto criado com sucesso',
          life: 2500
        });
        this.carregarProjetos();
        this.resetForm();
      },
      error => {
        console.error('Erro ao criar projeto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar projeto',
          life: 3000
        });
      }
    );
  }

  private resetForm() {
    this.nomeProjeto = '';
    this.descProjeto = '';
    this.statusSelecionado = { name: '', key: '' };
  }

  openDialog() {
    this.dialog.open(EditorComponent, {});
  }
}