import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserEntity } from '../repository/entity/user.entity';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserTypes } from '../../shared/api-enums';
import { JwtOauthGuard } from '../../auth/guards/jwt-oauth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('client')
    async createClient(@Body() client: CreateClientDto) {
        return this.userService.createClient(client);
    }

    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    @Post('employee')
    async createEmployee(@Body() employee: CreateEmployeeDto) {
        return this.userService.createEmployee(employee);
    }

    @Get('client/all')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async findAllClients() {
        return this.userService.findAllClients();
    }

    @Get('employee/:companyName')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async findAllEmployees(@Param('companyName') companyName: string) {
        return this.userService.findAllEmployeesOfCompany(companyName);
    }

    @Patch('update')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async update(@Body() user: UserEntity) {
        return this.userService.update(user);
    }

    @Delete('delete')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async delete(@Body() id: string) {
        return this.userService.delete(id);
    }

    @Get('find/:id')
    @UseGuards(JwtOauthGuard, RoleGuard(UserTypes.admin))
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get('all')
    @UseGuards(RoleGuard(UserTypes.admin))
    async findAll() {
        return this.userService.findAll();
    }
}

