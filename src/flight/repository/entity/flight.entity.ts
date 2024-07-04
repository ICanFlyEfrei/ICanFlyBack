import { FlightStatus } from "src/shared/api-enums";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FlightEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    flightNumber:string;

    @Column()
    departingDate:string;

    @Column()
    arrivalDate:string;

    @Column()
    startingAirport:string;

    @Column()
    destinationAirport:string;

    @Column()
    segmentAirlineName:string;

    @Column()
    segmentEquipmentDescription:string;
    
    @Column()
    numberOfSeats: string;
    
    @Column({enum: FlightStatus, default: FlightStatus.Scheduled})
    status: FlightStatus;

}