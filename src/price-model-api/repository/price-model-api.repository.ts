import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { PriceModelInputDto } from '../dto/price-model-input.dto';


@Injectable()
export class PriceModelApiRepository {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getPricePrediction(priceModelInput: PriceModelInputDto) {
    return this.httpService.post('http://localhost:5000/predict', priceModelInput);
  }
}