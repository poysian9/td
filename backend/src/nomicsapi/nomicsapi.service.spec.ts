import { Test, TestingModule } from '@nestjs/testing';
import { NomicsapiService } from './nomicsapi.service';

describe('NomicsapiService', () => {
  let service: NomicsapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomicsapiService],
    }).compile();

    service = module.get<NomicsapiService>(NomicsapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
