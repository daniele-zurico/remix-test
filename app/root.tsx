import { createCookie, json, useLoaderData, LoaderFunction, MetaFunction } from "remix";
import { useSetupTranslations } from "remix-i18next";
import { i18n } from "~/i18n.server"
import { IMainPageProps } from "~/interfaces/main.interface";
import { supportedLanguages, defaultLocale } from "./data/constants";
import { MainApp, Document, Error, PageNotFound } from "./components";

import styles from "~/styles/all.css";
import languageStyles from "~/styles/language.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - What do you want to do ?",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export let loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  const lngInQuery = (new URL(request.url)).searchParams.get('lng');
  const options: ResponseInit = {}
  if (lngInQuery) {
    options.headers = {
      'Set-Cookie': await createCookie('locale').serialize(locale)
    }
  }

  return json({ 
    locale: await i18n.getLocale(request),
    i18n: await i18n.getTranslations(request, ["header", "banner", "cookieBanner", "footer"]),
    languages: supportedLanguages
  }, options);
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: languageStyles }
  ];
}

export function ErrorBoundary({ error }: any) {
  console.error(error);
  useSetupTranslations(defaultLocale);

  return (
    <MainApp locale={defaultLocale}>
      <Error languages={supportedLanguages} locale={defaultLocale}/>
    </MainApp>
  );
}

export function CatchBoundary() {
  useSetupTranslations(defaultLocale );

  return (
    <MainApp locale={defaultLocale}>
      <PageNotFound languages={supportedLanguages} locale={defaultLocale }/>
    </MainApp>
  );
}

export default function App() {
  const { locale, languages } = useLoaderData<IMainPageProps>();
  useSetupTranslations(locale);

  return (
    <MainApp locale={locale}>
      <Document languages={languages} locale={locale} />
    </MainApp>
  );
}
