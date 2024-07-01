import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./shared/database/database.module";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { PriceModelApiModule } from './price-model-api/price-model-api.module';

@Module({
    imports: [DatabaseModule,
        ConfigModule.forRoot(),
        UserModule,
        AuthModule,
        PriceModelApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
