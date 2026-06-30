import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(mobile: string, password: string, displayName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.create({
      mobile,
      password: hashedPassword,
      displayName,
    });
  }

  async login(mobile: string, pasword: string) {
    const user = await this.userService.findOneByMobile(mobile);
    if (!(await bcrypt.compare(pasword, user.password!))) {
      throw new UnauthorizedException('رمز عبور اشتباه است');
    }

    const payload = {
      sub: user.id,
      mobile: user.mobile,
      displayName: user.displayName,
    };

    const token = this.jwtService.sign(payload)
    return {
      accessToken: token,
      
    }
  }
}
