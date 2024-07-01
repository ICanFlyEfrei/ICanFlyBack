import {Injectable, Logger} from "@nestjs/common";
import { UserEntity } from '../repository/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypes } from '../../shared/api-enums';
import { CreateEmployeeDto } from '../controller/dto/create-employee.dto';
import { CreateClientDto } from '../controller/dto/create-client.dto';

class UserNotFoundException implements Error {
  constructor(id: string) {
    this.message = `User with id ${id} not found`;
    this.name = 'UserNotFoundException';

  }

  message: string;
  name: string;
}

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async findOne(id: string): Promise<UserEntity> {
    const entity= await this.userRepository.findOne({where:{id}, select: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'company', 'type']});
    if (!entity) {
      this.logger.error(`User with id: ${id} not found`);
      throw new UserNotFoundException(id);
    }
    return entity;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOne({where: {email}});
    if (!entity) {
      this.logger.error(`User with email: ${email} not found`);
      throw new UserNotFoundException(email);
    }
    return entity;
  }

  private async create(user: UserEntity) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.userRepository.save(user);
    this.logger.log(`Creating user with id: ${user.id}`);
    return user.id;
  }

  async createClient(client: CreateClientDto) {
    this.logger.log(`Creating client with email: ${client.email}`);
    const user = this.clientDtoToEntity(client);
    return await this.create(user);
  }

  async createEmployee(employee: CreateEmployeeDto) {
    this.logger.log(`Creating employee with email: ${employee.email}`);
    const user = this.employeeDtoToEntity(employee);
    return await this.create(user);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    if (!await this.userRepository.findOne({where: {id: user.id}})) {
      this.logger.error(`User with id ${user.id} not found`);
      throw new UserNotFoundException(user.id);
    }
    this.logger.log(`Updating user with id: ${user.id}`);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    if (!await this.userRepository.findOne({where: {id}})) {
      this.logger.error(`User with id: ${id} not found`);
      throw new UserNotFoundException(id);
    }
    this.logger.log(`Deleting user with id ${id}`);
    await this.userRepository.delete({id});
  }

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Finding all users');
    return this.userRepository.find();
  }

  async findAllEmployeesOfCompany(company: string): Promise<UserEntity[]> {
    this.logger.log(`Finding all employees of company: ${company}`);
    return this.userRepository.find({where: {company}});
  }

  async findAllClients(): Promise<UserEntity[]> {
    this.logger.log(`Finding all clients`);
    return this.userRepository.find({where: {type: UserTypes.client}});
  }

  clientDtoToEntity(client: CreateClientDto): UserEntity {
    const user = new UserEntity();
    user.email = client.email;
    user.password = client.password;
    user.firstName = client.firstName;
    user.lastName = client.lastName;
    user.phoneNumber = client.phoneNumber;
    user.company = "";
    user.type = UserTypes.client;
    return user;
  }

  private employeeDtoToEntity(employee: CreateEmployeeDto): UserEntity {
    const user = new UserEntity();
    user.email = employee.email;
    user.password = employee.password;
    user.firstName = employee.firstName;
    user.lastName = employee.lastName;
    user.phoneNumber = employee.phoneNumber;
    user.company = employee.company;
    user.type = UserTypes.employee;
    return user;
  }
}