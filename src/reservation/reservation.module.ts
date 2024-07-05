import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './repository/entity/reservation.entity';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { FlightService } from '../flight/service/flight.service';
import { FlightEntity } from '../flight/repository/entity/flight.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ReservationEntity,FlightEntity])],
    controllers: [ReservationController],
    providers: [ReservationService,FlightService]
})
export class ReservationModule {}