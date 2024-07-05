import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes } from '../../shared/api-enums';
import { ReservationEntity } from '../repository/entity/reservation.entity';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController{
    constructor(private readonly reservationService: ReservationService) {
    }

    @Post('createReservation')
    @UseGuards(JwtOauthGuard)
    async createReservation(@Body() Reservation: CreateReservationDto) {
        return this.reservationService.createReservation(Reservation);
    }

    @Post('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async update(@Body() Reservation : ReservationEntity){
        return this.reservationService.update(Reservation);
    }

    @Delete('delete/:id')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async delete(@Param("id") id: string){
        return this.reservationService.delete(id);
    }

    @Get('findReservation:id')
    @UseGuards(JwtOauthGuard)
    async findOne(@Param('id') id: string){
        return this.reservationService.findOne(id);
    }

    @Get('all')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async findAll(){
        return this.reservationService.findAllReservations();
    }

    @Get('user/:id')
    @UseGuards(JwtOauthGuard)
    async findAllReservationsByClient(@Param('id') id: string){
        return this.reservationService.findAllReservationsByClient(id);
    }
}