import { createCookie } from "remix";
import { FileSystemBackend, RemixI18Next } from "remix-i18next";
import { getJouneyName, getSupportedLanguages } from "~/helpers";
import { defaultLocale, supportedLanguages } from "../config";

const backend = new FileSystemBackend("./public/locales");

export const i18n = new RemixI18Next(backend, {
  fallbackLng: defaultLocale,
  supportedLanguages: getSupportedLanguages(),
  cookie: createCookie("locale"),
});

export const getTranslations = async (request: Request): Promise<any> => {
  const locale = await i18n.getLocale(request);
  const lngInQuery = new URL(request.url).searchParams.get("lng");
  const options: ResponseInit = {};
  if (lngInQuery) {
    options.headers = {
      "Set-Cookie": await createCookie("locale").serialize(locale),
    };
  }

  const result = {
    locale: await i18n.getLocale(request),
    i18n: await i18n.getTranslations(request, [
      "header",
      "banner",
      "cookieBanner",
      "footer",
    ]),
    journey: getJouneyName(request.url),
  };

  return { ...result, ...options };
};

export const getTranslationsByLocale = async (
  request: Request
): Promise<any> => ({
  i18n: await i18n.getTranslations(request, ["common", "index"]),
  locale: await i18n.getLocale(request),
  languages: supportedLanguages,
});
