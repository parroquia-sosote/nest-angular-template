import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LangService } from './lang/lang.service';
import { LangModule } from './lang/lang.module';
import typeOrmConfig from '../typeorm.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    LangModule,
  ],
  controllers: [AppController],
  providers: [AppService, LangService],
})
export class AppModule {}
