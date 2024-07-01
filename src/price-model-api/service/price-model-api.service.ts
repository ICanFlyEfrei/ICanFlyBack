import { Injectable, Logger } from '@nestjs/common';
import { PriceModelApiRepository } from '../repository/price-model-api.repository';
import { PriceModelInputDto } from '../dto/price-model-input.dto';

@Injectable()
export class PriceModelApiService {
  constructor(
    private readonly priceModelApiRepository: PriceModelApiRepository,
    private readonly logger = new Logger(PriceModelApiService.name)
  ) {}

  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    try {
      this.logger.log(`Getting price prediction for ${priceModelInput}`);
      return await this.priceModelApiRepository.getPricePrediction(priceModelInput);
    } catch (error) {
      this.logger.error(`Error while getting price prediction: ${error.message}`);
      throw error;
    }
  }
}
