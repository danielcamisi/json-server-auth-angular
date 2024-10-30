import { Component, OnInit } from '@angular/core';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { EditorComponent } from '../editor/editor.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService,MessageService, PrimeNGConfig } from 'primeng/api';
import { Status } from '../dashboard/dashboard.component';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ]),
    ])
  ]
})
export class TableComponent implements OnInit {
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
    private messageService: MessageService) 
  {
    this.primengConfig.setTranslation({
      accept: 'Sim',
      reject: 'Não',
        
      });
  }

    

  ngOnInit(): void {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos().pipe(
      defaultIfEmpty([]) // Garante que sempre retorne um array
    );
  }


  deleteProjeto(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Você tem certeza que deseja excluir este projeto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projetoService.deleteProjeto(id).subscribe(() => {
          this.carregarProjetos();
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Projeto deletado com sucesso', life: 3000 });
        }, error => {
          console.error('Erro ao deletar o projeto:', error);
        });
      },
      reject:() => {
        this.messageService.add({severity: 'info', summary: 'Cancelado', detail: 'Nenhuma alteração foi concluída', life: 3000});
      }
    });
  }

  editProjeto(projeto: Projeto) {
    console.log('Iniciando edição do projeto:', projeto);

    const ref = this.dialog.open(EditorComponent, {
      data: {
        projeto: { ...projeto },
        statusOptions: this.status
      },
      header: 'Editar Projeto',
      width: '50%'
    });

    ref.onClose.subscribe((updatedProjeto: Projeto) => {
      if (updatedProjeto) {
        console.log('Projeto atualizado recebido do editor:', updatedProjeto);

        this.projetoService.updateProjeto(updatedProjeto).subscribe(
          response => {
            console.log('Resposta do servidor após atualização:', response);

            this.projetos$ = this.projetos$.pipe(
              defaultIfEmpty([]),
              map(projetos => {
                console.log('Atualizando lista de projetos localmente.');
                return projetos.map(p => p.id === response.id ? response : p);
              })
            );
          },
          error => {
            console.error('Erro ao atualizar projeto:', error);
          }
        );
      } else {
        console.log('Edição do projeto cancelada pelo usuário.');
      }
    });
  }


  private resetForm() {
    this.nomeProjeto = '';
    this.descProjeto = '';
    this.statusSelecionado = { name: '', key: '' };
  }
}
