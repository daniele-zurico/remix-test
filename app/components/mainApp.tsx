import { ReactElement } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import { CookieBanner, Header, Footer } from "./";

export const MainApp: React.FC = ({ children }): ReactElement => (
  <html className="govuk-template" lang="en">
  <head>
    <Meta />
    <Links />
  </head>
  {/* TODO - add js-enabled inline script document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled') */}
  <body className="govuk-template__body js-enabled">
    <CookieBanner />
    <Header />
    {children}
    <Footer />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
  </body>
</html>
)