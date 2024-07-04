import {Module} from "@nestjs/common";
import { ReservationController } from './controller/reservation.controller';
import {ReservationService} from "./service/reservation.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservationEntity} from "./repository/entity/reservation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReservationEntity])],
    controllers: [ReservationController],
    providers: [ReservationService],
    exports: [ReservationService]
})
export class ReservationModule {}