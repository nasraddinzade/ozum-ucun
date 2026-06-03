import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

import az from './az.json';
import en from './en.json';
import ru from './ru.json';

export type SupportedLanguage = 'az' | 'en' | 'ru';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['az', 'en', 'ru'];

function getDeviceLanguage(): SupportedLanguage {
  const locale =
    Platform.OS === 'android'
      ? NativeModules.I18nManager?.localeIdentifier
      : NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0];

  const code = (locale || 'az').split(/[-_]/)[0].toLowerCase();
  if (code === 'ru') return 'ru';
  if (code === 'en') return 'en';
  return 'az';
}

export function initI18n(savedLanguage?: string) {
  const lng = (savedLanguage as SupportedLanguage) || getDeviceLanguage();

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      az: {translation: az},
      en: {translation: en},
      ru: {translation: ru},
    },
    lng,
    fallbackLng: 'az',
    interpolation: {escapeValue: false},
  });
}

export function changeLanguage(lang: SupportedLanguage) {
  i18n.changeLanguage(lang);
}

export default i18n;
