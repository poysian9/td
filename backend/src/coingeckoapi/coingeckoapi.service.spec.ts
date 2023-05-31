import { Test, TestingModule } from '@nestjs/testing';
import { CoingeckoapiService } from './coingeckoapi.service';

describe('CoingeckoapiService', () => {
  let service: CoingeckoapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoingeckoapiService],
    }).compile();

    service = module.get<CoingeckoapiService>(CoingeckoapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
