import { Component } from '@angular/core';
import { Projeto } from '../../core/projeto.models';
import { Status } from '../dashboard/dashboard.component'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})

export class EditorComponent {
  projeto: Projeto;
  statusOptions: Status[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.projeto = this.config.data.projeto;
    this.statusOptions = this.config.data.statusOptions;
  }

  salvar() {
    if (this.projeto) {
      this.ref.close(this.projeto); // Retorna o projeto atualizado para o componente pai
    }
  }

  cancelar() {
    this.ref.close(); // Fecha o diálogo sem retornar dados
  }
}
