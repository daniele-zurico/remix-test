import { ReactElement } from "react";
import { Link } from "remix";

export const BackButton = ({ ...props }): ReactElement => {
  return (
    <Link to={props.href} className="govuk-back-link">
      Back
    </Link>
  );
};
