import { flightStatus } from "src/shared/api-enums";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FlightEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    flightNumber:string;

    @Column()
    weekday:string;

    @Column()
    startingAirport:string;

    @Column()
    destinationAirport:string;

    @Column()
    segmentAirlineName:string;

    @Column()
    segmentEquipmentDescription:string;

    @Column({enum: flightStatus, default: flightStatus.Scheduled})
    status: flightStatus;

}