import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../core/projeto.models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjetoService } from '../../core/projeto.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  projetoList: Projeto[] = [];

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private projetoService: ProjetoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService
  ) {
    this.projetoList = this.config.data?.projetoList || [];
  }

  ngOnInit() {
    this.primengConfig.setTranslation({
      accept: 'Sim',
      reject: 'Não'
    });
  }

  salvar() {
    this.ref.close(this.projetoList);
  }

  cancelar() {
    this.ref.close();
    
  }

  confirmDelete(event: Event, id: number | undefined) {
    if (id === undefined) {
      console.error('ID do projeto é indefinido.');
      return;
    }
  
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Você tem certeza que deseja excluir este projeto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.projetoService.deleteProjeto(id).subscribe(() => {
          this.projetoList = this.projetoList.filter(projeto => projeto.id !== id);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto deletado com sucesso', life: 3000 });
          
          setTimeout(() => {
            this.spinner.hide();
            this.salvar(); // Atualizar a lista de projetos
          }, 2000);
          
        }, error => {
          this.spinner.hide();
          console.error('Erro ao deletar o projeto:', error);
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Nenhuma alteração foi concluída', life: 3000 });
      }
    });
  }
}