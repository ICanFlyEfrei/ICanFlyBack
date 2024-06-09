import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/repository/entity/user.entity';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { ErrorEnum, ErrorMessageEnum } from '../../shared/error.enum';

@Injectable()
export class AuthService {
  @Inject() private readonly userService: UserService;
  @Inject() private readonly jwtService: JwtService;
  @InjectRepository(RefreshTokenEntity)
  refreshTokenRepository: Repository<RefreshTokenEntity>;

  async getToken(user: UserEntity) {
    let refreshToken = new RefreshTokenEntity();
    refreshToken.user = user;
    refreshToken = await this.refreshTokenRepository.save(refreshToken);
    return {
      access_token: this.jwtService.sign(<JwtUser>{
        role: user.role,
        userId: user.email,
      }),
      refresh_token: Buffer.from(refreshToken.id).toString('base64'),
      token_type: 'Bearer',
    };
  }

  async login(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return this.getToken(user);
  }

  async refresh(refreshToken: string) {
    refreshToken = Buffer.from(refreshToken, 'base64').toString();
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      relations: ['user'],
      where: { id: refreshToken },
    });
    if (!refreshTokenEntity) {
      throw new UnauthorizedException({
        code: ErrorEnum.invalid_refresh_token,
        message: ErrorMessageEnum.invalid_refresh_token,
      });
    }
    await this.refreshTokenRepository.delete(refreshToken);
    return await this.getToken(refreshTokenEntity.user);
  }

  async logout(refreshToken: string) {
    refreshToken = Buffer.from(refreshToken, 'base64').toString();
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      relations: ['user'],
      where: { id: refreshToken },
    });
    if (!refreshTokenEntity) {
      throw new UnauthorizedException({
        code: ErrorEnum.invalid_refresh_token,
        message: ErrorMessageEnum.invalid_refresh_token,
      });
    }
    await this.refreshTokenRepository.delete(refreshTokenEntity);
    return {
      message: 'Successfully logged out',
    };
  }

}
