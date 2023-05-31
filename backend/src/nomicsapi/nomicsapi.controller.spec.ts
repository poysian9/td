import { Test, TestingModule } from '@nestjs/testing';
import { NomicsapiController } from './nomicsapi.controller';

describe('NomicsapiController', () => {
  let controller: NomicsapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomicsapiController],
    }).compile();

    controller = module.get<NomicsapiController>(NomicsapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
