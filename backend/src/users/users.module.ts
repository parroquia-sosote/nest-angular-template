import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entitiy';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // provides the User entity to the UsersService with the repository injection
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
