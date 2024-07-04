import {Module} from "@nestjs/common";
import {FlightController} from "./controller/flight.controller";
import {FlightService} from "./service/flight.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FlightEntity} from "./repository/entity/flight.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FlightEntity])],
    controllers: [FlightController],
    providers: [FlightService],
    exports: [FlightService]
})
export class UserModule {}