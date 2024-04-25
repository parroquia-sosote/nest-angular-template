import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { API_VERSION } from 'src/common/constants';

@Controller(`api/${API_VERSION}/user`)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() userDTO: UserDto) {
    return await this.userService.create(userDTO);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDTO: UserDto) {
    return await this.userService.update(id, userDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
