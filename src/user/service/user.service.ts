import {Injectable} from "@nestjs/common";
import { UserEntity } from '../repository/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

class UserNotFoundException implements Error {
  constructor(email: string) {
    this.message = `User with email ${email} not found`;
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

  async findOne(email: string): Promise<UserEntity> {
    const entity= await this.userRepository.findOne({where:{email}});

    if (!entity) {
      throw new UserNotFoundException(email);
    }
    return entity;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async delete(email: string): Promise<void> {
    await this.userRepository.delete({email});
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}