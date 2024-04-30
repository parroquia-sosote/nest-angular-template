import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entitiy';
import { UsersController } from './users.controller';
import { LangService } from '../lang/lang.service';
import { Languages } from '../lang/lang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Languages])], // provides the User entity to the UsersService with the repository injection
  providers: [UsersService, LangService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
