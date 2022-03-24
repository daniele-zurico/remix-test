import {
  createCookie,
  json,
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  Links, LiveReload, Meta, Scripts, ScrollRestoration, Outlet 
} from "remix";
import { useSetupTranslations } from "remix-i18next";
import { i18n } from "~/i18n.server";
import { Banner, Header, Error, PageNotFound, CookieBanner, Footer, LanguageToggle } from "~/components";
import { IMainAppProps } from "~/types";
import { supportedLanguages } from "~/config";
import { getJouneyName } from "~/helpers";

import styles from "~/styles/all.css";
import languageStyles from "~/styles/language.css";
import autocompleteStyles from "~/styles/autocomplete.css";
import jsDisable from "~/styles/js-disabled.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - What do you want to do?",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export let loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  const lngInQuery = new URL(request.url).searchParams.get("lng");
  const options: ResponseInit = {};
  if (lngInQuery) {
    options.headers = {
      "Set-Cookie": await createCookie("locale").serialize(locale),
    };
  }

  return json(
    {
      locale: await i18n.getLocale(request),
      i18n: await i18n.getTranslations(request, [
        "header",
        "banner",
        "cookieBanner",
        "footer",
      ]),
      journey: getJouneyName(request.url)
    },
    options
  );
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: languageStyles },
    { rel: "stylesheet", href: autocompleteStyles },
    { rel: "stylesheet", href: jsDisable },
  ];
}

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <html className="govuk-template" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="govuk-template__body">
        <Error />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html className="govuk-template" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="govuk-template__body">
        <PageNotFound />
      </body>
    </html>
  );
}

export default function App() {
  const { locale, journey } = useLoaderData<IMainAppProps>();
  useSetupTranslations(locale);

  return (
    <html className="govuk-template" lang={locale}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="govuk-template__body">
        <CookieBanner />
        <Header title={`journeyTitle_${journey}`} titleTo={`/create-${journey}/${journey}s`} />
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper" id="main-content" role="main">
            <Banner />
            <LanguageToggle languages={supportedLanguages} locale={locale} />
            <Outlet />
          </main>
        </div>
        <Footer />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
