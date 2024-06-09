import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserEntity } from '../repository/entity/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async create(@Body() user: UserEntity) {
        return this.userService.create(user);
    }
}

