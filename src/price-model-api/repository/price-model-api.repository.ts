import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PriceModelPredictionDto } from '../dto/price-model-prediction.dto';


@Injectable()
export class PriceModelApiRepository {
  private readonly logger = new Logger(PriceModelApiRepository.name);
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getPricePrediction(predictionData: PriceModelPredictionDto) {
    this.logger.log(`Getting price prediction for ${JSON.stringify(predictionData)}`);
    try {
      const queryParams = new URLSearchParams(predictionData as any).toString();
      const url = `http://localhost:5000/predict?${queryParams}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting price prediction: ${error.message}`);
      throw error;
    }
  }
}