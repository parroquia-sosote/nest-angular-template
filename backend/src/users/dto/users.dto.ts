import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 150)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPasswordReset: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  signature?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  // created_at: Date;
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  // updated_at?: Date;
  updatedAt?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  // deleted_at?: Date;
  deletedAt?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;
}
