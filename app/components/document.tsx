import { Outlet } from "remix";
import { IMainPageProps } from "../types/main";
import { Banner, LanguageToggle } from ".";

export const Document = ({ languages, locale }: IMainPageProps) => (
  <div className="govuk-width-container">
    <main className="govuk-main-wrapper" id="main-content" role="main">
      <Banner />
      <LanguageToggle languages={languages} locale={locale} />
      <Outlet />
    </main>
  </div>
);
