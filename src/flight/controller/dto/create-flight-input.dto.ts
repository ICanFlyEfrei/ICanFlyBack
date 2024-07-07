import { IsString, IsDate} from 'class-validator';
import { Type } from 'class-transformer';
import { AircraftTypes, AirlineCodes, Airports } from '../../../shared/api-enums';

export class CreateFlightInputDto {

    @IsString()
    startingAirport: Airports;

    @IsString()
    destinationAirport: Airports;

    @IsString()
    segmentAirlineName: AirlineCodes;

    @IsString()
    segmentEquipmentDescription: AircraftTypes;

    @IsDate()
    @Type(() => Date)
    departureTime: Date;

    @IsDate()
    @Type(() => Date)
    arrivalTime: Date;

}
