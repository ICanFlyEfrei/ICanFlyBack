import { IsNotEmpty, IsString } from 'class-validator';

export class SearchFlightDTO {
  @IsString()
  @IsNotEmpty()
  startingAirport: string;
  @IsString()
  @IsNotEmpty()
  destinationAirport: string;
  @IsString()
  @IsNotEmpty()
  departureDate: string;
  @IsString()
  @IsNotEmpty()
  arrivalDate: string;
}