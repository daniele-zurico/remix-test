import type { MetaFunction } from "remix";
import { BackButton } from "../../components";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Privacy notice",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

const PrivacyPage = () => (
  <div className="govuk-!-padding-top-6">
    <BackButton href="/" />
    <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Privacy notice</h1>
  </div>
);

export default PrivacyPage;
