import { IsNotEmpty, IsString } from 'class-validator';
import { Airports } from '../../../shared/api-enums';

export class SearchFlightInputDTO {
  @IsString()
  @IsNotEmpty()
  startingAirport: Airports;

  @IsString()
  @IsNotEmpty()
  destinationAirport: Airports;

  @IsString()
  @IsNotEmpty()
  departureTime: Date;
}