import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlightService } from '../service/flight.service';
import { FlightEntity } from '../repository/entity/flight.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes, FlightStatus, Airports, AirlineCodes } from '../../shared/api-enums';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';
import { CreateFlightInputDto } from './dto/create-flight-input.dto';
import { SearchFlightInputDTO } from './dto/search-flight-input.dto';

@ApiTags('flight')
@Controller('flight')
export class FlightController{
    constructor(private readonly flightService: FlightService) {
    }

    @Post('createFlight')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async createFlight(@Body() flight: CreateFlightInputDto) {
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

    @Get('findFlightsByStatus/:status')
    async findFlightsStatus(@Param('status') status: FlightStatus){
        return this.flightService.findFlightsStatus(status);
    }

    @Get('findFlightsByStartingAirport/:startingAirport')
    async findFlightsStartingAirport(@Param('startingAirport') startingAirport: Airports){
        return this.flightService.findFlightsStartingAirport(startingAirport);
    }

    @Get('findFlightsByDestinationAirport/:destinationAirport')
    async findFlightsDestinationAirport(@Param('destinationAirport') destinationAirport: Airports){
        return this.flightService.findFlightsDestinationAirport(destinationAirport);
    }

    @Get('findFlightsByDepartingDate/:departingDate')
    async findFlightsDepartingDate(@Param('departingDate') departingDate: Date){
        return this.flightService.findFlightsDepartingDate(departingDate);
    }

    @Get('all')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.employee))
    async findAll(){
        return this.flightService.findAllFlights();
    }

    @Get('find')
    async findFlightWithParams(@Query() flightInput: SearchFlightInputDTO){
        return this.flightService.findFlightWithParams(flightInput);
    }

}