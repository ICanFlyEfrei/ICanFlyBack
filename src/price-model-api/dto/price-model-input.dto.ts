import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { AircraftTypes, AirlineCodes, Airports } from '../../shared/api-enums';

export class PriceModelInputDto {
  @IsInt()
  @IsNotEmpty()
  weekday: number;

  @IsString()
  @IsNotEmpty()
  startingAirport: Airports;

  @IsString()
  @IsNotEmpty()
  destinationAirport: Airports;

  @IsString()
  @IsNotEmpty()
  segmentsAirlineName: AirlineCodes;

  @IsString()
  @IsNotEmpty()
  segmentsEquipmentDescription: AircraftTypes;
}
