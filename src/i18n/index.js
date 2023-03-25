import { createI18n } from 'vue-i18n'
import EN from './en';
import CN from './cn';
const locale = 'CN'
const fallbackLocale = 'CN'
const i18n = createI18n({
  locale: locale,
  fallbackLocale: fallbackLocale,
  messages: {
    'CN':CN,
    'EN':EN,
  }
})
export { i18n }
