import { IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AircraftTypes, AirlineCodes, Airports } from '../../../shared/api-enums';

export class CreateFlightInputDto {

    @IsString()
    @IsNotEmpty()
    startingAirport: Airports;

    @IsString()
    @IsNotEmpty()
    destinationAirport: Airports;

    @IsString()
    @IsNotEmpty()
    segmentAirlineName: AirlineCodes;

    @IsString()
    @IsNotEmpty()
    segmentEquipmentDescription: AircraftTypes;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    departureTime: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    arrivalTime: Date;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
