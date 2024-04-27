import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entitiy';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkPassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(user: UserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(user.password);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    delete userDto.password; // Don't update the password here
    const user = await this.findOne(id);
    const updatedUserData = {
      ...user,
      ...userDto,
    };
    const updatedUser = await this.userRepository.save(updatedUserData);
    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }
}
