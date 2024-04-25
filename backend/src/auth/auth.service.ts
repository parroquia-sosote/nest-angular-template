import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) {
      // const { password, ...result } = user;
      delete user.password;
      return user;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
      audience: process.env.APP_URL,
    });

    return {
      access_token,
    };
  }

  async singUp(user: UserDto) {
    return await this.userService.create(user);
  }
}
