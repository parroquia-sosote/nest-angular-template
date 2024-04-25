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
      delete user.password;
      return user;
    }
    return null;
  }

  async signIn(user: any) {
    console.log(user);
    const userFromDB = await this.userService.findByEmail(user.email);
    delete userFromDB.password;
    delete userFromDB.createdAt;
    delete userFromDB.updatedAt;
    delete userFromDB.isPasswordReset;
    delete userFromDB.deletedAt;
    delete userFromDB.phone;

    const payload = { ...userFromDB };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
      // audience: process.env.APP_URL,
    });

    return {
      access_token,
    };
  }

  async singUp(user: UserDto) {
    return await this.userService.create(user);
  }
}
