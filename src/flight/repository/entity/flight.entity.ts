import { AircraftTypes, AirlineCodes, Airports, FlightStatus, NumberOfSeats } from 'src/shared/api-enums';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FlightEntity{

    @PrimaryGeneratedColumn('uuid')
    flightNumber:string;

    @Column()
    departureTime:Date;

    @Column()
    arrivalTime:Date;

    @Column()
    startingAirport:Airports;

    @Column()
    destinationAirport:Airports;

    @Column()
    segmentAirlineName:AirlineCodes;

    @Column()
    segmentEquipmentDescription:AircraftTypes;
    
    @Column()
    numberOfSeats: NumberOfSeats;
    
    @Column({enum: FlightStatus, default: FlightStatus.Scheduled})
    status: FlightStatus;

}