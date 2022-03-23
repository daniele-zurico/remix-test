
import { useLoaderData, json, LoaderFunction } from "remix";
import { i18n } from "~/i18n.server";
import { Banner, Header, LanguageToggle } from "~/components";
import { supportedLanguages } from "~/config";
import { ILanguageToggleProps } from "~/types";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Accessibility",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export let loader: LoaderFunction = async ({ request }) => {
  return json({
    i18n: await i18n.getTranslations(request, ["common", "index"]),
    locale: await i18n.getLocale(request),
    languages: supportedLanguages
  });
};

const AccessibilityStatementPage = () => {
  const { languages, locale } = useLoaderData<ILanguageToggleProps>();
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <Banner />
          <LanguageToggle languages={languages} locale={locale} />
          <div className="govuk-!-padding-top-6">
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
              Accessibility statement for the Fish Exports service
            </h1>
          </div>
        </main>
      </div>
    </>
  )
};

export default AccessibilityStatementPage;
