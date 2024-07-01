import { Test, TestingModule } from '@nestjs/testing';
import { PriceModelApiController } from './price-model-api.controller';

describe('PriceModelApiController', () => {
  let controller: PriceModelApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceModelApiController],
    }).compile();

    controller = module.get<PriceModelApiController>(PriceModelApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
