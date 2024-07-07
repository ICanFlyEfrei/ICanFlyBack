import { Injectable, Logger } from '@nestjs/common';
import { PriceModelApiRepository } from '../repository/price-model-api.repository';
import { PriceModelInputDto } from '../dto/price-model-input.dto';
import { PriceModelPredictionDto } from '../dto/price-model-prediction.dto';
import { AirlineCodes, Airports } from '../../shared/api-enums';

@Injectable()
export class PriceModelApiService {
  private readonly logger = new Logger(PriceModelApiService.name);

  constructor(private priceModelApiRepository: PriceModelApiRepository) {}

  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    this.logger.log(`Getting price prediction for ${JSON.stringify(priceModelInput)}`);
    try {
      return await this.priceModelApiRepository.getPricePrediction(this.priceModelInputDtoToPriceModelPredictionDto(priceModelInput));
    } catch (error) {
      this.logger.error(`Error getting price prediction: ${error.message}`);
      throw error;
    }
  }

  priceModelInputDtoToPriceModelPredictionDto(priceModelInput: PriceModelInputDto) {
    const priceModelPredictionDto = new PriceModelPredictionDto();
    priceModelPredictionDto.weekday = priceModelInput.weekday;
    priceModelPredictionDto.startingAirport = Object.keys(Airports).indexOf(priceModelInput.startingAirport).toString();
    priceModelPredictionDto.destinationAirport = Object.keys(Airports).indexOf(priceModelInput.destinationAirport).toString();
    priceModelPredictionDto.segmentsAirlineName = Object.keys(AirlineCodes).indexOf(priceModelInput.segmentsAirlineName).toString();

    return priceModelPredictionDto;
  }
}