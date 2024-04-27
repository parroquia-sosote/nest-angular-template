import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { API_VERSION } from '../common/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import ApiStandardResponse from '../common/interceptors/api-response';
import { LangService } from '../lang/lang.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(`api/${API_VERSION}/users`)
export class UsersController {
  private messages: any;
  constructor(
    private readonly userService: UsersService,
    private readonly langService: LangService,
  ) {
    this.messages = this.langService.getMessages();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
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
    return new ApiStandardResponse(
      await this.userService.update(id, userDTO),
      'User updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
