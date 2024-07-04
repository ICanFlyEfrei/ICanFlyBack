import { ReservationStatus } from 'src/shared/api-enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../user/repository/entity/user.entity';
import { FlightEntity } from '../../../flight/repository/entity/flight.entity';

@Entity()
export class ReservationEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    @ManyToOne(type => FlightEntity)
    flight: FlightEntity

    @Column()
    @ManyToOne(type => UserEntity)
    client: UserEntity;

    @Column()
    ReservationDate: Date;

    @Column()
    seat:string;

    @Column()
    @Column({type: 'enum', enum: ReservationStatus})
    status: ReservationStatus;

    @Column()
    payment:boolean;

    @Column()
    price:string;

}