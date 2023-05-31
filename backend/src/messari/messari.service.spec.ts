import { Test, TestingModule } from '@nestjs/testing';
import { MessariService } from './messari.service';

describe('MessariService', () => {
  let service: MessariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessariService],
    }).compile();

    service = module.get<MessariService>(MessariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
