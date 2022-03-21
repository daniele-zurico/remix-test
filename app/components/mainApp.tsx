import React, { ReactElement } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";
import { CookieBanner, Header, Footer } from "./";

interface IMainAppProps {
  applicationConfig?: any
}

export const MainApp<IMainAppProps> = ({ children, applicationConfig } : React.PropsWithChildren<IMainAppProps>): ReactElement => {
  return (
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');
              window.ENV = ${JSON.stringify((applicationConfig !== undefined) ? {...applicationConfig} : {})}
            `,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}