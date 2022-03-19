import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import { CookieBanner, Header, Footer, Document, Error } from "./components";
import type { MetaFunction } from "remix";
import styles from "~/styles/all.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - What do you want to do ?",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
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
        <CookieBanner />
        <Header />
        <Error />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <html className="govuk-template" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      {/* TODO - add js-enabled inline script document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled') */}
      <body className="govuk-template__body js-enabled">
        <CookieBanner />
        <Header />
        <Document />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}