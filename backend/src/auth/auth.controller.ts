import { Body, Controller, Post, Req /**, UseGuards */ } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/users.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: Request & { user: any }) {
    const body = req.body;
    const user = {
      username: body.username,
      password: body.password,
    };
    return await this.authService.signIn(user);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.singUp(user);
  }
}
