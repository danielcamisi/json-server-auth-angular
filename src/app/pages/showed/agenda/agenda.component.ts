import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import moment from 'moment';

interface Agendamento {
  id?: number;
  titulo: string;
  data: Date; // Use Date para facilitar a manipulação
  hora: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  novaAtividade: Agendamento = { titulo: '', data: new Date(), hora: '' };
  atividades: Agendamento[] = [];

  constructor(private agendamentoService: DataService) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
      this.atividades = agendamentos.sort((a, b) => {
        return moment(a.data + 'T' + a.hora).diff(moment(b.data + 'T' + b.hora));
      });
    });
  }

  agendarAtividade() {
    if (!this.novaAtividade.titulo || !this.novaAtividade.data || !this.novaAtividade.hora) {
      alert('Por favor, preencha todos os campos antes de agendar.');
      return;
    }

    const dataIso = moment(this.novaAtividade.data).format('YYYY-MM-DD');
    const dataHoraAtividade = moment(`${dataIso}T${this.novaAtividade.hora}`);
    const agora = moment();

    if (dataHoraAtividade.isBefore(agora)) {
      alert('Não é possível agendar uma atividade para uma data e hora passadas.');
      return;
    }

    this.agendamentoService.addAgendamento(this.novaAtividade).subscribe(atividade => {
      this.atividades.push(atividade);
      this.atividades.sort((a, b) => {
        return moment(a.data + 'T' + a.hora).diff(moment(b.data + 'T' + b.hora));
      });

      this.novaAtividade = { titulo: '', data: new Date(), hora: '' };
    });
  }

  excluirAtividade(id: number | undefined) {
    if (id === undefined) {
      console.error('ID é indefinido.');
      return;
    }

    this.agendamentoService.deleteAgendamento(id).subscribe(() => {
      this.atividades = this.atividades.filter(atividade => atividade.id !== id);
    });
  }
}