import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PriceModelPredictionDto {
  @IsInt()
  @IsNotEmpty()
  weekday: number;

  @IsString()
  @IsNotEmpty()
  startingAirport: string;

  @IsString()
  @IsNotEmpty()
  destinationAirport: string;

  @IsString()
  @IsNotEmpty()
  segmentsAirlineName: string;

  @IsString()
  @IsNotEmpty()
  segmentsEquipmentDescription: string;
}