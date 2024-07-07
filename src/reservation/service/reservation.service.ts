import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../repository/entity/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../controller/dto/create-reservation.dto';
import { FlightService } from '../../flight/service/flight.service';

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
        private reservationRepository: Repository<ReservationEntity>,
        private flightService: FlightService,
    ) {}

    private readonly logger = new Logger(ReservationService.name);

    async createReservation(createReservationDto: CreateReservationDto) {
        const flight = await this.flightService.findOne(createReservationDto.flight.flightNumber);
        if (flight.numberOfSeats < 1) {
            this.logger.error(`No seats available on flight with id ${flight.flightNumber}`);
            throw new ReservationException(`No seats available on flight with id ${flight.flightNumber}`, 'NoSeatsAvailableException');
        }

        flight.numberOfSeats -= 1;
        await this.flightService.update(flight);

        const Reservation = await this.reservationRepository.save(this.ReservationTotoEntity(createReservationDto));
        this.logger.log(`Creating Reservation with id ${Reservation.id}`);
        return Reservation.id;
    }

    async payReservation(id: string) {
        const reservation = await this.reservationRepository.findOne({where: {id}});
        if (!reservation) {
            this.logger.error(`Reservation with id ${id} not found`);
            throw new ReservationException(`Reservation with id ${id} not found`, 'ReservationNotFoundException');
        }
        if (reservation.payment) {
            this.logger.error(`Reservation with id ${id} already paid`);
            throw new ReservationException(`Reservation with id ${id} already paid`, 'ReservationAlreadyPaidException');
        }

        const flight = await this.flightService.findOne(reservation.flight.flightNumber);
        if (flight.numberOfSeats < 1) {
            this.logger.error(`No seats available on flight with id ${flight.flightNumber}`);
            throw new ReservationException(`No seats available on flight with id ${flight.flightNumber}`, 'NoSeatsAvailableException');
        }

        flight.numberOfSeats -= 1;
        await this.flightService.update(flight);

        reservation.payment = true;
        await this.reservationRepository.save(reservation);

        this.logger.log(`Reservation with id ${id} paid and confirmed`);
        return {id: reservation.id, message: 'Reservation paid and confirmed'};
    }

    async update(Reservation: ReservationEntity): Promise<ReservationEntity> {
        if (!await this.reservationRepository.findOne({where: {id: Reservation.id}})){
            this.logger.error(`Reservation with id ${Reservation.id} not found`)
            throw new ReservationException(`Reservation with id ${Reservation.id} not found`, 'ReservationNotFoundException')
        }
        this.logger.log(`Updating Reservation with id ${Reservation.id}`);
        return this.reservationRepository.save(Reservation)
    }

    async delete(id: string): Promise<void> {
        if(!await this.reservationRepository.findOne({where: {id}})){
            this.logger.error(`Reservation with id ${id} is not found`)
            throw new ReservationException(`Reservation with id ${id} is not found`, 'ReservationNotFoundException')
        }
        this.logger.log(`Deleting Reservation with id ${id}`);
        await this.reservationRepository.delete({id})
    }

    async findOne(id: string): Promise<ReservationEntity> {
        const entity = await this.reservationRepository.findOne({where:{id}});
        if (!entity) {
            this.logger.error(`Reservation with id ${id} not found`);
            throw new ReservationException(`Reservation with id ${id} not found`, 'ReservationNotFoundException')
        }
        return entity;
    }

    async findAllReservationsByClient(userId: string): Promise<ReservationEntity[]> {
        const client = await this.reservationRepository.findOne({where: {id: userId}});
        if (!client) {
            this.logger.error(`User with id ${userId} not found`);
            throw new ReservationException(`User with id ${userId} not found`, 'ReservationNotFoundException')
        }
        const Reservations = await this.reservationRepository.find({where: {client: client}});
        if (!Reservations) {
            this.logger.error(`Reservations for user with id ${userId} not found`);
            throw new ReservationException(`Reservations for user with id ${userId} not found`, 'ReservationNotFoundException')
        }
        return Reservations;
    }

    async findAllReservations(): Promise<ReservationEntity[]> {
        if(!this.reservationRepository.find){
            this.logger.error(`Error listing all Reservations`)
            throw new ReservationException(`Error listing all Reservations`, 'ReservationNotFoundException')
        }
        return this.reservationRepository.find();
    }

    ReservationTotoEntity(reservationDTO: any): ReservationEntity {
        const reservation = new ReservationEntity();
        reservation.flight = reservationDTO.flight;
        reservation.client = reservationDTO.client;
        reservation.ReservationDate = reservationDTO.ReservationDate;
        reservation.seat = reservationDTO.seat;
        reservation.status = reservationDTO.status;
        reservation.payment = reservationDTO.payment;
        reservation.price = reservationDTO.price;
        return reservation;
    }
}