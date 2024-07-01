import {Injectable, Logger} from "@nestjs/common";
import { FlightEntity } from '../repository/entity/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

class FlightNotFoundException implements Error {
  constructor(id: string) {
    this.message = `Flight with id ${id} not found`;
    this.name = 'FlightNotFoundException';

  }

  message: string;
  name: string;
}

@Injectable()
export class FlightService{
    findAll() {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(FlightEntity)
        private flightRepository: Repository<FlightEntity>,
    ) {}

    private readonly logger = new Logger(FlightService.name);

    async findOne(id: string): Promise<FlightEntity> {
        const entity = await this.flightRepository.findOne({where:{id}});
        if (!entity) {
            this.logger.error(`Flight with id ${id} not found`);
            throw new FlightNotFoundException(id.toString());
        }
        return entity;
    }

    async create(flight: FlightEntity) {
        await this.flightRepository.save(flight);
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

    fligthDTOtoEntity(flightDTO: any): FlightEntity {
        const flight = new FlightEntity();
        flight.flightNumber = flightDTO.flightNumber;
        flight.weekday = flightDTO.weekday;
        flight.startingAirport = flightDTO.startingAirport;
        flight.destinationAirport = flightDTO.destinationAirport;
        flight.segmentAirlineName = flightDTO.segmentAirlineName;
        flight.segmentEquipmentDescription = flightDTO.segmentEquipmentDescription;
        return flight;
    }
}