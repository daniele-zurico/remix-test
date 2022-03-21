import i18next from "i18next";
import { hydrate } from "react-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { RemixBrowser } from "remix";
import { defaultLocale, supportedLanguages } from '../data/constants';

i18next
  .use(initReactI18next)
  .init({
    supportedLngs: Object.keys(supportedLanguages),
    defaultNS: "common",
    fallbackLng: defaultLocale,
    react: { useSuspense: false },
  })
  .then(() => {
    return hydrate(
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>,
      document
    );
  });