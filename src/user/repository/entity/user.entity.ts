import {Column, Entity, PrimaryColumn} from "typeorm";
import { UserRoles } from '../../../shared/api-enums';

@Entity()
export class UserEntity{
    @PrimaryColumn({length: 100})
    email: string;

    @Column()
    password: string;

    @Column({enum: UserRoles, default: UserRoles.member})
    role: UserRoles;

}