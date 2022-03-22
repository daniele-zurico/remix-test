import { Link } from "remix";

export const BackButton = ({ ...props }) => (
  <Link to={props.href} className="govuk-back-link">
    Back
  </Link>
);
