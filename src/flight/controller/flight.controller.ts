import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlightService } from '../service/flight.service';
import { FlightEntity } from '../repository/entity/flight.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes, FlightStatus } from '../../shared/api-enums';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';
import { CreateFlightDto } from './dto/create-flight.dto';
import { SearchFlightDTO } from './dto/search-flight-dto';

@ApiTags('flight')
@Controller('flight')
export class FlightController{
    constructor(private readonly flightService: FlightService) {
    }

    @Post('createFlight')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async createFlight(@Body() flight: CreateFlightDto) {
        return this.flightService.createFlight(flight);
    }

    @Post('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async updtade(@Body() flight : FlightEntity){
        return this.flightService.update(flight);
    }

    @Post('delete')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async delete(@Body() id: string){
        return this.flightService.delete(id);
    }

    @Get('findFlight:id')
    async findOne(@Param('id') id: string){
        return this.flightService.findOne(id);
    }

    @Get('findCompanyFlights/:segmentAirlineName')
    async findCompanyFlights(@Param('segmentAirlineName') segmentAirlineName: string){
        return this.flightService.findCompanyFlights(segmentAirlineName);
    }

    @Get('findFlightsStatus/:status')
    async findFlightsStatus(@Param('status') status: FlightStatus){
        return this.flightService.findFlightsStatus(status);
    }

    @Get('findFlightsStartingAirport/:startingAirport')
    async findFlightsStartingAirport(@Param('startingAirport') startingAirport: string){
        return this.flightService.findFlightsStartingAirport(startingAirport);
    }

    @Get('findFlightsDestinationAirport/:destinationAirport')
    async findFlightsDestinationAirport(@Param('destinationAirport') destinationAirport: string){
        return this.flightService.findFlightsDestinationAirport(destinationAirport);
    }

    @Get('findFlightsDepartingDate/:departingDate')
    async findFlightsDepartingDate(@Param('departingDate') departingDate: string){
        return this.flightService.findFlightsDepartingDate(departingDate);
    }

    @Get('findFlightsArrivalDate/:arrivalDate')
    async findFlightsArrivalDate(@Param('arrivalDate') arrivalDate: string){
        return this.flightService.findFlightsArrivalDate(arrivalDate);
    }

    @Get('all')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async findAll(){
        return this.flightService.findAllFlights();
    }

    @Get()
    async findFlightWithParams(@Query() flight: SearchFlightDTO){
        return this.flightService.findFlightWithParams(flight);
    }

}