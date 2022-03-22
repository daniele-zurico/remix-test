import { ReactElement } from "react"
import type { MetaFunction } from "remix";
import { Banner, LanguageToggle } from "./";
import { IMainPageProps } from "../interfaces/main.interface";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Sorry, there is a problem with the service",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export const Error = ({ languages, locale }: IMainPageProps): ReactElement => (
  <div className="govuk-width-container">
    <Banner />
    <LanguageToggle languages={languages} locale={locale}/>
    <main className="govuk-main-wrapper govuk-!-padding-top-6" id="main-content" role="main">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Sorry, there is a problem with the service</h1>
      <p className="govuk-body">Try again later.</p>
      <p className="govuk-body">Everything you have done so far has been saved.</p>
    </main>
  </div>
)