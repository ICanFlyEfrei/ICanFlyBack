import { Module } from '@nestjs/common';
import { PriceModelApiController } from './controller/price-model-api.controller';
import { PriceModelApiService } from './service/price-model-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PriceModelApiController],
  providers: [PriceModelApiService],
  exports: [PriceModelApiService]
})
export class PriceModelApiModule {}
