import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class FlightController {
    @IsString()
    flightNumber: string;

    @IsString()
    weekday: string;

    @IsString()
    startingAirport: string;

    @IsString()
    destinationAirport: string;

    @IsString()
    segmentAirlineName: string;

    @IsString()
    segmentEquipmentDescription: string;

    @IsDate()
    @Type(() => Date)
    departureTime: Date;

    @IsDate()
    @Type(() => Date)
    arrivalTime: Date;

}
