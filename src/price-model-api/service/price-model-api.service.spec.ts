import { Test, TestingModule } from '@nestjs/testing';
import { PriceModelApiService } from './price-model-api.service';

describe('PriceModelApiService', () => {
  let service: PriceModelApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceModelApiService],
    }).compile();

    service = module.get<PriceModelApiService>(PriceModelApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
