import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlightService } from '../service/flight.service';
import { FlightEntity } from '../repository/entity/flight.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes, FlightStatus, Airports, AirlineCodes } from '../../shared/api-enums';
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

    @Patch('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async update(@Body() flight: FlightEntity){
        return this.flightService.update(flight);
    }

    @Delete(':flightNumber')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async delete(@Param('flightNumber') flightNumber: string){
        return this.flightService.delete(flightNumber);
    }

    @Get(':flightNumber')
    async findOne(@Param('flightNumber') flightNumber: string){
        return this.flightService.findOne(flightNumber);
    }

    @Get('findCompanyFlights/:segmentAirlineName')
    async findCompanyFlights(@Param('segmentAirlineName') segmentAirlineName: AirlineCodes){
        return this.flightService.findCompanyFlights(segmentAirlineName);
    }

    @Get('findFlightsStatus/:status')
    async findFlightsStatus(@Param('status') status: FlightStatus){
        return this.flightService.findFlightsStatus(status);
    }

    @Get('findFlightsStartingAirport/:startingAirport')
    async findFlightsStartingAirport(@Param('startingAirport') startingAirport: Airports){
        return this.flightService.findFlightsStartingAirport(startingAirport);
    }

    @Get('findFlightsDestinationAirport/:destinationAirport')
    async findFlightsDestinationAirport(@Param('destinationAirport') destinationAirport: Airports){
        return this.flightService.findFlightsDestinationAirport(destinationAirport);
    }

    @Get('findFlightsDepartingDate/:departingDate')
    async findFlightsDepartingDate(@Param('departingDate') departingDate: Date){
        return this.flightService.findFlightsDepartingDate(departingDate);
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