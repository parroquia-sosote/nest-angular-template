import { Body, Controller, Post, Req /**, UseGuards */ } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/users.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import ApiStandardResponse from '../common/interceptors/api-response';
import { LangService } from '../lang/lang.service';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private langService: LangService,
  ) {}
  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: Request & { user: any }) {
    const body = req.body;
    const user = {
      email: body.email,
      password: body.password,
    };
    const data = await this.authService.signIn(user);
    const messages = this.langService.getMessages();
    return new ApiStandardResponse(data, messages.USER.UPDATED);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.singUp(user);
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
