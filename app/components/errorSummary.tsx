import { Link } from "remix";
import { IError } from "../interfaces/errors.interface";

interface IErrorSummaryProps {
  errors: IError[];
}

export const ErrorSummary = ({
  errors,
}: React.PropsWithChildren<IErrorSummaryProps>) => (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role="alert"
    data-disable-auto-focus="true"
    data-module="govuk-error-summary"
  >
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        {errors.map((error: IError) => (
          <li key={error.key}>
            <Link to={`#${error.key}`}>{error.message}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
