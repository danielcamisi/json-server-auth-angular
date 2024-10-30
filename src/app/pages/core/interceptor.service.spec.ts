import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor.service';

describe('InterceptorService', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Adicione mais testes específicos do seu serviço aqui
});