import { useLoaderData, json, LoaderFunction, Outlet, MetaFunction } from "remix";
import { i18n } from "~/i18n.server";
import { Banner, Header, LanguageToggle } from "~/components";
import { supportedLanguages } from "~/config";
import { ILanguageToggleProps } from "~/types";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Processing statement - Create a UK Processing statement - GOV.UK",
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

const Dashboard = () => {
  const { languages, locale } = useLoaderData<ILanguageToggleProps>();

  return (
    <>
      <Header title="journeyTitle_processingstatement" titleTo="/create-processing-statement/processing-statements"/>  
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <Banner />
          <LanguageToggle languages={languages} locale={locale} />
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Dashboard;