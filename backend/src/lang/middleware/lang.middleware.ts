import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LangService } from '../lang.service';

@Injectable()
export class SetUserPreferredLanguage implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly langService: LangService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      // extract the token payload
      const payload = this.jwtService.decode(token);
      const preferredLanguage = payload['preferredLanguage'] || 'en';
      this.langService.setLang(preferredLanguage);
    }

    next();
  }
}
