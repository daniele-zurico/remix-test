import { Link, MetaFunction } from "remix";
import { Banner } from "./banner";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Sorry, there is a problem with the service",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export const PageNotFound = () => (
  <div className="govuk-width-container">
    <Banner />
    <main
      className="govuk-main-wrapper govuk-!-padding-top-6 govuk-!-margin-bottom-6"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-l govuk-!-margin-bottom-6">
        Page not found
      </h1>
      <p className="govuk-body">
        If you typed the web address, check it is correct.
        <br />
        <br />
        If you pasted the web address, check you copied the full address.
        <br />
        <br />
        If the web address is correct or you selected a link or button,{" "}
        <Link
          className="govuk-body govuk-link"
          to="/create-catch-certificate/catch-certificates"
        >
          check the document is in progress.
        </Link>{" "}
        Everything you have done so far has been saved.
      </p>
    </main>
  </div>
);
