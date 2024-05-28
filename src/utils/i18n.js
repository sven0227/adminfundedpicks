// Config Imports
import { i18n } from '@configs/i18n'

// Check if the url is missing the locale
export const isUrlMissingLocale = url => {
  return i18n.locales.every(locale => !(url.startsWith(`/${locale}/`) || url === `/${locale}`))
}

// Get the localized url
export const getLocalizedUrl = url => {
  return url
}
