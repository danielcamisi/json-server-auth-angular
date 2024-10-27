import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService,MessageService, PrimeNGConfig } from 'primeng/api';


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
        animate(500)
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
    { name: 'Concluído', key: 'C' },
    { name: 'Em Andamento', key: 'E' },
    { name: 'Inativo', key: 'I' },
    { name: 'Finalizado', key: 'F' }
  ];

  constructor(
    private projetoService: ProjetoService, 
    public dialog: DialogService,
    private confirmationService: ConfirmationService, 
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService

  ) 
{
  this.primengConfig.setTranslation({
  accept: 'Sim',
  reject: 'Não',
    
  });
}

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos().pipe(
      defaultIfEmpty([]) // Garante que sempre retorne um array
    );
  }

  addProjeto() {
    if(!this.nomeProjeto || !this.descProjeto || !this.statusSelecionado.key){
      this.messageService.add({
        severity:'error',
        summary: 'Erro',                                         //verificação na criação do projeto
        detail: 'Todos os campos devem estar preenchidos',
        life: 3000
      });
    } else {
      this.messageService.add({
        severity:'success',
        summary: 'Sucesso',
        detail: 'Projeto criado com sucesso',
        life: 2500
      });
      return;
    }

    const novoProjeto: Omit<Projeto, 'id'> = {
      nome: this.nomeProjeto,
      descprojeto: this.descProjeto,                                //atribuição de valores pelo input
      Status: this.statusSelecionado,
    };

    this.projetoService.addProjeto(novoProjeto).subscribe(() => {
      this.carregarProjetos();                                                //atribuindo valores ao banco de dados
      this.resetForm();
    });
  }

  private resetForm() {
    this.nomeProjeto = '';
    this.descProjeto = '';
    this.statusSelecionado = { name: '', key: '' };
  }
}