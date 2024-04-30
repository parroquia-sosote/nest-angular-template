import { Injectable } from '@nestjs/common';
import LANGUAGES from '.';
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
    this.lang = 'EN';
    this.messages = LANGUAGES[this.lang] || EN;
  }

  getMessages(lang?: string) {
    this.messages = LANGUAGES[lang || this.lang];
    return this.messages;
  }

  /**
   * Set the language, probably it will be set automatically by the user's preferred language when they sign in
   * @param lang
   */
  setLang(lang: string): void {
    this.lang = lang;
  }

  getById(id: string) {
    return this.languagesRepository.findOne({
      where: { id },
    });
  }
}
