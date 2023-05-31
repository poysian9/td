import { Test, TestingModule } from '@nestjs/testing';
import { CoingeckoapiController } from './coingeckoapi.controller';

describe('CoingeckoapiController', () => {
  let controller: CoingeckoapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoingeckoapiController],
    }).compile();

    controller = module.get<CoingeckoapiController>(CoingeckoapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
