import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PriceModelInputDto } from '../dto/price-model-input.dto';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class PriceModelApiRepository {
  private readonly logger = new Logger(PriceModelApiRepository.name);
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    this.logger.log(`Getting price prediction for ${JSON.stringify(priceModelInput)}`);
    try {
      // Construct the query string
      const queryParams = new URLSearchParams(priceModelInput as any).toString();
      const url = `http://localhost:5000/predict?${queryParams}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(`Error getting price prediction: ${error.message}`);
      throw error;
    }
  }
}