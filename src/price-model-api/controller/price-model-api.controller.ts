import { Controller, Post } from '@nestjs/common';
import { PriceModelApiService } from '../service/price-model-api.service';
import { PriceModelInputDto } from '../dto/price-model-input.dto';

@Controller('price-model-api')
export class PriceModelApiController {
  constructor(
    private readonly priceModelApiService: PriceModelApiService,
  ) {}

  @Post('predict')
  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    return this.priceModelApiService.getPricePrediction(priceModelInput);
  }

}
