import {Column, Entity, PrimaryColumn} from "typeorm";
import { UserRoles } from '../../../shared/api-enums';

@Entity()
export class UserEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({enum: UserRoles, default: UserRoles.member})
    role: UserRoles;

}