import { Injectable, Logger } from '@nestjs/common';
import { FlightEntity } from '../repository/entity/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AircraftTypes, AirlineCodes, Airports, FlightStatus, NumberOfSeats } from '../../shared/api-enums';
import { CreateFlightDto } from '../controller/dto/create-flight.dto';
import { SearchFlightDTO } from '../controller/dto/search-flight-dto';

@Injectable()
export class FlightService{
    constructor(
        @InjectRepository(FlightEntity)
        private flightRepository: Repository<FlightEntity>,
    ) {}

    private readonly logger = new Logger(FlightService.name);

    async createFlight(createFlightDto: CreateFlightDto) {
        const flight = await this.flightRepository.save(this.flightTotoEntity(createFlightDto));
        this.logger.log(`Creating flight with id ${flight.flightNumber}`);
        return {
            flightNumber: flight.flightNumber,
            status: flight.status
        };
    }


    async update(flight: FlightEntity): Promise<FlightEntity> {
        if (!await this.flightRepository.findOne({where: {flightNumber: flight.flightNumber}})){
            this.logger.error(`Flight with id ${flight.flightNumber} not found`)
            throw new FlightNotFoundException(flight.flightNumber.toString())
        }
        this.logger.log(`Updating flight with id ${flight.flightNumber}`);
        return this.flightRepository.save(flight)
    }


    async delete(flightNumber: string): Promise<void> {
        if(!await this.flightRepository.findOne({where: {flightNumber}})){
            this.logger.error(`Flight with id ${flightNumber} is not found`)
            throw new FlightNotFoundException(flightNumber.toString())
        }
        this.logger.log(`Deleting flight with id ${flightNumber}`);
        await this.flightRepository.delete({flightNumber})
    }

    async findOne(flightNumber: string): Promise<FlightEntity> {
        const entity = await this.flightRepository.findOne({where:{flightNumber}});
        if (!entity) {
            this.logger.error(`Flight with id ${flightNumber} not found`);
            throw new FlightNotFoundException(flightNumber.toString());
        }
        return entity;
    }
        

    async findCompanyFlights(segmentAirlineName: AirlineCodes): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {segmentAirlineName: segmentAirlineName}})){
            this.logger.error(`Flight with company name ${segmentAirlineName} not found`)
            throw new FlightSearchCompanyException(segmentAirlineName)
        }
        this.logger.log(`Finding flights with company name ${segmentAirlineName}`);
        return this.flightRepository.find({where: {segmentAirlineName: segmentAirlineName}})
    }


    async findFlightsStatus(status: FlightStatus): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {status: status}})){
            this.logger.error(`Flight with status ${status} not found`)
            throw new FlightSearchStatusException(status)
        }
        this.logger.log(`Finding flights with status ${status}`);
        return this.flightRepository.find({where: {status: status}})
    }


    async findFlightsStartingAirport(startingAirport: Airports): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {startingAirport: startingAirport}})){
            this.logger.error(`Flight with starting airport ${startingAirport} not found`)
            throw new FlightSearchDepartureException(startingAirport)
        }
        this.logger.log(`Finding flights with starting airport ${startingAirport}`);
        return this.flightRepository.find({where: {startingAirport: startingAirport}})
    }


    async findFlightsDestinationAirport(destinationAirport: Airports): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {destinationAirport: destinationAirport}})){
            this.logger.error(`Flight with destination airport ${destinationAirport} not found`)
            throw new FlightSearchDestinationException(destinationAirport)
        }
        this.logger.log(`Finding flights with destination airport ${destinationAirport}`);
        return this.flightRepository.find({where: {destinationAirport: destinationAirport}})
    }


    async findFlightsDepartingDate(departingDate: Date): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {departureTime: departingDate}})){
            this.logger.error(`Flight with departing date ${departingDate} not found`)
            throw new FlightSearchDepartingDateException(departingDate.toDateString())
        }
        this.logger.log(`Finding flights with departing date ${departingDate}`);
        return this.flightRepository.find({where: {departureTime: departingDate}})
    }

    async findAllFlights(): Promise<FlightEntity[]> {
        if(!this.flightRepository.find){
            this.logger.error(`Error listing all flights`)
            throw new FlightFindAllException()
        }
        return this.flightRepository.find();
    }

    async findFlightWithParams(params: SearchFlightDTO ): Promise<FlightEntity[]> {
        try {
            return await this.flightRepository.find({where: params});
        } catch (e) {
            this.logger.error(`Error finding flight with params ${JSON.stringify(params)}`);
            throw e;
        }
    }

    flightTotoEntity(flightDTO: CreateFlightDto): FlightEntity {
        const flight = new FlightEntity();
        flight.departureTime = flightDTO.departureTime;
        flight.arrivalTime = flightDTO.arrivalTime;
        flight.startingAirport = flightDTO.startingAirport;
        flight.destinationAirport = flightDTO.destinationAirport;
        flight.segmentAirlineName = flightDTO.segmentAirlineName;
        flight.segmentEquipmentDescription = flightDTO.segmentEquipmentDescription;
        flight.numberOfSeats = (<NumberOfSeats>Object.keys(AircraftTypes).indexOf(flightDTO.segmentEquipmentDescription))
        flight.status = FlightStatus.Scheduled;
        return flight;
    }
}