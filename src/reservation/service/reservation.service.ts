import {Injectable, Logger} from "@nestjs/common";
import { ReservationEntity } from '../repository/entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../controller/dto/create-reservation.dto';

class ReservationException implements Error {
    constructor(message: string, name: string) {
        this.message = message;
        this.name = name;
    }
    message: string;
    name: string;
}

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(ReservationEntity)
        private ReservationRepository: Repository<ReservationEntity>,
    ) {}

    private readonly logger = new Logger(ReservationService.name);

    async createReservation(createReservationDto: CreateReservationDto) {
        const Reservation = await this.ReservationRepository.save(this.ReservationTotoEntity(createReservationDto));
        this.logger.log(`Creating Reservation with id ${Reservation.id}`);
        return Reservation.id;
    }

    async update(Reservation: ReservationEntity): Promise<ReservationEntity> {
        if (!await this.ReservationRepository.findOne({where: {id: Reservation.id}})){
            this.logger.error(`Reservation with id ${Reservation.id} not found`)
            throw new ReservationException(`Reservation with id ${Reservation.id} not found`, 'ReservationNotFoundException')
        }
        this.logger.log(`Updating Reservation with id ${Reservation.id}`);
        return this.ReservationRepository.save(Reservation)
    }


    async delete(id: string): Promise<void> {
        if(!await this.ReservationRepository.findOne({where: {id}})){
            this.logger.error(`Reservation with id ${id} is not found`)
            throw new ReservationException(`Reservation with id ${id} is not found`, 'ReservationNotFoundException')
        }
        this.logger.log(`Deleting Reservation with id ${id}`);
        await this.ReservationRepository.delete({id})
    }

    async findOne(id: string): Promise<ReservationEntity> {
        const entity = await this.ReservationRepository.findOne({where:{id}});
        if (!entity) {
            this.logger.error(`Reservation with id ${id} not found`);
            throw new ReservationException(`Reservation with id ${id} not found`, 'ReservationNotFoundException')
        }
        return entity;
    }

    async findAllReservationsByClient(userId: string): Promise<ReservationEntity[]> {
        const client = await this.ReservationRepository.findOne({where: {id: userId}});
        if (!client) {
            this.logger.error(`User with id ${userId} not found`);
            throw new ReservationException(`User with id ${userId} not found`, 'ReservationNotFoundException')
        }
        const Reservations = await this.ReservationRepository.find({where: {client: client}});
        if (!Reservations) {
            this.logger.error(`Reservations for user with id ${userId} not found`);
            throw new ReservationException(`Reservations for user with id ${userId} not found`, 'ReservationNotFoundException')
        }
        return Reservations;
    }

    async findAllReservations(): Promise<ReservationEntity[]> {
        if(!this.ReservationRepository.find){
            this.logger.error(`Error listing all Reservations`)
            throw new ReservationException(`Error listing all Reservations`, 'ReservationNotFoundException')
        }
        return this.ReservationRepository.find();
    }

    ReservationTotoEntity(ReservationDTO: any): ReservationEntity {
        const Reservation = new ReservationEntity();
        Reservation.flight = ReservationDTO.flight;
        Reservation.client = ReservationDTO.client;
        Reservation.ReservationDate = ReservationDTO.ReservationDate;
        Reservation.seat = ReservationDTO.seat;
        Reservation.status = ReservationDTO.status;
        Reservation.payment = ReservationDTO.payment;
        Reservation.price = ReservationDTO.price;
        return Reservation;
    }
}