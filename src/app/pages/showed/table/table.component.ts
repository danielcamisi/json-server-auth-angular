import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { EditorComponent } from '../editor/editor.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { of, Observable } from 'rxjs';
import { Status } from '../dashboard/dashboard.component';
import { InterngitComponent } from '../interngit/interngit.component';
import { ChecklistComponent } from '../checklist/checklist.component';

interface Subtarefa {
  titulo: string;
  concluida: boolean;
}

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
  projetos$: Observable<Projeto[]> = of([]); 
  sourceProducts: Projeto[] = [];
  targetProducts: Projeto[] = [];
  projetoProc: Projeto[] = [];


  subtarefasPadrao: Subtarefa[] = [
    { titulo: 'Revisar Requisitos', concluida: false },
    { titulo: 'Desenvolver Funcionalidade', concluida: false },
    { titulo: 'Testar Implementação', concluida: false }
  ];

  status: Status[] = [
    { name: 'Disponível', key: 'C' },
    { name: 'Em processo', key: 'E' },
    { name: 'Concluído', key: 'F' }           
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
    this.projetoService.getProjetos().subscribe((projetos: Projeto[]) => {
      this.sourceProducts = projetos.filter(projeto => projeto.status === 'Disponível');
      this.projetoProc = projetos.filter(projeto => projeto.status === 'Em processo');
      this.targetProducts = projetos.filter(projeto => projeto.status === 'Concluído');
    });
  }

  onMoveToTarget(event: any, target: string) {
    event.items.forEach((item: Projeto) => {
      if (target === 'process') {
        item.status = 'Em processo';
        this.projetoProc.push(item);
        this.sourceProducts = this.sourceProducts.filter(projeto => projeto.id !== item.id);
      } else if (target === 'finalized') {
        item.status = 'Concluído';
        this.targetProducts.push(item);
        this.projetoProc = this.projetoProc.filter(projeto => projeto.id !== item.id);
      }
      this.updateProjetoStatus(item);
    });
  }
  
  onMoveToSource(event: any, source: string) {
    event.items.forEach((item: Projeto) => {
      if (source === 'available') {
        item.status = 'Disponível';
        this.sourceProducts.push(item);
        this.projetoProc = this.projetoProc.filter(projeto => projeto.id !== item.id);
        this.targetProducts = this.targetProducts.filter(projeto => projeto.id !== item.id);
      } else if (source === 'process') {
        item.status = 'Em processo';
        this.projetoProc.push(item);
        this.targetProducts = this.targetProducts.filter(projeto => projeto.id !== item.id);
      }
      this.updateProjetoStatus(item);
    });
  }
  updateProjetoStatus(projeto: Projeto) {
    this.projetoService.updateProjeto(projeto).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Status Atualizado', detail: `O status do projeto "${projeto.nome}" foi atualizado.`, life: 3000 });
      },
      error => {
        console.error('Erro ao atualizar o status do projeto:', error);
      }
    );
  }

  deleteProjeto(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Você tem certeza que deseja excluir este projeto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projetoService.deleteProjeto(id).subscribe(() => {
          // Remover o projeto da lista localmente
          this.sourceProducts = this.sourceProducts.filter(projeto => projeto.id !== id);
          this.projetoProc = this.projetoProc.filter(projeto => projeto.id !== id);
          this.targetProducts = this.targetProducts.filter(projeto => projeto.id !== id);
          
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

  publish(){
   this.dialog.open(InterngitComponent, {})
  }

  onRightClick(event: MouseEvent, projeto: Projeto) {
    event.preventDefault();
    // Abra o componente de checklist aqui
    this.dialog.open(ChecklistComponent, {
      data: { projeto: projeto },
      header: 'Checklist de Subtarefas',
      width: '50%'
    });
  }

  editProjeto() {
    this.projetoService.getProjetos().subscribe(projetos => {
      const ref = this.dialog.open(EditorComponent, {
        data: {
          projetoList: projetos, // Passe a lista completa de projetos
        },
        header: 'Gerenciar Projetos',
        width: '70%'
      });
  
      ref.onClose.subscribe((updatedProjetoList: Projeto[]) => {
        if (updatedProjetoList) {
          // Atualize suas listas locais conforme necessário
          this.carregarProjetos();
        }
      });
    });
  }
}