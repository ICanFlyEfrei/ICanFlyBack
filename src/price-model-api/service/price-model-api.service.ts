import { Injectable, Logger } from '@nestjs/common';
import { PriceModelApiRepository } from '../repository/price-model-api.repository';
import { PriceModelInputDto } from '../dto/price-model-input.dto';

@Injectable()
export class PriceModelApiService {
  private readonly logger = new Logger(PriceModelApiService.name); // Initialize logger here

  constructor(private priceModelApiRepository: PriceModelApiRepository) {}

  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    this.logger.log(`Getting price prediction for ${JSON.stringify(priceModelInput)}`); // Log input data
    try {
      return await this.priceModelApiRepository.getPricePrediction(priceModelInput);
    } catch (error) {
      this.logger.error(`Error getting price prediction: ${error.message}`);
      throw error; // Rethrow error for proper handling by NestJS exception filters
    }
  }
}