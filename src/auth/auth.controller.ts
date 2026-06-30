import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Res() res: express.Response,
    @Body() registerDto: RegisterDto,
  ) {
    const registerResult = await this.authService.register(
      registerDto.mobile,
      registerDto.password,
      registerDto.displayName,
    );

    return res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      data: registerResult,
      message: 'ثبت نام با موفقیت انجام شد',
    });
  }

  @Post('login')
  async login(@Res() res: express.Response, @Body() loginDto: LoginDto) {
    const loginResult = this.authService.login(
      loginDto.mobile,
      loginDto.password,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: loginResult,
      message: 'با موفقیت وارد شدید',
    });
  }
}
