import { Link } from "remix";

export const Help = () => (
  <div className="govuk-!-margin-bottom-6">
    <hr style={{ borderTop: "2px solid #1d70b8" }} />
    <h2 className="govuk-heading-l">Need help?</h2>
    <Link
      style={{ fontSize: "19px" }}
      className="govuk-link"
      rel="noopener noreferrer"
      to="https://www.gov.uk/guidance/exporting-and-importing-fish-if-theres-no-brexit-deal"
      target="_blank"
    >
      Get help exporting fish from the UK (gov.uk)
      <span className="govuk-visually-hidden">(opens in new tab)</span>
    </Link>
  </div>
);
