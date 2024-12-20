import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjetoService } from '../../core/projeto.service';
import { Projeto } from '../../core/projeto.models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [MessageService] // Certifique-se de que o MessageService está disponível
})
export class ChecklistComponent {
  projeto: Projeto;
  subtarefas: { titulo: string, concluida: boolean }[] = [];
  isAllCompleted: boolean = false;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private projetoService: ProjetoService,
    private messageService: MessageService // Injetando o serviço de mensagens
  ) {
    this.projeto = this.config.data.projeto;

    // Inicialize as subtarefas
    this.subtarefas = [
      { titulo: 'Verificar atualizações de libs', concluida: false },
      { titulo: 'Documentar o código', concluida: false },
      { titulo: 'Dar commit para sua branch', concluida: false },
      { titulo: 'Publicar para o time', concluida: false },
      { titulo: 'Passar pelo QA', concluida: false },
      { titulo: 'Passar pelo Suporte', concluida: false }
    ];

    this.checkAllCompleted();
  }

  checkAllCompleted() {
    this.isAllCompleted = this.subtarefas.every(sub => sub.concluida);
  }

  finalizarProjeto() {
    if (this.projeto.status === 'Concluído') {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Erro', 
        detail: 'Este projeto já está concluído.', 
        life: 3000 
      });
      return;
    }

    if (this.isAllCompleted) {
      this.projetoService.updateProjetoStatus(this.projeto.id, 'Concluído').subscribe(
        () => {
          this.projeto.status = 'Concluído';
          this.ref.close(this.projeto); // Feche o diálogo e retorne o projeto atualizado
        },
        error => {
          console.error('Erro ao atualizar o status do projeto:', error);
        }
      );
    }
  }
}