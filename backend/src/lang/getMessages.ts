import LANGUAGES, { DEFAULT_LANG } from '.';
import Lang from './lang.type';

export default function getMessages(lang: string): Lang {
  lang = lang.toUpperCase();
  return LANGUAGES[lang] || LANGUAGES[DEFAULT_LANG];
}
