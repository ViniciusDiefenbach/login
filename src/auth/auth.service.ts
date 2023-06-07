import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
