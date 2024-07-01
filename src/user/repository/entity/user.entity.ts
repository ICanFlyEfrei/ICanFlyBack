import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from '../../../shared/api-enums';


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    company: string;

    @Column({enum: UserTypes, default: UserTypes.client})
    type: UserTypes;

}