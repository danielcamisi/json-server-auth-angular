import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';


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
        animate(500)                                  //configurações de animção fadeInOut
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
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService     //serviço injetados direto no constructor para não utilizar o @inject OBS: ocorre erro ao utilizar @Inject com 'return's no código

  ) 
{
  this.primengConfig.setTranslation({
  accept: 'Sim',
  reject: 'Não',                            // Configurações de tradução para os componentes do PrimeNG
    
  });
}

  ngOnInit() {
    this.carregarProjetos();         // Carrega a lista de projetos ao inicializar o componente
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos().pipe(
      defaultIfEmpty([])   // Garante que o Observable sempre emita um array, mesmo que vazio
    );
  }

  addProjeto() {
    if(!this.nomeProjeto || !this.descProjeto || !this.statusSelecionado.key){          // Método para adicionar um novo projeto
      this.messageService.add({
        severity:'error',
        summary: 'Erro',                                         //Verifica se todos os campos do formulário estão preenchidos
        detail: 'Todos os campos devem estar preenchidos',
        life: 3000
      });
      return;
    } else {
      this.messageService.add({
        severity:'success',
        summary: 'Sucesso',
        detail: 'Projeto criado com sucesso',
        life: 2500
      });
      
    }

    const novoProjeto: Omit<Projeto, 'id'> = {
      nome: this.nomeProjeto,                                        // Cria um objeto de projeto novo, omitindo a propriedade 'id'
      descprojeto: this.descProjeto,                                //atribuição de valores pelo input
      Status: this.statusSelecionado,
    };

    this.projetoService.addProjeto(novoProjeto).subscribe(() => {
      this.carregarProjetos();                                                //atribuindo valores ao banco de dados
      this.resetForm();                                                       /// Adiciona o novo projeto através do serviço e recarrega a lista de projetos
    });
  }

  private resetForm() {
    this.nomeProjeto = '';
    this.descProjeto = '';
    this.statusSelecionado = { name: '', key: '' };
  }
}