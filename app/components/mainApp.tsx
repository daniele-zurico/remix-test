import React from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import { CookieBanner, Header, Footer } from "./";
import { IMainAppProps } from "../interfaces/main.interface";

export const MainApp = ({
  children,
  locale,
}: React.PropsWithChildren<IMainAppProps>) => (
  <html className="govuk-template" lang={locale}>
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
