import { createI18n } from 'vue-i18n'
const locale = 'CN'
const fallbackLocale = 'CN'
const i18n = createI18n({
  locale: locale,
  fallbackLocale: fallbackLocale,
  messages: {}
})
export { i18n }
