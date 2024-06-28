import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserEntity } from '../repository/entity/user.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserRoles } from '../../shared/api-enums';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @UseGuards(RoleGuard(UserRoles.admin))
    async create(@Body() user: UserEntity) {
        return this.userService.create(user);
    }

    @Post('update')
    @UseGuards(RoleGuard(UserRoles.admin))
    async update(@Body() user: UserEntity) {
        return this.userService.update(user);
    }

    @Post('delete')
    @UseGuards(RoleGuard(UserRoles.admin))
    async delete(@Body() email: string) {
        return this.userService.delete(email);
    }

    @Get(':email')
    async findOne(@Param('email') email: string) {
        return this.userService.findOne(email);
    }

    @Get('all')
    @UseGuards(RoleGuard(UserRoles.admin))
    async findAll() {
        return this.userService.findAll();
    }
}

