import { Test, TestingModule } from '@nestjs/testing';
import { PockeApiService } from './pocke-api.service';

describe('PockeApiService', () => {
  let service: PockeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PockeApiService],
    }).compile();

    service = module.get<PockeApiService>(PockeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
