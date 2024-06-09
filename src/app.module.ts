import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./shared/database/database.module";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [DatabaseModule,
        ConfigModule.forRoot(),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
