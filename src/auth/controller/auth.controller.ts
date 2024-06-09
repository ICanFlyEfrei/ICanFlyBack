import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignInDto } from '../dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('logout')
  async logout(@Body() refresh: RefreshTokenDto) {
    return await this.authService.logout(refresh.refresh_token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() refresh: RefreshTokenDto) {
    return await this.authService.refresh(refresh.refresh_token);
  }

}
