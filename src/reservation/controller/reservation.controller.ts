import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationService } from '../service/Reservation.service';
import { ReservationEntity } from '../repository/entity/Reservation.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes } from '../../shared/api-enums';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';
import { CreateReservationDto } from './dto/create-Reservation.dto';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController{
    constructor(private readonly ReservationService: ReservationService) {
    }

    @Post('createReservation')
    @UseGuards(JwtOauthGuard)
    async createReservation(@Body() Reservation: CreateReservationDto) {
        return this.ReservationService.createReservation(Reservation);
    }

    @Post('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async update(@Body() Reservation : ReservationEntity){
        return this.ReservationService.update(Reservation);
    }

    @Delete('delete/:id')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async delete(@Param("id") id: string){
        return this.ReservationService.delete(id);
    }

    @Get('findReservation:id')
    @UseGuards(JwtOauthGuard)
    async findOne(@Param('id') id: string){
        return this.ReservationService.findOne(id);
    }

    @Get('all')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async findAll(){
        return this.ReservationService.findAllReservations();
    }

    @Get('all/:id')
    @UseGuards(JwtOauthGuard)
    async findAllReservationsByClient(@Param('id') id: string){
        return this.ReservationService.findAllReservationsByClient(id);
    }
}