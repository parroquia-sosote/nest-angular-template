import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Languages } from './lang.entity';
import { LangService } from './lang.service';

@Module({
  imports: [TypeOrmModule.forFeature([Languages])],
  providers: [LangService],

  exports: [LangService],
})
export class LangModule {}
