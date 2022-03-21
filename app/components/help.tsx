import { ReactElement } from "react";

export const Help = (): ReactElement => (
  <div className="govuk-!-margin-bottom-6">
    <hr style={{ borderTop: '2px solid #1d70b8' }} />
    <h2 className="govuk-heading-l">Need help?</h2>
    <a style={{ fontSize: '19px' }} className="govuk-link" rel="noopener noreferrer" href="https://www.gov.uk/guidance/exporting-and-importing-fish-if-theres-no-brexit-deal" target="_blank">
      Get help exporting fish from the UK (gov.uk)
        <span className="govuk-visually-hidden">(opens in new tab)</span>
    </a>
  </div>
)