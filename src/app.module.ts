import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./shared/database/database.module";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import {FlightModule} from "./flight/flight.module";
import { PriceModelApiModule } from './price-model-api/price-model-api.module';
import { FlightModule } from './flight/flight.module';

@Module({
    imports: [DatabaseModule,
        ConfigModule.forRoot(),
        UserModule,
        AuthModule,
        FlightModule,
        PriceModelApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
