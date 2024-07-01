import { IsNotEmpty, IsString } from 'class-validator';

export class PriceModelInputDto {
  @IsString()
  @IsNotEmpty()
  weekday: string;

  @IsString()
  @IsNotEmpty()
  startingAirport: string;

  @IsString()
  @IsNotEmpty()
  destinationAirport: string;

  @IsString()
  @IsNotEmpty()
  segmentAirline: string;

  @IsString()
  @IsNotEmpty()
  segmentEquipment: string;
}