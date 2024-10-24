import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
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

  constructor(private projetoService: ProjetoService, public dialog: DialogService) {}

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.projetos$ = this.projetoService.getProjetos().pipe(
      defaultIfEmpty([]) // Garante que sempre retorne um array
    );
  }

  addProjeto() {
    const novoProjeto: Omit<Projeto, 'id'> = {
      nome: this.nomeProjeto,
      descprojeto: this.descProjeto,
      Status: this.statusSelecionado,
    };

    this.projetoService.addProjeto(novoProjeto).subscribe(() => {
      this.carregarProjetos();
      this.resetForm();
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


  deleteProjeto(id: number) {
    console.log('Deletando projeto com ID:', id);
    if (confirm('Você tem certeza que deseja excluir este projeto?')) {
      this.projetoService.deleteProjeto(id).subscribe(() => {
        this.carregarProjetos();
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