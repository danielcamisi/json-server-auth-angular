import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjetoService } from './projeto.service';

describe('ProjetoService', () => {
  let service: ProjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjetoService]
    });
    service = TestBed.inject(ProjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Adicione mais testes específicos do seu serviço aqui
});