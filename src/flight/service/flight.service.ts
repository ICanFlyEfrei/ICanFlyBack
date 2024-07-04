import {Injectable, Logger} from "@nestjs/common";
import { FlightEntity } from '../repository/entity/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightStatus } from '../../shared/api-enums';
import { CreateFlightDto } from '../controller/dto/create-flight.dto';
import { SearchFlightDTO } from '../controller/dto/search-flight-dto';
class FlightNotFoundException implements Error {
  constructor(id: string) {
    this.message = `Flight with id ${id} not found`;
    this.name = 'FlightNotFoundException';
  }
  message: string;
  name: string;
}
class FlightSearchCompanyException implements Error {
    constructor(company: string) {
      this.message = `No flights with ${company} found`;
      this.name = 'FlightSearchCompanyException';
    }
    message: string;
    name: string;
  }
class FlightSearchStatusException implements Error {
    constructor(status: string) {
      this.message = `No flights with ${status} status found`;
      this.name = 'FlightSearchStatusException';
    }
    message: string;
    name: string;
  }
class FlightSearchDepartureException implements Error {
    constructor(destination: string) {
      this.message = `No flights departing at ${destination} found`;
      this.name = 'FlightSearchDepartureException';
    }
    message: string;
    name: string;
  }
class FlightSearchDestinationException implements Error {
    constructor(destination: string) {
      this.message = `No flights arriving at ${destination} found`;
      this.name = 'FlightSearchDestinationException';
    }
    message: string;
    name: string;
  }
class FlightSearchDepartingDateException implements Error {
    constructor(date: string) {
      this.message = `No flight available with this date:${date}`;
      this.name = 'FlightSearchDepartingDateException';
    }
    message: string;
    name: string;
  }
class FlightSearchArrivalDateException implements Error {
    constructor(date: string) {
      this.message = `No flight available with this date: ${date}`;
      this.name = 'FlightSearchArrivalDateException';
    }
    message: string;
    name: string;
  }
class FlightFindAllException implements Error {
    constructor() {
      this.message = `Flight search failed`;
      this.name = 'FlightFindAllException';
    }
    message: string;
    name: string;
  }




@Injectable()
export class FlightService{
    constructor(
        @InjectRepository(FlightEntity)
        private flightRepository: Repository<FlightEntity>,
    ) {}

    private readonly logger = new Logger(FlightService.name);

    async createFlight(createFlightDto: CreateFlightDto) {
        const flight = await this.flightRepository.save(this.flightTotoEntity(createFlightDto));
        this.logger.log(`Creating flight with id ${flight.id}`);
        return flight.id;
    }


    async update(flight: FlightEntity): Promise<FlightEntity> {
        if (!await this.flightRepository.findOne({where: {id: flight.id}})){
            this.logger.error(`Flight with id ${flight.id} not found`)
            throw new FlightNotFoundException(flight.id.toString())
        }
        this.logger.log(`Updating flight with id ${flight.id}`);
        return this.flightRepository.save(flight)
    }


    async delete(id: string): Promise<void> {
        if(!await this.flightRepository.findOne({where: {id}})){
            this.logger.error(`Flight with id ${id} is not found`)
            throw new FlightNotFoundException(id.toString())
        }
        this.logger.log(`Deleting flight with id ${id}`);
        await this.flightRepository.delete({id})
    }

    async findOne(id: string): Promise<FlightEntity> {
        const entity = await this.flightRepository.findOne({where:{id}});
        if (!entity) {
            this.logger.error(`Flight with id ${id} not found`);
            throw new FlightNotFoundException(id.toString());
        }
        return entity;
    }
        

    async findCompanyFlights(segmentAirlineName: string): Promise<FlightEntity[]> {
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


    async findFlightsStartingAirport(startingAirport: string): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {startingAirport: startingAirport}})){
            this.logger.error(`Flight with starting airport ${startingAirport} not found`)
            throw new FlightSearchDepartureException(startingAirport)
        }
        this.logger.log(`Finding flights with starting airport ${startingAirport}`);
        return this.flightRepository.find({where: {startingAirport: startingAirport}})
    }


    async findFlightsDestinationAirport(destinationAirport: string): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {destinationAirport: destinationAirport}})){
            this.logger.error(`Flight with destination airport ${destinationAirport} not found`)
            throw new FlightSearchDestinationException(destinationAirport)
        }
        this.logger.log(`Finding flights with destination airport ${destinationAirport}`);
        return this.flightRepository.find({where: {destinationAirport: destinationAirport}})
    }


    async findFlightsDepartingDate(departingDate: string): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {departingDate: departingDate}})){
            this.logger.error(`Flight with departing date ${departingDate} not found`)
            throw new FlightSearchDepartingDateException(departingDate)
        }
        this.logger.log(`Finding flights with departing date ${departingDate}`);
        return this.flightRepository.find({where: {departingDate: departingDate}})
    }


    async findFlightsArrivalDate(arrivalDate: string): Promise<FlightEntity[]> {
        if(!await this.flightRepository.findOne({where: {arrivalDate: arrivalDate}})){
            this.logger.error(`Flight with arrival date ${arrivalDate} not found`)
            throw new FlightSearchArrivalDateException(arrivalDate)
        }
        this.logger.log(`Finding flights with arrival date ${arrivalDate}`);
        return this.flightRepository.find({where: {arrivalDate: arrivalDate}})
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

    flightTotoEntity(flightDTO: any): FlightEntity {
        const flight = new FlightEntity();
        flight.flightNumber = flightDTO.flightNumber;
        flight.departingDate = flightDTO.departingDate;
        flight.arrivalDate = flightDTO.arrivalDate;
        flight.startingAirport = flightDTO.startingAirport;
        flight.destinationAirport = flightDTO.destinationAirport;
        flight.segmentAirlineName = flightDTO.segmentAirlineName;
        flight.segmentEquipmentDescription = flightDTO.segmentEquipmentDescription;
        return flight;
    }
}