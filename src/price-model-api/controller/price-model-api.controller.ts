import { Controller, Get, Query } from '@nestjs/common';
import { PriceModelApiService } from '../service/price-model-api.service';
import { PriceModelInputDto } from '../dto/price-model-input.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Price Model API')
@Controller('price-model-api')
export class PriceModelApiController {
  constructor(
    private priceModelApiService: PriceModelApiService,
  ) {}

  @Get('predict')
  async getPricePrediction(@Query() priceModelInput: PriceModelInputDto) {
    return this.priceModelApiService.getPricePrediction(priceModelInput);
  }

}
