import { defaultLocale, supportedLanguages } from "~/config";

export const getSupportedLanguages = () => Object.keys(supportedLanguages);

export const initLanguages = () => ({
  supportedLngs: getSupportedLanguages(),
  defaultNS: "common",
  fallbackLng: defaultLocale,
  react: { useSuspense: false },
});
