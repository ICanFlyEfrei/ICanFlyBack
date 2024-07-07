import { IsNotEmpty, IsString } from 'class-validator';
import { Airports } from '../../../shared/api-enums';

export class SearchFlightDTO {
  @IsString()
  @IsNotEmpty()
  startingAirport: Airports;
  @IsString()
  @IsNotEmpty()
  destinationAirport: Airports;
  @IsString()
  @IsNotEmpty()
  departureDate: Date;
}