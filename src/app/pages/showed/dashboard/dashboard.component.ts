import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { Projeto } from '../../core/projeto.models';
import { ProjetoService } from '../../core/projeto.service';
import { EditorComponent } from '../editor/editor.component';

export interface Status {
  name: string;
  key: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  projetos$: Observable<Projeto[]> | undefined;
  nomeProjeto: string = '';
  descProjeto: string = '';
  statusSelecionado: Status = { name: '', key: '' };

  status: Status[] = [
    { name: 'Concluído', key: 'C' },
    { name: 'Em Andamento', key: 'E' },
    { name: 'Inativo', key: 'I' },
    { name: 'Finalizado', key: 'F' }
  ];

  constructor(private projetoService: ProjetoService, public dialog: DialogService) {}

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos();
  }

  addProjeto() {
    const novoProjeto: Omit<Projeto, 'id'> = {
      nome: this.nomeProjeto,
      descprojeto: this.descProjeto,
      Status: this.statusSelecionado,
    };

    this.projetoService.addProjeto(novoProjeto).subscribe(() => {
      this.carregarProjetos(); // Atualiza a lista de projetos após a adição
      this.resetForm(); // Limpa o formulário após a adição
    });
  }

  editProjeto(projeto: Projeto) {
    const ref = this.dialog.open(EditorComponent, {
      data: {
        projeto: { ...projeto }, // Passa uma cópia do projeto para evitar modificar diretamente
        statusOptions: this.status
      },
      header: 'Editar Projeto',
      width: '50%'
    });

    ref.onClose.subscribe((updatedProjeto: Projeto) => {
      if (updatedProjeto) {
        this.projetoService.updateProjeto(updatedProjeto).subscribe(() => {
          this.carregarProjetos(); // Recarrega a lista de projetos para refletir as alterações
        });
      }
    });
  }

  deleteProjeto(id: number) {
    console.log('Deletando projeto com ID:', id);
    if (confirm('Você tem certeza que deseja excluir este projeto?')) {
      this.projetoService.deleteProjeto(id).subscribe(() => {
        this.carregarProjetos(); // Recarrega a lista de projetos após a exclusão
      }, error => {
        console.error('Erro ao deletar o projeto:', error);
      });
    }
  }

  private resetForm() {
    this.nomeProjeto = '';
    this.descProjeto = '';
    this.statusSelecionado = { name: '', key: '' };
  }
}