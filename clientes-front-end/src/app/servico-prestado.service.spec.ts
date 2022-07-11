import { TestBed } from '@angular/core/testing';

import { ServicoPrestadoService } from './servico-prestado.service';

describe('ServicoPrestadoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicoPrestadoService = TestBed.get(ServicoPrestadoService);
    expect(service).toBeTruthy();
  });
});
