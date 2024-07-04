import { IsString, IsDate, IsNotEmpty} from 'class-validator';
import { FlightEntity } from '../../../flight/repository/entity/flight.entity';
import { UserEntity } from '../../../user/repository/entity/user.entity';

export class CreateReservationDto {

    @IsNotEmpty()
    flight: FlightEntity;

    @IsNotEmpty()
    user: UserEntity;

    @IsDate()
    ReservationDate: Date;

    @IsString()
    @IsNotEmpty()
    seat: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    payment: boolean;

    @IsString()
    @IsNotEmpty()
    price: string;
}
