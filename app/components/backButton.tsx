import { Link } from "remix";

type BackButtonProps = {
  to: string;
};

export const BackButton = ({ to }: BackButtonProps) => (
  <Link to={to} className="govuk-back-link">
    Back
  </Link>
);
