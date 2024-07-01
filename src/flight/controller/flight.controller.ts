import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlightService } from '../service/flight.service';
import { FlightEntity } from '../repository/entity/flight.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserRoles } from '../../shared/api-enums';

@ApiTags('flight')
@Controller('flight')
export class FlightController{
    constructor(private readonly flightService: FlightService) {
    }

    @Post()
    @UseGuards(RoleGuard(UserRoles.admin))
    async create(@Body() flight: FlightEntity) {
        return this.flightService.create(flight);
    }

    @Post('update')
    @UseGuards(RoleGuard(UserRoles.admin))
    async updtade(@Body() flight : FlightEntity){
        return this.flightService.update(flight);
    }

    @Post('delete')
    @UseGuards(RoleGuard(UserRoles.admin))
    async delete(@Body() id: string){
        return this.flightService.delete(id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.flightService.findOne(id);
    }

    @Get('all')
    //@UseGuards(RoleGuard(UserRoles.admin))
    async findAll(){
        return this.flightService.findAll();
    }

}