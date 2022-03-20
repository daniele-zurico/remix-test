import { ReactElement } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import { CookieBanner, Header, Footer } from "./";

export const MainApp: React.FC = ({ children }): ReactElement => (
  <html className="govuk-template" lang="en">
  <head>
    <Meta />
    <Links />
  </head>
  <body className="govuk-template__body">
    <CookieBanner />
    <Header />
    {children}
    <Footer />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
  </body>
  <script
    dangerouslySetInnerHTML={{
      __html: `document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');`,
    }}
  />
</html>
)