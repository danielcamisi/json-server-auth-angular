import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjetoService } from '../../core/projeto.service';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';


interface TaskEntry {
  tarefa: any;
  descricao: string;
  status: any;
}

@Component({
  selector: 'app-interngit',
  templateUrl: './interngit.component.html',
  styleUrls: ['./interngit.component.css']
})
export class InterngitComponent implements OnInit {
  tarefas: any[] = [];
  filteredTarefas: any[] = [];
  selectedTarefa: any;
  pending:any;
  descricao: string = ''; // Variável para descrição
  stats: any[] = [
    { name: 'Disponível' },
    { name: 'Em Processo' },
    { name: 'Concluído' }
  ];
  selectedStatus: any;
  taskEntries: TaskEntry[] = [{ tarefa: null, descricao: '', status: null }];

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private projetoService: ProjetoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService,
    private http: HttpClient // Certifique-se de que HttpClient está importado
  ) {}

  ngOnInit() {
    this.projetoService.getProjetos().subscribe(data => {
      this.tarefas = data;
    });
  }

  filterTarefas(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTarefas = this.tarefas.filter(tarefa => tarefa.nome.toLowerCase().includes(query));
  }

  publish() {
    // Verifica se há tarefas e se os campos estão preenchidos
    if (this.selectedTarefa && this.descricao && this.selectedStatus && this.pending) {
      const dataToSend = {
        tarefaalterada: this.selectedTarefa.nome,
        desc: this.descricao,
        stats: this.selectedStatus.name,
        pending: this.pending, // Corrige o acesso à variável
        completedDate: moment().format('YYYY-MM-DD HH:mm:ss')
      };
  
      console.log('Dados a serem enviados:', dataToSend);
  
      // Enviar para o endpoint correto
      this.http.post('http://localhost:3000/pub', dataToSend).subscribe(
        response => {
          console.log('Dados enviados:', response);
        },
        error => {
          console.error('Erro ao enviar dados:', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos antes de publicar.');
    }
  }

  cancelar() {
    this.ref.close();
  }
}