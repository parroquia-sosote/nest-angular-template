import { Injectable } from '@nestjs/common';
import LANGUAGES from '.';
import { UsersService } from '../users/users.service';
import EN from './en';
import Lang from './lang.type';

@Injectable()
export class LangService {
  private lang: any;
  private messages: Lang;

  constructor(private readonly userService: UsersService) {
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
}
