import { RemixI18Next, FileSystemBackend } from "remix-i18next";
import { createCookie } from '@remix-run/server-runtime'
import { defaultLocale, supportedLanguages } from '../data/constants';

const backend = new FileSystemBackend("./public/locales");

export let i18n = new RemixI18Next(backend, {
  fallbackLng: defaultLocale,
  supportedLanguages: Object.keys(supportedLanguages),
  cookie: createCookie('locale')
});