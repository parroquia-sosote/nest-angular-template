import { Injectable } from '@nestjs/common';
import LANGUAGES, { DEFAULT_LANG } from '.';
import EN from './en';
import Lang from './lang.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Languages } from './lang.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LangService {
  private lang: any;
  private messages: Lang;

  constructor(
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
  ) {
    this.lang = DEFAULT_LANG;
    this.messages = LANGUAGES[this.lang] || EN;
  }

  async getDefaultLanguage() {
    return this.languagesRepository.findOne({
      where: { code: DEFAULT_LANG },
    });
  }

  getById(id: string) {
    return this.languagesRepository.findOne({
      where: { id },
    });
  }
}
