import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LangService } from './lang/lang.service';
import { LangModule } from './lang/lang.module';
import typeOrmConfig from '../typeorm.config';
import { Languages } from './lang/lang.entity';
import { SetUserPreferredLanguage } from './lang/middleware/lang.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    LangModule,
    TypeOrmModule.forFeature([Languages]),
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService, LangService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetUserPreferredLanguage).forRoutes('*');
  }
}
