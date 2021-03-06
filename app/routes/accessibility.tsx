import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - Accessibility",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

const AccessibilityStatement = () => {
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
        Accessibility statement for the Fish Exports service
      </h1>
    </div>
  );
};

export default AccessibilityStatement;
