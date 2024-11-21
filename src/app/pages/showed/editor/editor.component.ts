import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../core/projeto.models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjetoService } from '../../core/projeto.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  projetoList: Projeto[] = [];
  

  constructor(public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private projetoService: ProjetoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService
  ) 
    {
    this.projetoList = this.config.data?.projetoList || [];
  }

  ngOnInit(){
    this.primengConfig.setTranslation({
      accept: 'Sim',                                 //configuração de tradução do popup de confirmação presente nos botões e na hora de POST,GET ou DELETE no backend
      reject: 'Não'
    });
  }

  salvar() {
    this.ref.close(this.projetoList);
  }

  cancelar() {
    this.ref.close();
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Você tem certeza que deseja excluir este projeto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projetoService.deleteProjeto(id).subscribe(() => {
          this.projetoList = this.projetoList.filter(projeto => projeto.id !== id);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Projeto com id ${id} deletado.`, life: 3000 });
          this.spinner.show();
          setTimeout(()=>{               
            this.spinner.hide();
          }, 1000)
        }, (error) => {
          console.error('Erro ao deletar o projeto:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o projeto.', life: 3000 });
        });
      }
    });
  }
}