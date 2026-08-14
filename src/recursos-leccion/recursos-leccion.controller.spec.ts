import { Test, TestingModule } from '@nestjs/testing';
import { RecursosLeccionController } from './recursos-leccion.controller';
import { RecursosLeccionService } from './recursos-leccion.service';

describe('RecursosLeccionController', () => {
  let controller: RecursosLeccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecursosLeccionController],
      providers: [RecursosLeccionService],
    }).compile();

    controller = module.get<RecursosLeccionController>(RecursosLeccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
