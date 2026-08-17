import { Test, TestingModule } from '@nestjs/testing';
import { RecursosLeccionService } from './recursos-leccion.service';

describe('RecursosLeccionService', () => {
  let service: RecursosLeccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecursosLeccionService],
    }).compile();

    service = module.get<RecursosLeccionService>(RecursosLeccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
