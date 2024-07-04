import { Module } from '@nestjs/common';
import { PriceModelApiController } from './controller/price-model-api.controller';
import { PriceModelApiService } from './service/price-model-api.service';
import { HttpModule } from '@nestjs/axios';
import { PriceModelApiRepository } from './repository/price-model-api.repository';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),],
  controllers: [PriceModelApiController],
  providers: [PriceModelApiService,PriceModelApiRepository]
})
export class PriceModelApiModule {}
