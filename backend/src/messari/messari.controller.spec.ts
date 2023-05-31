import { Test, TestingModule } from '@nestjs/testing';
import { MessariController } from './messari.controller';

describe('MessariController', () => {
  let controller: MessariController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessariController],
    }).compile();

    controller = module.get<MessariController>(MessariController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
