import { ReactElement } from "react";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Cookies",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

const CookiePage: React.FC = (): ReactElement => {
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Cookies Policy</h1>
    </div>
  )
}

export default CookiePage;